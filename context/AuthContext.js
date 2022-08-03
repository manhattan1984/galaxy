import { useSnackbar } from "notistack";
import React, { createContext, useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import {
  addInvesmentToDatabase,
  addUserToDatabase,
  auth,
  changeUserPassword,
  firebaseLogIn,
  firebaseLogOut,
  firebaseSignUp,
  addWithdrawalToDatabase,
  getUserDetails,
  firebaseResetEmail,
  firebaseSaveSettings,
} from "../backend/firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [usdBalance, setUsdBalance] = useState(0);
  const [activeInvestment, setActiveInvestment] = useState("");
  const [totalEarned, setTotalEarned] = useState(0);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [investmentHistory, setInvestmentHistory] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);

  const [btc, setBtc] = useState("");
  const [eth, setEth] = useState("");
  const [bch, setBch] = useState("");
  const [xrp, setXrp] = useState("");
  const [ada, setAda] = useState("");

  // const addresses = {  };

  function getData(docSnap) {
    return docSnap.data();
  }

  function getUid() {
    return currentUser.uid;
  }

  async function getUsername() {
    try {
      const docSnap = await getUserDetails(getUid());

      if (docSnap.exists()) {
        setUsername(getData(docSnap).username);
      } else {
        console.log("Doc Not Found");
      }
    } catch (error) {}
  }

  async function signUp(email, password, firstname, lastname, username) {
    try {
      const userCredential = await firebaseSignUp(email, password);
      await addUserToDatabase(
        email,
        password,
        userCredential.user.uid,
        firstname,
        lastname,
        username
      );
      setCurrentUser(userCredential.user);
      return true;
    } catch (error) {
      console.log(error);
    }
    return false;
  }

  async function saveSettings(uid, data) {
    return firebaseSaveSettings(uid, data);
  }

  async function logIn(email, password) {
    try {
      const userCredential = await firebaseLogIn(email, password);
      setCurrentUser(userCredential.user);
      return true;
    } catch (error) {
      console.log(error);
    }
    return false;
  }

  async function resetEmail(email) {
    firebaseResetEmail(email);
  }

  async function logOut() {
    try {
      await firebaseLogOut();
    } catch {
      console.log(error);
    }
  }

  async function getBalances() {
    try {
      const docSnap = await getUserDetails(getUid());

      if (docSnap.exists()) {
        const data = getData(docSnap);
        setUsdBalance(data.usdBalance);
        setActiveInvestment(data.activeInvestment);
        setTotalDeposit(data.totalDeposit);
        setTotalEarned(data.totalEarned);
      } else {
        console.log("Doc Not Found");
      }
    } catch (error) {}
  }

  async function getAddresses() {
    try {
      const docSnap = await getUserDetails(getUid());

      if (docSnap.exists()) {
        const data = getData(docSnap);
        setBtc(data.btc);
        setEth(data.eth);
        setBch(data.bch);
        setXrp(data.xrp);
        setAda(data.ada);
      } else {
        console.log("Doc Not Found");
      }
    } catch (error) {}
  }

  async function getAuthorized() {
    try {
      const docSnap = await getUserDetails(getUid());
      if (docSnap.exists()) {
        const isAuthorized = getData(docSnap).authorized;
        return isAuthorized;
      } else {
        console.log("Doc Not Found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function changePassword(newPassword) {
    try {
      await changeUserPassword(getUid(), newPassword);
    } catch (error) {
      console.log(error);
    }
  }

  async function getInvestmentsHistory() {
    try {
      const docSnap = await getUserDetails(getUid());
      if (docSnap.exists()) {
        setInvestmentHistory(getData(docSnap).investmentPlans);
      } else {
        console.log("Doc Not Found");
      }
      // log
    } catch (error) {
      console.log(error);
    }
  }

  async function addInvestment(investmentPlan) {
    try {
      await addInvesmentToDatabase(getUid(), investmentPlan);
      const { enqueueSnackbar } = useSnackbar();
      enqueueSnackbar("Investment Added Successfully", { variant: "success" });
    } catch (error) {
      console.log(error);
    }
  }

  async function getWithdrawals() {
    try {
      const docSnap = await getUserDetails(getUid());
      if (docSnap.exists()) {
        setWithdrawals(getData(docSnap).withdrawals);
      } else {
        console.log("Doc Not Found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function addWithdrawal(amount, currency, address) {
    try {
      await addWithdrawalToDatabase(getUid(), amount, currency, address);
    } catch (error) {}
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signUp,
    logIn,
    logOut,
    resetEmail,
    getBalances,
    usdBalance,
    changePassword,
    addInvestment,
    getInvestmentsHistory,
    saveSettings,
    getAddresses,
    investmentHistory,
    withdrawals,
    getWithdrawals,
    addWithdrawal,
    getAuthorized,
    username,
    getUsername,
    activeInvestment,
    totalEarned,
    totalDeposit,
    btc,
    eth,
    bch,
    xrp,
    ada,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
