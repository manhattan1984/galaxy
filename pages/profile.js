import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  SvgIcon,
  Grid,
  Avatar,
  TextField,
  MenuItem,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";
import { MarketOverview } from "react-ts-tradingview-widgets";
import { useTranslation } from "react-i18next";
import USDT from "../public/qr-codes/usdt.jpeg";
import BTC from "../public/qr-codes/btc.jpeg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSnackbar } from "notistack";

const Profile = () => {

  const { t } = useTranslation();


  const {
    currentUser,
    logOut,
    usdBalance,
    getBalances,
    username,
    getUsername,
    uploadID,
    isUnderReview,
    isVerified,
    getVerified,
    getProfileDetails,
    firstName,
    lastName,
    phone,
    dob, country,
    saveSettings,
    verifiedMailSent
  } = useAuth();


  const idRef = useRef();

  const [firstNameValue, setFirstNameValue] = useState("")
  const [lastNameValue, setLastNameValue] = useState("")
  const [phoneValue, setPhoneValue] = useState("")
  const [dobValue, setDobValue] = useState("")
  const [countryValue, setCountryValue] = useState("")

  const { enqueueSnackbar } = useSnackbar()


  useEffect(() => {
    getBalances();
    getVerified();
    getUsername();
    getProfileDetails();

    console.log(firstName);

    setFirstNameValue(firstName)
    setLastNameValue(lastName)
    setPhoneValue(phone)
    setDobValue(dob)
    setCountryValue(country)

    isVerified && !verifiedMailSent ? sendVerifiedMail() : console.log("mail already sent")

  }, [firstName, verifiedMailSent]);


  function displayWelcome() {

    try {
      return (
        <Typography variant="h6" my={2}>
          {t("hi_welcome")} {username}
        </Typography>
      );
    } catch (e) { }
  }

  const handleSave = () => {
    const data = {
      firstname: firstNameValue,
      lastname: lastNameValue,
      phone: phoneValue,
      country: countryValue,
      dob: dobValue
    }
    saveSettings(currentUser.uid, data)

    enqueueSnackbar("Settings Saved", { variant: "success" })
  }



  const sendReviewMail = async () => {

    const data = {
      email: currentUser.email,
      subject: "DOCUMENTS UNDER REVIEW",
      message: `
      
      <h3 style="text-align: center;">DOCUMENTS UNDER REVIEW</h3>

      <br />

      <p style="font-family: 'Courier New', monospace;">
      Hello Esteemed User, 
      <br /> 
      <br />
      We are glad to have recieved your Documents, your Documents are under review, which usually takes 1-2 business working days. 
      <br /> 
      <br />

      </p>

      <p>
        For more enquires kindly reach out to Galaxy Support Team.
      </p>`
    }


    const results = await fetch("/api/email", {
      method: "POST",
      body: JSON.stringify(data)
    })

    if (results.status == 200) {
      console.log("success");
    } else {
      console.log("error");
    }




  }



  const sendVerifiedMail = async () => {

    const data = {
      email: currentUser.email,
      subject: "Account verification Successful",
      message: `<p>
      Dear Valued User, 
      <br />
      <br />
      Congratulations, you have passed the account verification review 
      and are now a verified user, you can now proceed to deposit and 
      withdraw funds from your account.
      </p>`
    }




    if (verifiedMailSent !== null) {

      if (!verifiedMailSent) {

        console.log("verifiedMail", verifiedMailSent);
        saveSettings(currentUser.uid, {
          verifiedMailSent: true
        })

        const results = await fetch("/api/email", {
          method: "POST",
          body: JSON.stringify(data)
        })

        if (results.status == 200) {
          console.log("success");
        } else {
          console.log("error");
        }
      }
    }


    console.log("verified mail", verifiedMailSent);



  }




  return (
    <>
      <Container>
        <Typography my variant="h4">
          Profile
        </Typography>
        {displayWelcome()}
        {isUnderReview && !isVerified ? (
          <Typography variant="h5" color="Highlight">
            Your verification is under review
          </Typography>
        ) : null}

        {isVerified ? (
          <Typography>Your account has been verified</Typography>
        ) : (
          <>
            <Typography gutterBottom>
              Your Account Has Not Yet Been Verified.
            </Typography>

            <Typography gutterBottom>
              Upload a valid ID to verify your account
            </Typography>

            <TextField fullWidth type="file" inputRef={idRef} sx={{ my: 2 }} />

            <Button
              onClick={(e) => {
                uploadID(idRef.current.files[0], username, currentUser.uid);
                saveSettings(currentUser.uid, { review: true });
                sendReviewMail()
              }}
            >
              Upload
            </Button>
          </>
        )}



        <Paper>
          <Box p m>
            <Typography gutterBottom variant="h4">
              Personal Information
            </Typography>

            {firstName ?
              <>
                <Typography gutterBottom>Email: {currentUser.email}</Typography>
                <TextField sx={{ my: 1 }} fullWidth label="First Name" onChange={(e) => {
                  setFirstNameValue(e.target.value)
                }} value={firstNameValue} />

                <TextField onChange={(e) => {
                  setLastNameValue(e.target.value)
                }} value={lastNameValue} sx={{ my: 1 }} fullWidth label="Last Name" />

                <TextField onChange={(e) => {
                  setPhoneValue(e.target.value)
                }} value={phoneValue} sx={{ my: 1 }} fullWidth label="Phone" />

                <TextField onChange={(e) => {
                  setCountryValue(e.target.value)
                }} value={countryValue} sx={{ my: 1 }} fullWidth label="Country" />


                <TextField type="date" onChange={(e) => {
                  setDobValue(e.target.value)
                }} value={dobValue} sx={{ my: 1 }} fullWidth label="Date Of Birth" />

              </>
              : null}




            <Button onClick={handleSave}>Save</Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Profile;
