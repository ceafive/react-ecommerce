import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCqD5AEZLfbGASbd5bIBQB4J2kjUOn0-sY",
    authDomain: "e-commerce-app-e57eb.firebaseapp.com",
    databaseURL: "https://e-commerce-app-e57eb.firebaseio.com",
    projectId: "e-commerce-app-e57eb",
    storageBucket: "",
    messagingSenderId: "198365292023",
    appId: "1:198365292023:web:bf94c49e5f0facf4"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const { displayName, email} = userAuth;
      const createdAt = new Date();

      try {
          await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
          })
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
    return userRef;
  }

  firebase.initializeApp(config);
 
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;