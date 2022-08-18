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
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { sendEmail } from "../backend/herotofu";
import { useAuth } from "../context/AuthContext";
import postmark from "postmark";
import USDT from "../public/qr-codes/usdt.jpeg";
import BTC from "../public/qr-codes/btc.jpeg";
import Image from "next/image";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSnackbar } from "notistack";

const wallets = [
  {
    qrCode: USDT,
    name: "USDT",
    network: "TRC20",
    address: "TH3PshVZ8kyDPGaR58qxjwwUpHmmHwacHd",
  },
  {
    qrCode: BTC,
    name: "BTC",
    network: "BTC",
    address: "17x9d86hSNUaekLxki5SVF1LHByUHJec4T",
  },
];

const WalletItem = ({ qrCode, name, network, address }) => {
  return (
    <Box my>
      <Typography variant="h6" my={2} mx={3}>
        {name}
      </Typography>

      <Image src={qrCode} />

      <Box>
        <Box my={1} display="flex" justifyContent="space-between">
          <Typography>Network</Typography>
          <Typography>{network}</Typography>
        </Box>
        <Typography gutterBottom>Address</Typography>
        <Typography variant="body2">{address}</Typography>
      </Box>

      <CopyToClipboard text={address}>
        <Button
          fullWidth
          onClick={() => {
            enqueueSnackbar("Address Copied!");
          }}
        >
          Copy Address
        </Button>
      </CopyToClipboard>
    </Box>
  );
};

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

      {wallets.map(({ qrCode, name, address, network }) => (
        <WalletItem
          key={name}
          qrCode={qrCode}
          name={name}
          address={address}
          network={network}
        />
      ))}
    </Container>
  );
};

export default Withdrawal;
