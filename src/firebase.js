import firebase from "firebase";
import "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyB23QiSgX9TVOyyy2wTATI_FoPe2UQzgbg",
  authDomain: "twitter-clone-69ba6.firebaseapp.com",
  projectId: "twitter-clone-69ba6",
  storageBucket: "twitter-clone-69ba6.appspot.com",
  messagingSenderId: "766075204483",
  appId: "1:766075204483:web:ee192ff2fecb3e9e5c7cb6",
  measurementId: "G-MN25RN4HQY"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const storage = firebase.storage();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { storage, timestamp, db as default };