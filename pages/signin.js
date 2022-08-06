import { Container, Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import SignUpAppbar from "../components/SignUpAppbar";
import { SignUpButton, SignUpTextField } from "../styles/styles";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

const Signin = () => {
  const { t } = useTranslation();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { logIn, resetEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [correct, setCorrect] = useState();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      const correct = await logIn(
        emailRef.current.value,
        passwordRef.current.value
      );
      correct
        ? router.push("/dashboard")
        : enqueueSnackbar(t("invalid_email"), { variant: "error" })``;
    } catch (error) {
      setError("Invalid username or password");
      console.log(error);
    }
    setLoading(false);
  }
  return (
    <>
      <SignUpAppbar
        text="Register"
        onClick={() => {
          router.push("/register");
        }}
      />
      <Container maxWidth="sm">
        <Box textAlign="center" m>
          <Typography variant="h4">{t("sign_in")}</Typography>
          <Box display="flex" justifyContent="center">
            <Typography variant="subtitle1" mr>
              {t("no_account")}
            </Typography>
            <Typography variant="subtitle1">{t("register_now")}</Typography>
          </Box>
        </Box>
        <SignUpTextField
          variant="standard"
          label={t("email")}
          inputRef={emailRef}
        />
        <SignUpTextField
          variant="standard"
          type="password"
          label={t("password")}
          inputRef={passwordRef}
        />
        <Box display="flex" justifyContent="flex-end" width="100%" mt={2}>
          <Button
            onClick={() => {
              resetEmail(emailRef.current.value);
              console.log(emailRef.current.value);
              enqueueSnackbar(t("reset_email_message"));
            }}
            size="small"
          >
            {t("forgot_password")}
          </Button>
        </Box>

        <Box textAlign="center">
          <Typography
            my={2}
            textAlign="center"
            variant="caption"
            color="text.secondary"
          >
            {t("privacy")}
          </Typography>
        </Box>

        {true && <Typography color="red">{error}</Typography>}

        <SignUpButton
          fullWidth
          disabled={loading}
          variant="contained"
          onClick={handleSubmit}
        >
          {t("sign_in")}
        </SignUpButton>
        <SignUpButton
          fullWidth
          onClick={() => {
            router.push("/register");
          }}
        >
          {t("register")}
        </SignUpButton>
      </Container>
    </>
  );
};

export default Signin;
