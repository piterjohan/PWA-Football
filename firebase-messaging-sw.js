importScripts('https://www.gstatic.com/firebasejs/6.2.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.2.4/firebase-messaging.js');

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
