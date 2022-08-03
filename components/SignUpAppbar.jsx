import { Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import logo from "../public/zipo-aid.png";

const SignUpAppbar = ({ text, onClick }) => {
  const router = useRouter();
  return (
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h5" color="primary.main">
              {/* Zipo Aid */}
            </Typography>
          </Grid>
          <Grid item xs={6} textAlign="end" alignSelf="center">
            {/* <img src={Logo} className="appbar-logo" /> */}
            <Button onClick={onClick}>{text}</Button>
          </Grid>
        </Grid>
      </Toolbar>
    </Container>
  );
};

export default SignUpAppbar;
