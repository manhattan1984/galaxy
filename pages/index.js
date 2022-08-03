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

export default function Home() {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <>
      {/* <Container> */}
      <Box className={styles.hero}>
        <Grid container>
          <Grid item xs={12} md={6} color="white" m={2}>
            <Typography variant="h5">{t("hero_1")}</Typography>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                color: "primary.main",
              }}
            >
              {t("hero_2")}
            </Typography>

            <Typography variant="body">{t("hero_body")}</Typography>

            <Button
              sx={{ display: "block" }}
              onClick={() => {
                router.push("/register");
              }}
            >
              Get Started
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* <Box className={styles.container}>
              <img src="/phone.png" className={styles.phone} />
              <video playsInline className={styles.video}>
                <source src="/zipo.mp4" type="video/mp4" />
              </video>
            </Box> */}
          </Grid>
        </Grid>
      </Box>

      <Box
        textAlign="center"
        my={3}
        display={{ md: "flex" }}
        justifyContent="center"
      >
        <Box mb={3}>
          <Image src={Ease} />
          <Typography my={2} variant="h6" color="primary.main">
            {t("ease")}
          </Typography>
          <Typography mb>{t("ease_1")}</Typography>
          <Typography mb>{t("ease_2")}</Typography>
          <Typography mb>{t("ease_3")}</Typography>
        </Box>

        <Box mb={3}>
          <Image src={Secure} />
          <Typography my={2} variant="h6" color="primary.main">
            {t("security")}
          </Typography>
          <Typography mb>{t("security_1")}</Typography>
          <Typography mb>{t("security_2")}</Typography>
          <Typography mb>{t("security_3")}</Typography>
        </Box>

        <Box mb={3}>
          <Image src={Bank} />
          <Typography my={2} variant="h6" color="primary.main">
            {t("reliable")}
          </Typography>
          <Typography mb>{t("reliable_1")}</Typography>
          <Typography mb>{t("reliable_2")}</Typography>
          <Typography mb>{t("reliable_3")}</Typography>
        </Box>
      </Box>

      <InvestmentPlans>
        <Typography variant="h6">{t("z_a_invest")}</Typography>
      </InvestmentPlans>

      <Container>
        <Box display={{ md: "flex" }} my={4}>
          {/* <Image src={Coins} /> */}
          <Box textAlign="left">
            <Typography variant="h4">{t("unlimited")}</Typography>
            <Typography variant="h6" my={2}>
              {t("advanced")}{" "}
            </Typography>
            <Typography color="GrayText" mb={3}>
              {t("z_a_body")}
            </Typography>

            <Button
              onClick={() => {
                router.push("/register");
              }}
            >
              {t("register")}
            </Button>
          </Box>
        </Box>
      </Container>

      <Box mx={2} my={2}>
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
      </Box>

      <Box display={{ md: "flex" }} sx={{ background: "#2a2d2f" }}>
        {/* <Image src={Signals} /> */}

        <Container>
          <Box color="white">
            <Typography variant="h4" color="primary.main" my={3} pt>
              {t("tools")}
            </Typography>

            <Typography variant="h6" my={3}>
              {t("professional")}
            </Typography>

            <Typography my={3}>{t("advanced_body")}</Typography>

            <Typography variant="h6" my={3}>
              {t("apis")}
            </Typography>
            <Typography my={3}>{t("apis_body")}</Typography>

            <Typography variant="h6" my={3}>
              {t("support")}
            </Typography>

            <Typography my={3}>{t("support_body")}</Typography>

            <Box display="flex" my={3} pb={3}>
              <Button>{t("faqs")}</Button>
              <Button
                onClick={() => {
                  router.push("/register");
                }}
              >
                {t("get_started")}
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* </Container> */}
    </>
  );
}
