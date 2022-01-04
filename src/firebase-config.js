import firebase from 'firebase';



const firebaseConfig = {
    apiKey: "AIzaSyAZSRkljR2PvLV7R4VHDoVi872yTFfAlSs",
    authDomain: "todolist-app-d485d.firebaseapp.com",
    projectId: "todolist-app-d485d",
    storageBucket: "todolist-app-d485d.appspot.com",
    messagingSenderId: "31137202178",
    appId: "1:31137202178:web:14de37a463838790c0a71b",
    measurementId: "G-VBFYZZZ4DP"
};


firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const todosColl = db.collection("todos");
export { db, todosColl };
