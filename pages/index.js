import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import MyAppBar from "../components/MyAppBar";
import styles from "../styles/Home.module.css";
import Ease from "../public/ease.webp";
import Bank from "../public/bank.webp";
import Secure from "../public/secure.webp";
import { useRouter } from "next/router";
import InvestmentPlans from "../components/InvestmentPlans";
import MarketWatch from "../public/marketwatch.svg";
import Reuters from "../public/reuters.svg";
import TheGuardian from "../public/theguardian.svg";
import Bloomberg from "../public/bloomberg.svg";
import { useTranslation } from "react-i18next";

const OurNumbers = ({ value, title, body }) => {
  return (
    <>
      <Typography variant="h2">{value}</Typography>
      <Typography my variant="h5">
        {title}
      </Typography>
      <Typography variant="body1">{body}</Typography>
      <Divider
        sx={{
          my: 3,
        }}
      />
    </>
  );
};

export default function Home() {
  const router = useRouter();
  const { t } = useTranslation();

  const ourNumbers = [
    {
      value: t("o_n_1_t"),
      title: t("o_n_1_s"),
      body: t("o_n_1_b"),
    },
    {
      value: t("o_n_2_t"),
      title: t("o_n_2_s"),
      body: t("o_n_2_b"),
    },
    {
      value: t("o_n_3_t"),
      title: t("o_n_3_s"),
      body: t("o_n_3_b"),
    },
    {
      value: t("o_n_4_t"),
      title: t("o_n_4_s"),
      body: t("o_n_4_b"),
    },
  ];
  return (
    <>
      {/* <Container> */}
      <Box className={styles.hero}>
        <Grid container textAlign="center">
          <Grid item m={2}>
            <Typography
              variant="h3"
              gutterBottom
              sx={{ textTransform: "uppercase" }}
            >
              {t("hero_1")}
            </Typography>
            <Typography variant="h5" gutterBottom>
              {t("hero_2")}
            </Typography>

            <Button
              sx={{ display: "block" }}
              onClick={() => {
                router.push("/register");
              }}
            >
              Get Started
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Container>
        <Box display={{ md: "flex" }} my={4}>
          <Box textAlign="left">
            <Typography variant="h3" sx={{ textTransform: "uppercase" }}>
              {t("unlimited")}
            </Typography>
            <Typography color="GrayText" mb={3} variant="body1">
              {t("z_a_body")}
            </Typography>
          </Box>
        </Box>
      </Container>

      <Box m={2}>
        {ourNumbers.map(({ value, title, body }) => (
          <OurNumbers key={value} value={value} title={title} body={body} />
        ))}
      </Box>

      <InvestmentPlans>
        <Typography variant="h6">{t("z_a_invest")}</Typography>
      </InvestmentPlans>

      {/* <Box mx={2} my={2}>
        <Typography variant="h6" color="GrayText">
          {t("seen")}
        </Typography>
        <Box
          display="flex"
          justifyContent="space-around"
          sx={{ flexWrap: "wrap" }}
        >
          <Image src={Reuters} />
          <Image src={MarketWatch} />
          <Image src={Bloomberg} />
          <Image src={TheGuardian} />
        </Box>
      </Box> */}

      <Box m={2}>
        <Typography
          variant="h3"
          color="primary.main"
          my={3}
          pt
          sx={{ textTransform: "uppercase" }}
        >
          {t("tools")}
        </Typography>

        <Typography my={3} variant="body1">
          {t("advanced_body")}
        </Typography>
      </Box>

      {/* </Container> */}
    </>
  );
}
