import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { t } from "i18next";
import React, { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useSnackbar } from "notistack";

const Settings = () => {
  const { currentUser, saveSettings, getAddresses, btc, eth, bch, xrp, ada } =
    useAuth();
  const userRef = useRef("");
  const btcRef = useRef("");
  const ethRef = useRef("");
  const bchRef = useRef("");
  const adaRef = useRef("");
  const xrpRef = useRef("");

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getAddresses();
    userRef.current.value = currentUser.email;
    btcRef.current.value = btc;
    bchRef.current.value = bch;
    xrpRef.current.value = xrp;
    adaRef.current.value = ada;
    ethRef.current.value = eth;

    console.log(btc, eth, bch, xrp, ada);
  });

  const save = () => {
    const data = {
      btc: btcRef.current.value,
      eth: ethRef.current.value,
      bch: bchRef.current.value,
      ada: adaRef.current.value,
      xrp: xrpRef.current.value,
    };

    saveSettings(currentUser.uid, data);

    enqueueSnackbar(t("saved_settings"), { variant: "success" });
  };

  return (
    <>
      <Container maxWidth="xs">
        <Paper sx={{ my: 3 }}>
          <Box p>
            <Typography my variant="h4">
              {t("settings")}
            </Typography>

            <TextField fullWidth sx={{ my: 1 }} inputRef={userRef} disabled />

            <TextField
              sx={{ my: 1 }}
              fullWidth
              defaultValue="btc"
              variant="filled"
              inputRef={btcRef}
              label={t("bitcoin_wallet")}
            />
            <TextField
              sx={{ my: 1 }}
              fullWidth
              variant="filled"
              inputRef={ethRef}
              label={t("ethereum_wallet")}
            />
            <TextField
              inputRef={bchRef}
              sx={{ my: 1 }}
              variant="filled"
              fullWidth
              label={t("bitcoin_cash_wallet")}
            />
            <TextField
              sx={{ my: 1 }}
              fullWidth
              variant="filled"
              inputRef={adaRef}
              label={t("cardano_wallet")}
            />
            <TextField
              sx={{ my: 1 }}
              fullWidth
              variant="filled"
              inputRef={xrpRef}
              label={t("ripple_wallet")}
            />

            <Button sx={{ my: 2 }} onClick={save}>
              {t("save")}
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Settings;
