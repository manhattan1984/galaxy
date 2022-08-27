import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { StockMarket } from "react-ts-tradingview-widgets";
import { useRouter } from "next/router";

const Stocks = () => {
  const router = useRouter();
  return (
    <Container>
      <Typography my variant="h3">
        Stocks
      </Typography>

      <Box>
        <iframe
          name="ScreenerWidget"
          src="https://darqube.com/external-embedding/screener-widget?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ3aWRnZXQiOnsic2NyZWVuZXJfYXNzZXRfY2xhc3NlcyI6WyJTVE9DS1MiLCJDUllQVE8iLCJGT1JFWCJdfSwid190eXBlIjoiU2NyZWVuZXJXaWRnZXQiLCJmZV9jZmciOnsiY21vZGUiOjAsImZjbHIiOiJyZ2JhKDI1NSwgMjU1LCAyNTUsIDEpIiwiYmciOiJyZ2JhKDIxLCAyNSwgMzAsIDEpIiwiaCI6NTEwLCJ3Ijo5MDAsImFzeiI6dHJ1ZSwibG5nIjoiZW4iLCJoZGljbiI6ZmFsc2UsInd0bVYiOnsidHlwZSI6IkRhcnF1YmUiLCJlbmFibGVkIjp0cnVlfX0sImV4cCI6MTY2OTM5ODI0NSwic3ViIjoiYWNjZXNzIn0.d9qZ7vFcqfj2DhVCxp7r4A71EkaIDTiaQuM2NwWKksc"
          id="ScreenerWidget"
          width="100%"
          height="100%"
        ></iframe>
      </Box>

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
