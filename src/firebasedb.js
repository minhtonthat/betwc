import Firebase from 'firebase'
// Set the configuration for your app
// TODO: Replace with your project's config object

let config = {
    apiKey: "AIzaSyArC4dQ98iFOddIU6gEuJ1IAndB3TJf2f8",
    authDomain: "betwc-4dad8.firebaseapp.com",
    databaseURL: "https://betwc-4dad8.firebaseio.com",
    projectId: "betwc-4dad8",
    storageBucket: "betwc-4dad8.appspot.com",
    messagingSenderId: "175146188627"
  };
  
let app = Firebase.initializeApp(config);

export const db = app.database()