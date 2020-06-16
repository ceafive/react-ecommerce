import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCqD5AEZLfbGASbd5bIBQB4J2kjUOn0-sY",
  authDomain: "e-commerce-app-e57eb.firebaseapp.com",
  databaseURL: "https://e-commerce-app-e57eb.firebaseio.com",
  projectId: "e-commerce-app-e57eb",
  storageBucket: "",
  messagingSenderId: "198365292023",
  appId: "1:198365292023:web:bf94c49e5f0facf4",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const userSnapShot = await userRef.get();

  if (!userSnapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date().toUTCString();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

// ADDING DATA TO DATABASE
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  // USE FIRESTORE.BATCH and not FIRESTORE.SET BECAUSE IF A SINGLE UPLOAD FAILS, THE WHOLE UPLOAD FAILS (Better option)
  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

// RETRIEVE AND TRANSFORM COLLECTIONS FROM FIRESTORE TO REDUX STORE
export const convertCollectionsSnapShotToMap = (collections) => {
  const transformedCollections = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      id: doc.id,
      title,
      items,
      routeName: encodeURI(title.toLowerCase()),
    };
  });

  return transformedCollections.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
