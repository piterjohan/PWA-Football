var webPush = require('web-push');
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/frBGLjf408M:APA91bGMBdxhy7MSKLJLbbcaW0n1qCLZZ8XpkHIflgQQ0IpInI5LTsrFVMm04SN5ii73fjK5wz2AUS37Ndos4MuYd3YkfoOjDGfMXIUY8cI4Pwpm0YdJs31LQTt3qT1ZJ-WLMznFYok0",
    "keys": {
        "p256dh": "BFTjjhk6Cqugg7kZ0kbIu6zbP6BbOTQmMeIzHYbc+uBofMrzau49hUX+Z+MtVU9ESVVXnHSrz/FHtOiYuld8/WY=",
        "auth": "Cmjv63jNNc2ItfwrF1u8iQ=="
    }
};
var payload = 'Here is a payload!';
var options = {
    gcmAPIKey: 'AIzaSyDIbooFB_kGun-KyZ8yXM1HIM5zJHbF1eY',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);
