import firebase from 'firebase'
require("@firebase/firestore")

var firebaseConfig = {
    apiKey: "AIzaSyAgfLtJIU_yYulsbmCM8zGu30abJLw_pBM",
    authDomain: "bedtimestories-1ed1e.firebaseapp.com",
    projectId: "bedtimestories-1ed1e",
    storageBucket: "bedtimestories-1ed1e.appspot.com",
    messagingSenderId: "144540822864",
    appId: "1:144540822864:web:b5d6d3eca12ea3206a9055"
};

firebase.initialiseApp(firebaseConfig);

export default firebase.firestore()