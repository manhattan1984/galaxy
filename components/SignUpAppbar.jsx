import { Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const SignUpAppbar = ({ text, onClick }) => {
  const router = useRouter();
  return (
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h5" color="primary.main">
              {/* Galaxydholdings */}
            </Typography>
          </Grid>
          <Grid item xs={6} textAlign="end" alignSelf="center">
            <Button onClick={onClick}>{text}</Button>
          </Grid>
        </Grid>
      </Toolbar>
    </Container>
  );
};

export default SignUpAppbar;
