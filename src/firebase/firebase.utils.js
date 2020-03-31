import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDVKvRVAhjiROp1FThKsXknnykAKbPWEUE",
  authDomain: "crwn-db-566f4.firebaseapp.com",
  databaseURL: "https://crwn-db-566f4.firebaseio.com",
  projectId: "crwn-db-566f4",
  storageBucket: "crwn-db-566f4.appspot.com",
  messagingSenderId: "1054077261589",
  appId: "1:1054077261589:web:090d8223e8a9e73c8ffb1c",
  measurementId: "G-G191YZH8SS"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
