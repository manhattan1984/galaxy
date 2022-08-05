import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { CryptoCurrencyMarket } from "react-ts-tradingview-widgets";
import { useRouter } from "next/router";

const Mining = () => {
  const router = useRouter();
  return (
    <Container>
      <Typography my variant="h3">
        Mining
      </Typography>
      <CryptoCurrencyMarket
        colorTheme="dark"
        width="100%"
        height={400}
      ></CryptoCurrencyMarket>

      <Button fullWidth onClick={() => router.push("/investnow")}>Invest Now</Button>
    </Container>
  );
};

export default Mining;
