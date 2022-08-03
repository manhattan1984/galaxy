import React from "react";
import { Typography, Box, SvgIcon, Paper, Container } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LocationOn from "@mui/icons-material/LocationOn";
import { useTranslation } from "react-i18next";

const ContactItem = ({ title, body, icon }) => {
  return (
    <Paper sx={{ my: 2 }}>
      <Box textAlign="center" p>
        <SvgIcon color="secondary" component={icon} fontSize="large" />
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body">{body}</Typography>
      </Box>
    </Paper>
  );
};

const Contact = () => {
  const { t } = useTranslation();

  const contactItems = [
    {
      title: t("location"),
      body: t("address"),
      icon: LocationOn,
    },
    {
      title: t("mail_us"),
      body: t("our_email"),
      icon: MailIcon,
    },
    {
      title: t("live_chat"),
      body: t("chat_us"),
      icon: SupportAgentIcon,
    },
  ];
  return (
    <Container
      sx={{
        mt: 2,
      }}
      maxWidth="md"
    >
      <Typography variant="h4">{t("contact_us")}</Typography>
      {contactItems.map(({ title, body, icon }) => (
        <ContactItem key={title} title={title} body={body} icon={icon} />
      ))}
    </Container>
  );
};

export default Contact;
