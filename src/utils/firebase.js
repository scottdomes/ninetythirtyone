import * as firebase from 'firebase';
import { FIREBASE_API_KEY, FIREBASE_MESSAGING_SENDER_ID } from '../../secrets';

// Optionally import the services that you want to use
import 'firebase/auth';
import 'firebase/database';
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: 'ninetythirtyone-f41bf.firebaseapp.com',
  databaseURL: 'https://ninetythirtyone-f41bf.firebaseio.com',
  projectId: 'ninetythirtyone-f41bf',
  storageBucket: 'ninetythirtyone-f41bf.appspot.com',
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: '1:845224636952:web:c96dc1f696fadc2f2d096d',
  measurementId: 'G-PZZEZVF4PG',
};

export const initialize = () => {
  firebase.initializeApp(firebaseConfig);
  firebase.auth().settings.isAppVerificationDisabledForTesting = true;
};
