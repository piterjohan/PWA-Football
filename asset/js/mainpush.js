/*config firebase */
var firebaseConfig = {
    apiKey: "AIzaSyBYVqSTVsL9Hm_EcBLUA4oFpEKzOxJl9FM",
    authDomain: "push-notification-91847.firebaseapp.com",
    databaseURL: "https://push-notification-91847.firebaseio.com",
    projectId: "push-notification-91847",
    storageBucket: "push-notification-91847.appspot.com",
    messagingSenderId: "46458798820",
    // appId: "1:46458798820:web:3f559d9ea8686c65"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();

// Add the public key generated from the console here.
messaging.usePublicVapidKey("BBEtojhYDoE0sz13Tvl0_lAg5Op7iw5XrRH8OR28omvrlAAUydi5l-UnaM5H9rW1rI1RoUbYxncysP_dufxUbTg");

/*Notificaiton */
messaging.requestPermission()
    .then(function () {
        console.log('Have permission');
    })
    .catch(function (err) {
        console.log('error' + err);
    })


function pushdata() {
    /*if token get refresh after cache delete */
    messaging.getToken()
        .then((currentToken) => {
            if (currentToken) {
                console.log("corrent token nya:" + currentToken);
                // This registration token comes from the client FCM SDKs.
                var key = 'AAAACtEpAuQ:APA91bHr-d7o064BHSLL5X0SwypvYhiQM9XaT3BIlMJJa6JgrUqIkbDJ--imwcLGYpvzCLnaQuWo5O8mrsIYpzkJ6D11rddZUOzh8ra-an9GpYFXC6PBeYt3i8Vpms8ZknW7iJXzZ97t';
                var to = currentToken;

                var notification = {
                    'title': 'Apakah Berhasil?',
                    'body': 'Ini Test Push',
                    'icon': '/asset/img/logo/icon_codepolitan.png'
                };

                fetch('https://fcm.googleapis.com/fcm/send', {
                    'method': 'POST',
                    'headers': {
                        'Authorization': 'key=' + key,
                        'Content-Type': 'application/json'
                    },
                    'body': JSON.stringify({
                        'notification': notification,
                        'to': to
                    })
                }).then(function (response) {
                    console.log(response);
                }).catch(function (error) {
                    console.error(error);
                })
            }
        });

    messaging.onMessage((payload) => {
        console.log('Message received. ', payload);
        let title = payload.notification.title;

        options = {
            'body': payload.notification.bodu,
            'icon': payload.notification.icon,
        }

        var myNotif = new Notification(title, options);
    });
}
