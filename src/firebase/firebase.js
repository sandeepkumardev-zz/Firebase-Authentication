import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC_FhNHeyUBotf4PNh2Xf8y9MrqVoxf9g0",
  authDomain: "bookmarks-pwa.firebaseapp.com",
  databaseURL: "https://bookmarks-pwa-default-rtdb.firebaseio.com",
  projectId: "bookmarks-pwa",
  storageBucket: "bookmarks-pwa.appspot.com",
  messagingSenderId: "189796888734",
  appId: "1:189796888734:web:63584a69f2d00276170b8f",
  measurementId: "G-H0T1NE9M22",
};

const Firebase = firebase.initializeApp(firebaseConfig);

const db = Firebase.database();
const auth = firebase.auth();

const user = (uid) => db.ref(`users/${uid}`);

const rmUser = (uid) => db.ref(`users/${uid}`).remove();

const users = () => db.ref("users");

const signUp = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

const signIn = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

const signOut = () => auth.signOut();

const PasswordReset = (email) => auth.sendPasswordResetEmail(email);

const PasswordUpdate = (password) => auth.currentUser.updatePassword(password);

export {
  auth,
  db,
  rmUser,
  user,
  users,
  signUp,
  signIn,
  signOut,
  PasswordReset,
  PasswordUpdate,
};

export default Firebase;
