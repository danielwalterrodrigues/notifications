import { initializeApp } from 'firebase/app';
// firestore
import { getFirestore } from 'firebase/firestore';
// cloud storage
import { getStorage } from "firebase/storage";

import { firebaseKey } from '../config'

const firebaseConfig = {
  apiKey: firebaseKey.apiKey,
  authDomain: firebaseKey.authDomain,
  projectId: firebaseKey.projectId,
  storageBucket: firebaseKey.storageBucket,
  messagingSenderId: firebaseKey.messagingSenderId,
  appId: firebaseKey.appId,
  measurementId: firebaseKey.measurementId
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore();
const storage = getStorage();

export { firestore, storage };
