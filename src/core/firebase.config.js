import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const app = firebase.initializeApp({
    apiKey: "AIzaSyABlOWTAFlm4sEB_DDjMMOI8Jz9CfqTrEc",
    authDomain: "wallet-app-76b5f.firebaseapp.com",
    databaseURL: "https://wallet-app-76b5f.firebaseio.com",
    projectId: "wallet-app-76b5f",
    storageBucket: "wallet-app-76b5f.appspot.com",
    messagingSenderId: "215974718078",
    appId: "1:215974718078:web:c5f98ae6e234deaabd862f",
    measurementId: "G-G4L8Z3JKK3"
});

export const ParseDate = date => {
    return firebase.firestore.Timestamp.fromDate(new Date(date));
};

const DB = app.firestore();
const AUTH = app.auth();

export {
    DB,
    AUTH
}