import { Container, Typography } from "@mui/material";
import React from "react";
import InvestmentPlans from "../../components/InvestmentPlans";
import { useTranslation } from "react-i18next";

const MyInvestmentPlans = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <InvestmentPlans>
        <Typography variant="h4" textAlign="left" mt={3}>
          {t("select_plan")}
        </Typography>
      </InvestmentPlans>
    </Container>
  );
};

export default MyInvestmentPlans;
