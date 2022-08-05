import {
  TextField,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Box, Container, Paper, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState, useRef } from "react";

const Newsletter = () => {
  const [checked, setChecked] = useState(false);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const investorRef = useRef();

  const { enqueueSnackbar } = useSnackbar();
  return (
    <Container sx={{ my: 3 }}>
      <Box textAlign="center">
        <Typography variant="h6">NEWSLETTER</Typography>
        <Typography my={3} variant="h3">
          SUBSCRIBE
        </Typography>
      </Box>
      <Paper sx={{ p: 3 }}>
        <Box m>
          <TextField
            inputRef={firstNameRef}
            required
            sx={{ my: 2 }}
            fullWidth
            label="First Name"
          />
          <TextField
            inputRef={lastNameRef}
            required
            sx={{ my: 2 }}
            fullWidth
            label="Last Name"
          />
          <TextField
            inputRef={emailRef}
            required
            sx={{ my: 2 }}
            fullWidth
            label="Email Address"
          />
          <TextField
            inputRef={investorRef}
            required
            sx={{ my: 2 }}
            fullWidth
            label="Investor Type"
          />

          <Box m={4}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={() => {
                      setChecked(!checked);
                      console.log(checked);
                    }}
                  />
                }
                label="I agree to subscribe to email communications."
              />
            </FormGroup>
          </Box>

          <Button
            variant="contained"
            sx={{ my: 2 }}
            fullWidth
            onClick={() => {
              firstNameRef.current.value = "";
              lastNameRef.current.value = "";
              emailRef.current.value = "";
              investorRef.current.value = "";

              enqueueSnackbar("Success", { variant: "success" });
            }}
          >
            SUBSCRIBE NOW
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Newsletter;
