import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getDatabase } from 'firebase/database'
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


const firebaseConfig = {
    apiKey: "AIzaSyAepuNFPN-NPXjbi-ZjaIgg407H_iac9uM",
    authDomain: "smitlist-d4821.firebaseapp.com",
    databaseURL: "https://smitlist-d4821-default-rtdb.firebaseio.com",
    projectId: "smitlist-d4821",
    storageBucket: "smitlist-d4821.appspot.com",
    messagingSenderId: "556175675653",
    appId: "1:556175675653:web:d3269f5e1d7f14056f276c",
    measurementId: "G-69S3EW0VDT"
    };

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

const db = getDatabase();

export { db };