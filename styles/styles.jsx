import styled from "@emotion/styled";
import { createTheme } from "@mui/material";
import { Button, TextField, Box } from "@mui/material";
import HeroBox from "../public/hero-bg.png";

const themeOptions = {
  palette: {
    primary: { main: "#e77e1b" },
    secondary: {
      main: "#618833",
    },
  },
  typography: {
    fontFamily: "Raleway",
    h1: {
      fontFamily: "Montserrat",
    },
    h2: {
      fontFamily: "Montserrat",
    },
    h3: {
      fontFamily: "Montserrat",
    },
    h4: {
      fontFamily: "Montserrat",
    },
    h5: {
      fontFamily: "Montserrat",
    },
    h6: {
      fontFamily: "Montserrat",
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
