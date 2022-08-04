import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
  Paper,
} from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import lists from "../constants/lists";
import { useAuth } from "../context/AuthContext";

const InvestmentPlans = ({ children }) => {
  const { t } = useTranslation();
  const InvestmentItem = ({ title, percent, time, min, max }) => {
    //   const { addInvestment } = useAuth();
    const router = useRouter();
    const { currentUser } = useAuth();

    const handleInvestButton = () => {
      // addInvestment(title);

      if (!currentUser) {
        return router.push("/register");
      }
      router.push({ pathname: "/investnow/[title]", query: { title } });
    };

    return (
      <Grid item xs={12} md={6} lg={4}>
        <Card>
          <CardContent>
            <Typography variant="h4" color="secondary">
              {title}
            </Typography>
            <Typography variant="h5">{percent}%</Typography>
            <Typography variant="body1">{time}</Typography>
            <Typography variant="body2">{t("cap_ret")}</Typography>
            <Typography variant="body2">{t("247")}</Typography>

            <Box>
              <Typography variant="body1">
                {t("min")} {min}
              </Typography>
              <Typography variant="body1">
                {t("max")} {max}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Button onClick={handleInvestButton} color="secondary">
              {t("invest_now")}
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  };

  return (
    <Container>
      {children}
      {/* <Grid container spacing={2} my={1}>
        {lists.investmentPlans.map(
          ({ title, percent, time, min, max }, index) => (
            <InvestmentItem
              title={title}
              percent={percent}
              time={time}
              min={min}
              max={max}
              key={index}
            />
          )
        )}
      </Grid> */}
      <Paper>
        <Box p>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ textTransform: "uppercase" }}
          >
            {t("eligibility")}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {t("e_body")}
          </Typography>

          <Typography variant="h4" gutterBottom>
            {t("minimum")}
          </Typography>
          <Typography variant="body1">{t("min_value")}</Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default InvestmentPlans;
