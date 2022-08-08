import {
  AttachMoney,
  LocalAtm,
  Money,
  Savings,
  ShowChart,
} from "@mui/icons-material";
import {
  Grid,
  Paper,
  Box,
  Typography,
  Container,
  SvgIcon,
} from "@mui/material";
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import InvestmentPlans from "../components/InvestmentPlans";

const DashboardItem = ({ icon, title, value, isNumber, bgColor }) => {
  return (
    <Grid item xs={12} md={6} lg={3}>
      <Paper
        sx={{
          backgroundColor: bgColor,
        }}
      >
        <Box display="flex" justifyContent="space-between">
          <Box color="white" width="100%" pb={4} pt={2} m>
            <Typography mb={2}>{title}</Typography>
            <Typography variant="h5">
              {isNumber ? "$" : ""} {value}
            </Typography>
          </Box>

          <SvgIcon
            color="white"
            fontSize="large"
            sx={{
              alignSelf: "center",
              color: "white",
              mr: 4,
              fontSize: "3rem",
            }}
            component={icon}
          />
        </Box>
      </Paper>
    </Grid>
  );
};

const Dashboard = () => {
  const {
    currentUser,
    usdBalance,
    getBalances,
    getUsername,
    username,
    activeInvestment,
    totalEarned,
    totalDeposit,
  } = useAuth();

  const { t } = useTranslation();

  const dashboardItems = [
    {
      icon: Savings,
      title: t("balance"),
      value: usdBalance,
      isNumber: true,
      bgColor: "primary.light",
    },
    {
      icon: ShowChart,
      title: t("investment"),
      value: activeInvestment,
      isNumber: false,
      bgColor: "secondary.light",
    },
    {
      icon: AttachMoney,
      title: t("deposit"),
      value: totalDeposit,
      isNumber: true,
      bgColor: "primary.main",
    },
    {
      icon: LocalAtm,
      title: t("earned"),
      value: totalEarned,
      isNumber: true,
      bgColor: "secondary.main",
    },
  ];

  useEffect(() => {
    getBalances();
    getUsername();
  }, []);

  return (
    <Container>
      <Typography variant="h6" my={2}>
        {t("welcome_user")}, {username}
      </Typography>

      <Grid container spacing={2} mb={3}>
        {dashboardItems.map(({ icon, title, value, isNumber, bgColor }) => (
          <DashboardItem
            key={title}
            icon={icon}
            title={title}
            value={value}
            isNumber={isNumber}
            bgColor={bgColor}
          />
        ))}
      </Grid>

      <InvestmentPlans />
    </Container>
  );
};

export default Dashboard;
