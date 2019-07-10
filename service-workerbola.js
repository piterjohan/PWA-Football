const CACHE_NAME = "Appfootball-V1";
var urlsToCache = [
    "/",
    // asset
    "asset/idb/idb.js",
    "asset/img/logo/icon_codepolitan.png",
    "asset/manifest/manifest.json",
    "asset/css/materialize.min.css",
    "asset/js/api2.js",
    "asset/js/nav.js",
    "asset/js/materialize.min.js",
    "asset/js/Helper.js",
    "asset/js/checksw.js",
    //pages
    "pages/home.html",
    "pages/contact.html",
    "pages/report.html",
    "pages/favorite.html",
    //index
    "index.html",
    "nav.html",
    "article.html",
];

/*install cache */
self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

/*fetch data to cache */
self.addEventListener("fetch", function (event) {
    var base_url = "https://api.football-data.org/v2/teams/";
    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function (cache) {
                return fetch(event.request).then(function (response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, {
                ignoreSearch: true
            }).then(function (response) {
                return response || fetch(event.request);
            })
        )
    }
});

/*event delete cache if CACHE_NAME != CACHE_NAME */
self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

//Push Notification
self.addEventListener('push', function (event) {
    let body;

    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push Dengan Message Berhasil Untuk FootBall Teams';
    }

    let options = {
        body: body,
        icon: 'asset/img/logo/icon_codepolitan.png',
        vibrate: [100, 50, 100],
        data: {
            dataOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});