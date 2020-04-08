var webPush = require("web-push");
module.exports = {
  sendPushNotification(subscription, payload, keys) {
    return new Promise((resolve, reject) => {
      var pushSubscription = {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: subscription.keys.p256dh,
          auth: subscription.keys.auth,
        },
      };
      var pushPayload = JSON.stringify(payload);
      var pushOptions = {
        vapidDetails: {
          subject: "https://mediport.in",
          privateKey: keys.pushNotificationPrivateKey,
          publicKey: keys.pushNotificationPublicKey,
        },
        TTL: payload.ttl,
        headers: {},
      };
      webPush
        .sendNotification(pushSubscription, pushPayload, pushOptions)
        .then((value) => {
          resolve({
            status: true,
            endpoint: subscription.endpoint,
            data: value,
          });
        })
        .catch((err) => {
          reject({
            status: false,
            id: subscription._id,
            data: err,
          });
        });
    });
  },
};
