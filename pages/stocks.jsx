import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { StockMarket } from "react-ts-tradingview-widgets";
import { useRouter } from "next/router";

const Stocks = () => {
  const router = useRouter();
  return (
    <Container>
      <Typography my variant="h3">
        Stocks
      </Typography>

      <StockMarket colorTheme="dark" height={400} width="100%"></StockMarket>

      <Button
        fullWidth
        variant="contained"
        onClick={() => router.push("/investnow")}
      >
        Invest Now
      </Button>
    </Container>
  );
};

export default Stocks;
