import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import SignUpAppbar from "./SignUpAppbar";
import { SignUpTextField, SignUpButton } from "../styles/styles";
import { useSnackbar } from "notistack";
import { sendEmail } from "../backend/herotofu";
import { useTranslation } from "react-i18next";
import { TextField } from "@mui/material";
import countryCodes from "country-codes-list";

const Registration = () => {
  const { t } = useTranslation();
  const emailRef = useRef();
  const userNameRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const phoneNumberRef = useRef();
  const countryCodeRef = useRef();
  const countryRef = useRef();
  const referralRef = useRef("");
  const { signUp } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const { referral } = router.query;
  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      enqueueSnackbar(t("no_match_password"));
    }

    if (
      !(
        userNameRef.current.value ||
        emailRef.current.value ||
        firstNameRef.current.value ||
        lastNameRef.current.value ||
        phoneNumberRef.current.value ||
        countryCodeRef.current.value ||
        countryRef.current.value
      )
    ) {
      enqueueSnackbar(t("complete_form"));
    }

    try {
      setError("");
      setLoading(true);
      const correct = await signUp(
        emailRef.current.value,
        passwordRef.current.value,
        firstNameRef.current.value,
        lastNameRef.current.value,
        userNameRef.current.value,
        phoneNumberRef.current.value,
        countryCodeRef.current.value,
        countryRef.current.value
      );
      correct
        ? router.push("/profile") &&
          sendEmail({ email: emailRef.current.value }, REGISTER_FORM_ENDPOINT)
        : enqueueSnackbar(t("fill_form"));
    } catch (error) {
      setError("Failed to create an account");
      console.log(error);
    }
    setLoading(false);
  }

  const countryCodesList = countryCodes.customList(
    "countryCode",
    "{countryNameEn}: +{countryCallingCode}"
  );
  //   Affect
  useEffect(() => {
    const referredBy = referral || "";
    referralRef.current.value = referredBy;
  });
  const REGISTER_FORM_ENDPOINT =
    "https://public.herotofu.com/v1/70e4b570-137d-11ed-bc91-695741f28ee9";

  return (
    <>
      <SignUpAppbar
        text={"Sign In"}
        onClick={() => {
          router.push("/signin");
        }}
      />

      <Container maxWidth="sm" justifyContent="center">
        <Box textAlign="center" m>
          <Typography variant="h4">{t("welcome")}</Typography>
          <Typography variant="subtitle1">{t("begin")}</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <SignUpTextField
            variant="standard"
            fullWidth
            type="email"
            label={t("email")}
            inputRef={emailRef}
          />
        </Box>
        <SignUpTextField
          variant="standard"
          fullWidth
          label={t("username")}
          inputRef={userNameRef}
        />

        <Box display="flex" justifyContent="space-between">
          <SignUpTextField
            sx={{
              mr: 1,
            }}
            variant="standard"
            fullWidth
            label={t("f_name")}
            inputRef={firstNameRef}
          />

          <SignUpTextField
            variant="standard"
            fullWidth
            label={t("l_name")}
            inputRef={lastNameRef}
          />
        </Box>

        <Box display="flex">
          <SignUpTextField
            sx={{ maxWidth: "45%", mr: 1 }}
            label="Code"
            variant="standard"
            select
            inputRef={countryCodeRef}
          >
            {Object.values(countryCodesList).map((code) => (
              <MenuItem key={code} value={code}>
                {code}
              </MenuItem>
            ))}
          </SignUpTextField>

          <SignUpTextField
            sx={{ flexGrow: 1 }}
            label="Phone Number"
            variant="standard"
            type="number"
            inputRef={phoneNumberRef}
          />
        </Box>

        <SignUpTextField select variant="standard" label="Country" inputRef={countryRef}>
          {Object.values(countryCodesList).map((rawCountry, index) => (
            <MenuItem key={index} value={rawCountry.split(":")[0]}>
              {rawCountry.split(":")[0]}
            </MenuItem>
          ))}
        </SignUpTextField>

        <SignUpTextField
          variant="standard"
          fullWidth
          label={t("password")}
          type="password"
          inputRef={passwordRef}
        />

        <SignUpTextField
          variant="standard"
          fullWidth
          label={t("c_password")}
          type="password"
          inputRef={confirmPasswordRef}
        />

        <SignUpTextField
          variant="standard"
          fullWidth
          label={t("referred_by")}
          inputRef={referralRef}
        />

        <Box m={4}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={() => {
                    setChecked(!checked);
                    console.log(checked);
                  }}
                />
              }
              label={t("register_caption")}
            />
          </FormGroup>
        </Box>

        <SignUpButton
          fullWidth
          disabled={loading || !checked}
          onClick={handleSubmit}
          variant="contained"
        >
          {t("register")}
        </SignUpButton>
      </Container>
    </>
  );
};

export default Registration;
