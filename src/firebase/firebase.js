import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyC_FhNHeyUBotf4PNh2Xf8y9MrqVoxf9g0",
  authDomain: "bookmarks-pwa.firebaseapp.com",
  databaseURL: "https://bookmarks-pwa-default-rtdb.firebaseio.com",
  projectId: "bookmarks-pwa",
  storageBucket: "bookmarks-pwa.appspot.com",
  messagingSenderId: "189796888734",
  appId: "1:189796888734:web:63584a69f2d00276170b8f",
  measurementId: "G-H0T1NE9M22",
});

const auth = app.auth();
const db = app.database();
const storage = app.storage();

// create refrence in RealTime Database
const user = (uid) => db.ref(`users/${uid}`);
const rmUser = (uid) => db.ref(`users/${uid}`).remove();
const users = () => db.ref("users");

// auth functions
const signIn = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);
const signUp = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);
const signOut = () => auth.signOut();
const PasswordReset = (email) => auth.sendPasswordResetEmail(email);
const PasswordUpdate = (password) => auth.currentUser.updatePassword(password);
const reAuth = firebase.auth.EmailAuthProvider;

export {
  auth,
  db,
  storage,
  user,
  users,
  rmUser,
  signIn,
  signUp,
  signOut,
  PasswordReset,
  PasswordUpdate,
  reAuth,
};

export default app;
