import { Box, Container, Link, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";

const Referrals = () => {
  const { t } = useTranslation();
  const { getUsername, username } = useAuth();
  useEffect(() => {
    getUsername();
  }, []);

  return (
    <Container>
      <Paper
        sx={{
          mt: 3,
        }}
      >
        <Box p pb={3}>
          <Typography gutterBottom variant="h4">
            {t("referral_link")}
          </Typography>
          <Link variant="caption">
            https://www.Galaxydholdingsinvestments/register/{username}
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};

export default Referrals;
