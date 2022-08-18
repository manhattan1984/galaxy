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
      <Typography m variant="h5">
        Galaxy Holdings
      </Typography>

      <Button
        onClick={() => {
          router.push("/newsletter");
        }}
      >
        Contact Us
      </Button>

      {/* <Typography m variant="h6">
        300 Vesey Street, 13th Floor <br /> New York, NY 10282
      </Typography> */}

      <Button
        sx={{ my: 3 }}
        variant="outlined"
        onClick={() => {
          router.push("/newsletter");
        }}
        fullWidth
      >
        NEWSLETTER SIGNUP
      </Button>

      <Box>
        <Typography my>Privacy Policy</Typography>
        <Typography my>Terms and Conditions</Typography>
        <Typography my>Disclaimers</Typography>
        <Typography my>Brokercheck</Typography>
      </Box>

      <Typography
        sx={{
          mt: 2,
          color: "#a8caeb",
        }}
        variant="body2"
        textAlign="center"
      >
        © 2021 Galaxy Holdings. Security products and services are offered by
        Galaxy Digital Partners LLC, a member of FINRA and SIPC. For more
        information about Galaxy Digital Partners LLC, please see our Form CRS
        and additional disclosures related to Regulation Best Interest which may
        be found here.
      </Typography>
    </Box>
  );
};

export default Footer;
