// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBFaRpkx1vEFH07zHM9qVPcJLkuo8XEspY",
    authDomain: "mobilehelpdesk-ba63a.firebaseapp.com",
    projectId: "mobilehelpdesk-ba63a",
    storageBucket: "mobilehelpdesk-ba63a.appspot.com",
    messagingSenderId: "243487122721",
    appId: "1:243487122721:web:955cff2048395394bb4a60"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
