import { Typography, Container } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import Mission from "../components/Mission";

const About = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Typography variant="h3" my={3}>
        {t("zipo_aid_investments")}
      </Typography>
      <Typography>{t("about_1")}</Typography>
      <br />
      <Typography>{t("about_2")} </Typography>
      <br />
      <Typography>{t("about_3")}</Typography>

      <Mission />
    </Container>
  );
};

export default About;
