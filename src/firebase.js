import firebase from "firebase/app";
import 'firebase/database';

//Firebase code

var firebaseConfig = {
    apiKey: "AIzaSyDrtnusG6N7kSMnIJed7RS4IBBJaIBLvF0",
    authDomain: "project4-junoco.firebaseapp.com",
    projectId: "project4-junoco",
    storageBucket: "project4-junoco.appspot.com",
    messagingSenderId: "381948825903",
    appId: "1:381948825903:web:2b2d4dff28913afeb051da"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;