import styled from "@emotion/styled";
import { createTheme } from "@mui/material";
import { Button, TextField, Box } from "@mui/material";
import HeroBox from "../public/hero-bg.png";

const themeOptions = {
  palette: {
    primary: { main: "#618833" },
    secondary: {
      main: "#03a9f4",
    },
  },
  typography: {
    fontFamily: "Raleway",
    h1: {
      fontFamily: "Lobster Two",
    },
    h2: {
      fontFamily: "Lobster Two",
    },
    h3: {
      fontFamily: "Lobster Two",
    },
    h4: {
      fontFamily: "Lobster Two",
    },
    h5: {
      fontFamily: "Lobster Two",
    },
    h6: {
      fontFamily: "Lobster Two",
    },
  },
};

export const myTheme = createTheme(themeOptions);

export const SignUpTextField = styled(TextField)({
  width: "100%",
  marginTop: 20,
});
export const SignUpButton = styled(Button)({
  marginTop: 20,
});
