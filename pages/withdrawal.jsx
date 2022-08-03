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

const currencies = ["Bitcoin", "Ethereum", "Bitcoin Cash"];

const WITHDRAW_FORM_ENDPOINT =
  "https://public.herotofu.com/v1/7ef17d40-0cdb-11ed-9bdb-53c785fa3343";

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
