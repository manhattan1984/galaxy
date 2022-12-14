import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Divider,
  Paper,
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
import Cryptos from "../public/cryptos.svg";
import { useTranslation } from "react-i18next";
import Footer from "../components/Footer";

const OurNumbers = ({ value, title, body }) => {
  return (
    <>
      <Typography variant="h2">{value}</Typography>
      <Typography my variant="h5">
        {title}
      </Typography>
      {body.map((text, index) => (
        <Typography
          color="text.secondary"
          variant="body1"
          key={index}
          gutterBottom
        >
          {text}
        </Typography>
      ))}
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
      body: [t("o_n_1_b")],
    },
    {
      value: t("o_n_2_t"),
      title: t("o_n_2_s"),
      body: [
        t("o_n_2_b"),
        t("o_n_2_b_2"),
        t("o_n_2_b_3"),
        t("o_n_2_b_4"),
        t("o_n_2_b_5"),
      ],
    },
    {
      value: t("o_n_3_t"),
      title: t("o_n_3_s"),
      body: [t("o_n_3_b")],
    },
    {
      value: t("o_n_4_t"),
      title: t("o_n_4_s"),
      body: [t("o_n_4_b")],
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
              variant="contained"
              size="large"
              sx={{ display: "block", color: "white" }}
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
            <Typography color="text.secondary" mb={3} variant="body1">
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

      {/* <InvestmentPlans id="plans"></InvestmentPlans> */}


      <Box m>
        <Box textAlign="center">
          <Image src={Cryptos} width={200} height={200} />
        </Box>
        <Typography variant="h4">How Are <br /> Cryptocurrencies <br /> Correlated?</Typography>
        <Typography my={4} variant="body1">Asset correlation remains a reliable hedging strategy for balancing non-digital assets within a traditional portfolio.</Typography>

        <Button sx={{ color: "#fff" }}>READ NOW</Button>
      </Box>

      <Divider />
      <Paper sx={{ mx: 1, p: 1, my: 2 }}>
        <Box m>
          <Typography my variant="h5">ELIGIBILITY REQUIREMENTS</Typography>

          <Typography>
            Accredited Investor - You are accredited as an individual if you made over $200,000 in the last two calendar years (or $300,000 with your spouse),
            or if you have greater than $1,000,000 in liquid net worth, excluding your primary residence.
          </Typography>

          <Typography my>
            MINIMUM INVESTMENTS
          </Typography>
          <Typography>
            $25,000
          </Typography>
        </Box>
      </Paper>
      <Divider />

      <Box m={2}>
        <Typography variant="h3" my={3} pt sx={{ textTransform: "uppercase" }}>
          {t("tools")}
        </Typography>

        <video playsInline controls style={{ width: "100%" }}>
          <source src="/video.mp4" />
        </video>

        <Typography my={3} variant="body1">
          {t("advanced_body")}
        </Typography>
      </Box>

      <Footer />
      {/* </Container> */}
    </>
  );
}
