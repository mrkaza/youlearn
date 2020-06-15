import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDWlVk4Fy1SRi-Ixf54xtZb2_0E6n7iRdw",
  authDomain: "youlearn-it.firebaseapp.com",
  databaseURL: "https://youlearn-it.firebaseio.com",
  projectId: "youlearn-it",
  storageBucket: "youlearn-it.appspot.com",
  messagingSenderId: "164737246600",
  appId: "1:164737246600:web:f222bc35a31a8cf315463d",
  measurementId: "G-EEX16KWLG1"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAuth = firebaseApp.auth();
const firebaseDb = firebaseApp.firestore();


export { firebaseAuth, firebaseDb }