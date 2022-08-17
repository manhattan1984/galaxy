// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

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
  apiKey: "AIzaSyDrQ_Y5H4LfWKl0pIUEVBd_hnJA9d6OxZQ",

  authDomain: "galaxydholdings.firebaseapp.com",

  projectId: "galaxydholdings",

  storageBucket: "galaxydholdings.appspot.com",

  messagingSenderId: "519503689342",

  appId: "1:519503689342:web:8b7e40367c6e6bf0744a2f",

  measurementId: "G-M60K79RNWD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const storage = getStorage(app);

export const auth = getAuth(app);

export function uploadIDToFirebase(file, username, uid) {
  const metadata = {
    contentType: "image/jpeg",
  };

  const storageRef = ref(storage, "images/" + username + ".jpeg");
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        firebaseSaveSettings(uid, { idUrl: downloadURL });
      });
    }
  );
}

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
  username,
  phoneNumber,
  countryCode,
  country
) {
  const data = {
    email,
    password,
    usdBalance: 0,
    uid,
    investmentPlans: [],
    withdrawals: [],
    verified: false,
    firstname,
    lastname,
    username,
    activeInvestment: "",
    totalDeposit: 0,
    totalEarned: 0,
    phoneNumber,
    countryCode,
    country,
    review: false,
    bonus: 0,
    activities: [],
    verifiedMailSent: false
  };
  const newUserRef = doc(db, "users", uid);
  return setDoc(newUserRef, data);
}

export function firebaseSaveSettings(uid, data) {
  const userRef = doc(db, "users", uid);
  return updateDoc(userRef, data);
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
