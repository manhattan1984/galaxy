import { Email, LocationCity, LocationOn, Telegram } from "@mui/icons-material";
import {
  Box,
  Typography,
  Grid,
  Divider,
  IconButton,
  SvgIcon,
  Link as MuiLink,
  Button,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const FooterLinks = ({ link, text }) => {
    return (
      <Link href={link}>
        <MuiLink color="#fff">
          <Typography my variant="body2">
            {text}
          </Typography>
        </MuiLink>
      </Link>
    );
  };

  const aboutLinks = [
    {
      link: "/about",
      text: t("about_us"),
    },
    {
      link: "/contact",
      text: t("contact_us"),
    },
    {
      link: "/",
      text: t("faqs"),
    },
  ];

  const legalLinks = [
    {
      link: "/privacy",
      text: t("privacy_policy"),
    },
    {
      link: "/privacy",
      text: t("terms_of_service"),
    },
    {
      link: "/privacy",
      text: t("cert_of_inc"),
    },
  ];

  return (
    <Box color="white" p={2} mt={3}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="h6" my={2}>
            {t("about")}
          </Typography>

          {aboutLinks.map(({ link, text }) => (
            <FooterLinks key={text} link={link} text={text} />
          ))}
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="h6" my={2}>
            {t("legal")}
          </Typography>

          {legalLinks.map(({ link, text }) => (
            <FooterLinks key={text} link={link} text={text} />
          ))}
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="h6">{t("contact")}</Typography>
          <Box>
            <IconButton>
              <Telegram color="primary" />
            </IconButton>
            <Box display="flex" ml>
              <SvgIcon component={Email} color="primary" />
              <Typography ml variant="body">
                {t("our_email")}
              </Typography>
            </Box>
            <Box display="flex" my ml>
              <SvgIcon component={LocationOn} color="primary" />
              <Typography ml variant="body">
                {t("address")}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Divider />
      <Typography variant="body1" my>
        {t("footer_1")}
      </Typography>
      <br />
      <Typography variant="body2" my>
        {t("footer_2")}{" "}
      </Typography>

      <Divider />

      <Button
        sx={{ my: 3 }}
        variant="outlined"
        onClick={() => {
          router.push("/newsletter");
        }}
      >
        NEWSLETTER SIGNUP
      </Button>

      <Divider />

      <Typography
        sx={{
          mt: 2,
        }}
        variant="caption"
        textAlign="center"
      >
        {t("copyright")}
      </Typography>
    </Box>
  );
};

export default Footer;
