import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCsSgcVIBM1iRq4Ins5jaLVqajn_W95LL4",
  authDomain: "all-bookmarks.firebaseapp.com",
  databaseURL: "https://all-bookmarks-default-rtdb.firebaseio.com",
  projectId: "all-bookmarks",
  storageBucket: "all-bookmarks.appspot.com",
  messagingSenderId: "171909931713",
  appId: "1:171909931713:web:a1a486c23b217e20f0aa40",
  measurementId: "G-JB50CC8R28",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

const user = (uid) => db.ref(`users/${uid}`);

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
  user,
  users,
  signUp,
  signIn,
  signOut,
  PasswordReset,
  PasswordUpdate,
};
