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
          src="https://darqube.com/external-embedding/5?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ3aWRnZXQiOnsic2NyZWVuZXJfYXNzZXRfY2xhc3NlcyI6WyJTVE9DS1MiLCJGT1JFWCJdfSwid190eXBlIjoiU2NyZWVuZXJXaWRnZXQiLCJmZV9jZmciOnsiY21vZGUiOjAsImZjbHIiOiJyZ2JhKDI1NSwgMjU1LCAyNTUsIDEpIiwiYmciOiJyZ2JhKDIxLCAyNSwgMzAsIDEpIiwiaCI6NTEwLCJ3Ijo5MDAsImFzeiI6dHJ1ZSwiaGRpY24iOmZhbHNlLCJ3dG1WIjp7InR5cGUiOiJEYXJxdWJlIiwiZW5hYmxlZCI6dHJ1ZX19LCJleHAiOjE2NjgwMjIwMjEsInN1YiI6ImFjY2VzcyJ9.KSm6kO4adX38UJK9Hb8BA8qx7nt-FFcruBzVAxAEOzY"
          id="ScreenerWidget"
          width="100%"
          height="600px"
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
