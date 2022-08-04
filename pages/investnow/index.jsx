import { Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { Paper, Container, Box } from "@mui/material";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { lists } from "../../constants";
import { sendEmail } from "../../backend/herotofu";
import { useAuth } from "../../context/AuthContext";
import Bitcoin from "../../public/qr-codes/Btc.jpg";
import BitcoinCash from "../../public/qr-codes/bitcoincash.jpeg";
import Usdt from "../../public/qr-codes/Usdt.jpg";
import Litecoin from "../../public/qr-codes/litecoin.jpeg";
import Solana from "../../public/qr-codes/solana.jpeg";
import Xrp from "../../public/qr-codes/xrp.jpeg";
import Ada from "../../public/qr-codes/ada.jpeg";

import { useTranslation } from "react-i18next";
import InvestmentPlans from "../../components/InvestmentPlans";

const DEPOSIT_FORM_ENDPOINT =
  "https://public.herotofu.com/v1/70e4b570-137d-11ed-bc91-695741f28ee9";
const wallets = [
  {
    name: "Bitcoin",
    address: "17x9d86hSNUaekLxki5SVF1LHByUHJec4T",
    code: Bitcoin,
  },
  {
    name: "USDT",
    address: "TH3PshVZ8kyDPGaR58qxjwwUpHmmHwacHd",
    code: Usdt,
  },
];
const ShowPayment = ({ name, amount }) => {
  const wallet = wallets.find((wallet) => wallet.name === name);

  const { t } = useTranslation();

  return (
    <>
      <Image src={wallet.code} />
      {/* <Typography variant="h6">
        Transfer {amount} {wallet.name} to{" "}
      </Typography>
      <Typography variant="caption">{wallet.address}</Typography> */}
      <Typography vairant="h6">
        {t("transfer", { amount, name: wallet.name, address: wallet.address })}
      </Typography>
    </>
  );
};

const Invest = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { title } = router.query;
  const amountRef = useRef();
  const cryptoRef = useRef();
  const [showOrder, setShowOrder] = useState(false);
  const { currentUser } = useAuth();

  const clearFields = () => {
    amountRef.current.value = null;
    cryptoRef.current.value = null;
  };
  return (
    <Container maxWidth="xs">
      <InvestmentPlans />

      <Paper
        sx={{
          mt: 4,
          p: 2,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">{t("investment_plans")}</Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              select
              label={t("crypto")}
              inputRef={cryptoRef}
              fullWidth
            >
              {wallets.map(({ name }, index) => (
                <MenuItem key={index} value={name}>
                  {name}
                </MenuItem>
              ))}
            </TextField>{" "}
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label={t("amount")} inputRef={amountRef} />
          </Grid>
          {/* Percent */}
          {/* <Grid item xs={12}>
            <TextField label={t("interest")} fullWidth value={0} disabled />
          </Grid> */}

          <Grid item xs={12}>
            <Button
              onClick={() => {
                setShowOrder(!showOrder);
                sendEmail(
                  {
                    crypto: cryptoRef.current.value,
                    amount: amountRef.current.value,
                    user: currentUser.email,
                  },
                  DEPOSIT_FORM_ENDPOINT
                );
                // clearFields();
              }}
            >
              {t("submit")}
            </Button>

            {showOrder ? (
              // <Typography m my={4} variant="body2">
              //   Transfer {amountRef.current.value} {cryptoRef.current.value} to
              //   this address{" "}
              //   {
              //     wallets.find((wallet) => {
              //       wallet.name === cryptoRef.current.value;
              //     }).address
              //   }
              // </Typography>
              <ShowPayment
                amount={amountRef.current.value}
                name={cryptoRef.current.value}
              />
            ) : null}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Invest;
