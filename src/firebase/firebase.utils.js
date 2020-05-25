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
  measurementId: "G-G191YZH8SS",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  debugger;
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creatinguser", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const addCollectionsAndDocuments = async (
  collectioKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectioKey);
  console.log(collectionRef);
  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collectionsSnapshot => {
  const transaformCollection = collectionsSnapshot.docs.map(docSnapShot => {
    const { title, items } = docSnapShot.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: docSnapShot.id,
      title,
      items,
    };
  });
  return transaformCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve , reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    },reject)
  }) 
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
