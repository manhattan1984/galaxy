import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  SvgIcon,
  Grid,
  Avatar,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import MyAppBar from "../components/MyAppBar";
import {
  Cancel,
  CheckCircle,
  ContentPaste,
  Done,
  PendingActions,
} from "@mui/icons-material";
import BuyCrypto from "../public/buy-crypto.svg";
import Image from "next/image";
import { MarketOverview } from "react-ts-tradingview-widgets";
import { useTranslation } from "react-i18next";

function setActive(router, link) {
  return router.pathname == link ? { borderBottom: 1, borderRadius: 0 } : "";
}

const Profile = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    currentUser,
    logOut,
    usdBalance,
    getBalances,
    username,
    getUsername,
  } = useAuth();

  useEffect(() => {
    getUsername();
  }, []);

  async function handleLogOut() {
    setError("");

    try {
      await logOut();
      router.push("/");
    } catch (error) {
      setError("Failed to log out");
      console.log(error);
    }
  }

  function displayWelcome() {
    try {
      return (
        <Typography variant="h6" my={2}>
          {t("hi_welcome")} {username}
        </Typography>
      );
    } catch (e) {}
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    getBalances();
  }, []);

  return (
    <>
      <Container>
        {displayWelcome()}

        <Box width="100%" my={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  background: "gainsboro",
                }}
              >
                <Box p={3} pb={4} display="flex" justifyContent="space-between">
                  <Typography variant="body">{t("steps_1")}</Typography>
                  <SvgIcon component={Done} color="success" />
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper>
                <Box display="flex" justifyContent="space-between" p={3}>
                  <Typography>{t("steps_2")}</Typography>
                  <Button
                    size="small"
                    onClick={() => {
                      router.push("/investnow");
                    }}
                  >
                    {t("steps_2_btn")}
                  </Button>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper>
                <Box p={3} display="flex" justifyContent="space-between">
                  <Typography>{t("steps_3")}</Typography>
                  <Button
                    size="small"
                    onClick={() => {
                      router.push("/protrading");
                    }}
                  >
                    {t("steps_3_btn")}
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        <Button
          onClick={() => {
            router.push("/dashboard");
          }}
        >
          {t("go_to_dash")}
        </Button>

        <Box my={2}>
          <MarketOverview
            colorTheme="dark"
            height={400}
            width="100%"
            showFloatingTooltip
          ></MarketOverview>
        </Box>

        <Paper>
          <Box my={2} p={3}>
            <Typography my={2}>{t("profile")}</Typography>
            <Box display="flex">
              <Box mx={2}>
                <Avatar>Z</Avatar>
                <Typography my={2}>${usdBalance}</Typography>
              </Box>
              <Box>
                <Box>
                  <Typography mb={1} color="GrayText" variant="subtitle2">
                    {t("account")}
                  </Typography>
                  <Typography>{currentUser.email}</Typography>
                </Box>
                <Box my={1}>
                  <Typography color="GrayText" variant="subtitle2">
                    {t("status")}
                  </Typography>
                  <Box>
                    <Box display="flex">
                      <SvgIcon component={CheckCircle} color="success" />
                      <Typography>{t("zipo_starter")}</Typography>
                    </Box>
                    <Box display="flex">
                      <SvgIcon component={Cancel} color="error" />
                      <Typography>{t("zipo_user")}</Typography>
                    </Box>
                    <Box display="flex">
                      <SvgIcon component={Cancel} color="error" />
                      <Typography>{t("zipo_vip")}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box>
              {/* <Button>Settings</Button> */}
              <Button onClick={handleLogOut}>{t("log_out")}</Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Profile;
