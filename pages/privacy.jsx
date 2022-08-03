import { Button, Container, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const Privacy = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Typography my mt={3} variant="h4">
        {t("t_c_title")}
      </Typography>

      <Typography variant="h3" gutterBottom>
        {t("t_c_sub")}
      </Typography>

      <Typography variant="body">{t("t_c_caption")}</Typography>

      <Typography variant="h6" my>
        {t("privacy_statement")}
      </Typography>

      <Typography variant="body" my>
        {t("privacy_body")}
      </Typography>

      <Typography variant="h6" my>
        {t("guidance_title")}
      </Typography>

      <Typography variant="body" my>
        {t("guidance_body")}
      </Typography>

      <Typography variant="h6" my>
        {t("use_of_site")}
      </Typography>

      <Typography variant="body" my>
        {t("u_o_s_body")}
      </Typography>

      <Typography variant="h5" my>
        {t("r_g_terms_title")}
      </Typography>

      <Typography variant="body" my>
        {t("r_g_body")}
      </Typography>

      <Typography variant="h5" my>
        {t("d_l_liability")}
      </Typography>

      <Typography variant="body" my>
        {t("d_l_body")}
      </Typography>

      <Typography variant="h4" my>
        {t("goal_title")}
      </Typography>

      <Typography variant="body" my>
        {t("goal_body")}
      </Typography>

      <Button sx={{ ml: 1 }}>{t("register")}</Button>
    </Container>
  );
};

export default Privacy;
