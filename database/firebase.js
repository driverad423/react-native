 import firebase from 'firebase';
 import 'firebase/firestore';

 const firebaseConfig = {
    apiKey: "AIzaSyAXq25LfvUBMXKR_GRa91fuD7meG7PNhvQ",
    authDomain: "reac-nativepe.firebaseapp.com",
    projectId: "reac-nativepe",
    storageBucket: "reac-nativepe.appspot.com",
    messagingSenderId: "386489199713",
    appId: "1:386489199713:web:51cf3fe22dba96bad64e20",
    measurementId: "G-VJWBMG7TGX"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()

export default {
    firebase,
    db
};