import React, { useRef } from "react";
import USDT from "../public/qr-codes/usdt.jpeg";
import BTC from "../public/qr-codes/btc.jpeg";
import Image from "next/image";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSnackbar } from "notistack";
import {
  Typography,
  Box,
  Button,
  Container,
  TextField,
  MenuItem,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";

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
const InvestNow = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { currentUser } = useAuth();

  const amountRef = useRef();
  const cryptoRef = useRef();

  const sendDepositEmail = async () => {
    const data = {
      email: currentUser.email,
      subject: `Deposit Confirmed`,
      message: `
      
      <p>Deposit Successful 

      <br />
      <br />
      Your deposit of  
      ${amountRef.current.value} ${cryptoRef.current.value} is now available in your GALAXY account. Log in to check your balance.
      Read our FAQs if you are running problems. <br />

      https://galaxydholdings.com/dashboard

      Don't recognize this activity? Please reset your password and account and contact support team immediately.

      <i>This is an automated message. please do not reply.</i>
      </p>`,
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

  const handleDeposit = () => {
    if (amountRef.current.value && cryptoRef.current.value) {
      sendDepositEmail();
      amountRef.current.value = null;
      cryptoRef.current.value = null;
      enqueueSnackbar("Deposit Request Send", { variant: "success" });
      return;
    }
    enqueueSnackbar("Please Fill In The Form", { variant: "error" });
    return;
  };
  return (
    <Container>
      <Typography my variant="h3">
        Invest Now
      </Typography>
      {wallets.map(({ qrCode, name, address, network }) => (
        <WalletItem
          key={name}
          qrCode={qrCode}
          name={name}
          address={address}
          network={network}
        />
      ))}

      <Box>
        <Typography my={2} variant="h3">
          Deposit Now
        </Typography>

        <TextField
          inputRef={amountRef}
          type="number"
          fullWidth
          sx={{ my: 1 }}
          label="Amount ($)"
        />

        <TextField inputRef={cryptoRef} fullWidth sx={{ my: 1 }} select>
          <MenuItem value="USDT">USDT</MenuItem>
          <MenuItem value="BTC">BTC</MenuItem>
        </TextField>

        <Button
          fullWidth
          sx={{ my: 1 }}
          variant="contained"
          onClick={handleDeposit}
        >
          Deposit
        </Button>
      </Box>
    </Container>
  );
};

export default InvestNow;
