import "../styles/globals.css";
import { Container } from "@mui/material";
import { AuthProvider } from "../context/AuthContext";
import Footer from "../components/Footer";
import MyAppBar from "../components/MyAppBar";
import { ThemeProvider } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { myTheme } from "../styles/styles";
import { SnackbarProvider } from "notistack";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ["tr", "en", "es", "pt"],
    fallbackLng: "en",
    detection: {
      order: ["cookie", "htmlTag", "localStorage", "path", "subdomain"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
    // react: { useSuspense: false },
  });

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={myTheme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={2}>
        <AuthProvider>
          <MyAppBar />
          <Component {...pageProps} />
          {/* <Footer /> */}
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default MyApp;
