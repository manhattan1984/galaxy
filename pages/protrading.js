import { Lock } from "@mui/icons-material";
import { Box, Paper, SvgIcon, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const Protrading = () => {
  const { t } = useTranslation();
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        sx={{
          height: "60vh",
        }}
      >
        <Paper>
          <Box py={7} px={3}>
            <SvgIcon component={Lock} fontSize="large" />

            <Typography pt={2}>{t("protrading_vip")}</Typography>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default Protrading;
