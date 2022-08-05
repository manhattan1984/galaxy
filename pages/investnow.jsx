import React from "react";
import USDT from "../public/qr-codes/usdt.jpeg";
import BTC from "../public/qr-codes/btc.jpeg";
import Image from "next/image";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSnackbar } from "notistack";
import { Typography, Box, Button, Container } from "@mui/material";

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
  const { enqueueSnackbar } = useSnackbar();

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
    </Container>
  );
};

export default InvestNow;
