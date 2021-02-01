import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
})

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
