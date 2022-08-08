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
  const InvestmentItem = ({ percent, time, min, max }) => {
    return (
      <Grid item xs={12} md={6} lg={4}>
        <Paper>
          <Box m p>
            <Box my display="flex" justifyContent="space-between">
              <Box>
                <Typography>${min} Minimum</Typography>
                <Typography>${max} Maximum</Typography>
              </Box>
              <Box>
                <Typography>ROI {percent}% Daily</Typography>
              </Box>
            </Box>

            <Box my={2} display="flex" justifyContent="space-between">
              <Typography>{time} Days Trade</Typography>
              <Typography>Active</Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
    );
  };

  const investments = [
    {
      min: 25_000,
      max: 200_000,
      percent: 50,
      time: 60,
    },
    {
      min: 200000,
      max: "unlimited",
      percent: 1,
      time: 90,
    },
  ];

  return (
    <Container>
      <Typography variant="h4">Investment Plans</Typography>
      <Grid container spacing={2} my={1}>
        <Grid item xs={12} md={6} lg={4}>
          <Paper>
            <Box m p>
              <Box my display="flex" justifyContent="space-between">
                <Box>
                  <Typography>$ 25,000 Minimum</Typography>
                  <Typography>$ 200,000 Maximum</Typography>
                </Box>
                <Box>
                  <Typography>ROI 3% Daily</Typography>
                </Box>
              </Box>

              <Box my={2} display="flex" justifyContent="space-between">
                <Typography>60 Days Trade</Typography>
                <Typography>Active</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Paper>
            <Box m p>
              <Box my display="flex" justifyContent="space-between">
                <Box>
                  <Typography>$200,000 Minimum</Typography>
                  <Typography>Unlimited</Typography>
                </Box>
                <Box>
                  <Typography>ROI 5% Daily</Typography>
                </Box>
              </Box>

              <Box my={2} display="flex" justifyContent="space-between">
                <Typography>90 Days Trade</Typography>
                <Typography></Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Paper>
            <Box m p>
              <Box my display="flex" justifyContent="space-between">
                <Box>
                  <Typography>Peer To Peer</Typography>
                  <Typography>Minimum $1,000 </Typography>
                </Box>
                <Box>
                  <Typography>ROI 1.25% Daily</Typography>
                </Box>
              </Box>

              <Box my={2} display="flex" justifyContent="space-between">
                <Typography>60 Days Trade</Typography>
                <Typography>Active</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default InvestmentPlans;
