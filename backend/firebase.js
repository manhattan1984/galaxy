// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxPPGtv6DckezhvUFCQK1cMuNi-8wW8ws",
  authDomain: "zipo-aid.firebaseapp.com",
  projectId: "zipo-aid",
  storageBucket: "zipo-aid.appspot.com",
  messagingSenderId: "330856342338",
  appId: "1:330856342338:web:ac77d288f3590737601edb",
  measurementId: "G-40T90ZM88Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export const auth = getAuth(app);

export function firebaseSignUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function firebaseLogIn(email, password) {
  try {
    setPersistence(auth, browserSessionPersistence);
    return signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  }
}

export function firebaseResetEmail(email) {
  try {
    sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.log(error);
  }
}

export function firebaseLogOut() {
  return signOut(auth);
}

export function addUserToDatabase(
  email,
  password,
  uid,
  firstname,
  lastname,
  username
) {
  const data = {
    email,
    password,
    usdBalance: 0,
    uid,
    investmentPlans: [],
    withdrawals: [],
    authorized: false,
    firstname,
    lastname,
    username,
    activeInvestment: "",
    totalDeposit: 0,
    totalEarned: 0,
  };
  const newUserRef = doc(db, "users", uid);
  return setDoc(newUserRef, data);
}

export function firebaseSaveSettings(uid, data) {
  const userRef = doc(db, "users", uid)
  return updateDoc(userRef, data)
}

export function getUserDetails(uid) {
  const docRef = doc(db, "users", uid);

  return getDoc(docRef);
}

export function changeUserPassword(uid, password) {
  const userRef = doc(db, "users", uid);

  return updateDoc(userRef, {
    password,
  });
}

export function addInvesmentToDatabase(uid, investmentPlan) {
  const userRef = doc(db, "users", uid);

  const date = new Date().toLocaleDateString();

  return updateDoc(userRef, {
    investmentPlans: arrayUnion({ investmentPlan, date, status: "Pending" }),
  });
}

export function addWithdrawalToDatabase(uid, amount, currency, address) {
  const userRef = doc(db, "users", uid);

  const date = new Date().toLocaleDateString();

  return updateDoc(userRef, {
    withdrawals: arrayUnion({
      currency,
      amount,
      address,
      date,
      status: "Pending",
    }),
  });
}
