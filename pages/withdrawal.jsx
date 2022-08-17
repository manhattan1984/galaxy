import { CloudCircleSharp } from "@mui/icons-material";
import { TextField, Container } from "@mui/material";
import {
  Box,
  Button,
  Paper,
  SvgIcon,
  Typography,
  MenuItem,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { sendEmail } from "../backend/herotofu";
import { useAuth } from "../context/AuthContext";
import postmark from "postmark";

const currencies = ["Bitcoin", "Ethereum", "Bitcoin Cash"];

const WITHDRAW_FORM_ENDPOINT =
  "https://public.herotofu.com/v1/8aad0cf0-137d-11ed-bc91-695741f28ee9";
//

// const client = new SMTPClient({
//   user: "info@galaxydholdings.com",
//   password: "Forever2021",
//   host: "galaxydholdings.com",
// });

// client.send(
//   {
//     text: "i hope this works",
//     from: "Galaxy Holdings <info@galaxydholdings.com>",
//     to: "Me <mikkimanhattan@gmail.com>",
//     subject: "testing emailjs",
//   },
//   (err, message) => {
//     console.log(err || message);
//   }
// );

//

const Withdrawal = () => {
  const { t } = useTranslation();
  const amountRef = useRef();
  const cryptoRef = useRef();
  const { enqueueSnackbar } = useSnackbar();
  const { currentUser } = useAuth();

  const clearFields = () => {
    amountRef.current.value = "";
    cryptoRef.current.value = null;
  };

  const sendEmailToUser = async () => {
    const data = {
      email: currentUser.email,
      subject: "Withdrawal",
      message: `<b>Your withdrawal request of $${amountRef.current.value} was successfully sent, kindly wait while we process your transaction.</b>`,
    };
    const results = await fetch("/api/email", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (results.status == 200) {
      console.log("success");
    } else {
      console.log("error");
    }
  };

  return (
    <Container>
      <Paper
        sx={{
          mt: 3,
        }}
      >
        <Box p={3}>
          <Typography variant="h6" mb>
            {t("withdraw_fund")}
          </Typography>

          <TextField
            fullWidth
            label={t("amount") + " ($)"}
            inputRef={amountRef}
          />

          <TextField
            select
            label={t("crypto")}
            inputRef={cryptoRef}
            fullWidth
            sx={{
              my: 2,
            }}
          >
            {currencies.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </TextField>

          <Button
            onClick={() => {
              sendEmailToUser();
              sendEmail(
                {
                  email: currentUser.email,
                  amount: amountRef.current.value,
                  crypto: cryptoRef.current.value,
                },
                WITHDRAW_FORM_ENDPOINT
              );
              clearFields();
              enqueueSnackbar(t("withdraw_snack"), { variant: "success" });
            }}
          >
            {t("withdraw")}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Withdrawal;
