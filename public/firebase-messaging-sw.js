importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyDjRuFAuLGIZ4-MnzML0sAPQQkstujuapc",
  authDomain: "springnotifications.firebaseapp.com",
  projectId: "springnotifications",
  storageBucket: "springnotifications.appspot.com",
  messagingSenderId: "762813305139",
  appId: "1:762813305139:web:a3624e0e1583f1dbc52e46",
  measurementId: "G-5N40PSKKG1"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}

const messaging = firebase.messaging();
messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/infinity.svg",
  };
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});