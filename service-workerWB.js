importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
/*check WB */
if (workbox) {
    console.log(`Workbox berhasil dimuat`);
    /*Precaching Appshell */
    workbox.precaching.precacheAndRoute([
        { url: '/asset/css/materialize.min.css', revision: '1' },
        { url: '/asset/img/logo/icon_codepolitan.png', revision: '1' },
        { url: '/asset/js/api2.js', revision: '1' },
        { url: '/asset/js/main.js', revision: '1' },
        { url: '/asset/js/Helper.js', revision: '1' },
        { url: '/asset/js/nav.js', revision: '1' },
        { url: '/asset/js/materialize.min.js', revision: '1' },
        { url: '/asset/js/mainpush.js', revision: '1' },
        { url: '/asset/manifest/manifest.json', revision: '1' },
        { url: '/asset/js/checksw.js', revision: '1' },
        { url: '/asset/idb/idb.js', revision: '1' },
        /*asset */
        { url: '/index.html', revision: '1' },
        { url: '/firebase-messaging-sw.js', revision: '1' },
        { url: '/nav.html', revision: '1' },
        { url: '/article.html', revision: '1' },
        { url: '/pages/favorite.html', revision: '1' },
        { url: '/pages/home.html', revision: '1' },
        { url: '/pages/saved.html', revision: '1' },
    ], {// Ignore all URL parameters.  
            ignoreURLParametersMatching: [/.*/]
        });

    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/v2/teams/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'dataCache'
        })
    );

    workbox.routing.registerRoute(
        new RegExp('/'),
        workbox.strategies.staleWhileRevalidate()
    );

} else
    console.log(`Workbox gagal dimuat`);