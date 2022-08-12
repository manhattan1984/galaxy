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
    saveSettings,
  } = useAuth();

  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const phoneRef = useRef("");
  const idRef = useRef();

  const [firstNameValue, setFirstNameValue] = useState("")
  const [lastNameValue, setLastNameValue] = useState("")
  const [phoneValue, setPhoneValue] = useState("")

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

  }, [firstName]);


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
      phone: phoneValue
    }
    saveSettings(currentUser.uid, data)

    enqueueSnackbar("Settings Saved", { variant: "success" })
  }


  return (
    <>
      <Container>
        <Typography my variant="h4">
          Profile
        </Typography>
        {displayWelcome()}
        {isUnderReview ? (
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
