
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6zfMdrMTsnKKY18qqWdqPpfKgcARgY",
  authDomain: "sabrinasato-82822.firebaseapp.com",
  projectId: "sabrinasato-82822",
  storageBucket: "sabrinasato-82822.firebasestorage.app",
  messagingSenderId: "251914598073",
  appId: "1:251914598073:web:ea199ec904bf5a2ae24d68"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
