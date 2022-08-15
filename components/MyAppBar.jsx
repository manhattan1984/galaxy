import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  Link as MuiLink,
  Divider,
  List,
  ListItem,
  ListItemButton,
  SvgIcon,
  ListItemIcon,
  ListItemText,
  TextField,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";
import HistoryIcon from "@mui/icons-material/History";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
// import Menu, { LINKS } from "./Menu";
import { useRouter } from "next/router";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import { styled } from "@mui/system";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import i18next from "i18next";

import {
  AttachMoney,
  Group,
  History,
  Home,
  Logout,
  Person,
  PersonAddAlt,
  ShowChart,
} from "@mui/icons-material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useTranslation } from "react-i18next";

function setActive(router, link) {
  return router.pathname == link ? { borderBottom: 1, borderRadius: 0 } : "";
}

function MenuDrawer({ children, open, toggleMenu }) {
  return (
    <React.Fragment>
      <Drawer anchor="right" open={open} onClose={toggleMenu}>
        {children}
      </Drawer>
    </React.Fragment>
  );
}

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const DrawerMenu = ({ toggleMenu, links }) => {
  const router = useRouter();
  const { logOut, currentUser } = useAuth();
  const { t } = useTranslation();
  return (
    <>
      <DrawerHeader>
        <Typography color="primary" variant="h5"></Typography>
        <IconButton onClick={toggleMenu}>
          <CloseIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />

      {currentUser ? (
        <>
          <Typography variant="h6" textAlign="center">
            Invest Now
          </Typography>
          <Box>
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                router.push("/stocks");
                toggleMenu();
              }}
            >
              Stocks
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{
                my: 1,
              }}
              onClick={() => {
                router.push("/mining");
                toggleMenu();
              }}
            >
              Mining
            </Button>
          </Box>
        </>
      ) : (
        <Box display="flex" flexDirection="column" m>
          {" "}
          <Button
            onClick={() => {
              router.push("/signin");
              toggleMenu();
            }}
            sx={{ mb: 1 }}
            variant="outlined"
            startIcon={<Person />}
          >
            Sign In
          </Button>{" "}
          <Button
            onClick={() => {
              router.push("/register");
              toggleMenu();
            }}
            variant="contained"
            startIcon={<PersonAddAlt />}
          >
            Register
          </Button>
        </Box>
      )}
      <List sx={{ width: "50vw" }}>
        {links.map(({ name, link, icon }) => (
          <ListItem key={name} disablePadding>
            <ListItemButton
              onClick={() => {
                router.push(link);
                toggleMenu();
                link === "/" ? logOut() : null;
              }}
            >
              <ListItemIcon>
                <SvgIcon color="secondary" component={icon} />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

const MyAppBar = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser, logOut } = useAuth();
  const langRef = useRef("en");

  const handleLangChange = () => {
    i18next.changeLanguage(langRef.current.value);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const { t } = useTranslation();

  const authPages = [
    { name: t("dashboard"), link: "/dashboard", section: "main", icon: Home },
    // Transactions
    // {
    //   name: t("invest_now"),
    //   link: "/investnow",
    //   section: "transactions",
    //   icon: AttachMoney,
    // },
    // {
    //   name: t("investment_history"),
    //   link: "/investments",
    //   section: "transactions",
    //   icon: History,
    // },
    {
      name: t("withdraw_fund"),
      link: "/withdrawal",
      section: "transactions",
      icon: AttachMoney,
    },
    // {
    //   name: t("pro_trading"),
    //   link: "/protrading",
    //   section: "transactions",
    //   icon: ShowChart,
    // },
    // Others
    { name: t("profile"), link: "/profile", section: "Others", icon: Person },
    // {
    //   name: t("referrals"),
    //   link: "/referrals",
    //   section: "Others",
    //   icon: Group,
    // },
    // {
    //   name: t("settings"),
    //   link: "/settings",
    //   section: "Others",
    //   icon: SettingsIcon,
    // },
    { name: "Activities", link: "/activities", icon: HistoryIcon },
    {
      name: t("log_out"),
      link: "/",
      section: "Others",
      icon: PowerSettingsNewIcon,
    },
  ];

  const pages = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about" },
    { name: "Plans", link: "/#plans" },
    { name: "Contact Us", link: "/contact" },
  ];

  let links;

  currentUser ? (links = authPages) : (links = pages);

  const langs = [
    {
      value: "en",
      label: t("english"),
    },
    {
      value: "tr",
      label: t("turkish"),
    },
    {
      value: "es",
      label: t("spanish"),
    },
    {
      value: "pt",
      label: t("portuguese"),
    },
  ];

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Grid container alignItems={"center"}>
            <Grid item xs={6} md={4}>
              <Link href="/" passHref>
                <Typography
                  sx={{ height: "100%", alignSelf: "center" }}
                  variant="h6"
                >
                  {/* {t("app_title")} */}
                </Typography>
              </Link>
            </Grid>
            {/* Language */}
            {/* <Grid item xs={3} md={2}>
              <TextField
                inputRef={langRef}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LanguageOutlinedIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                select
                defaultValue="en"
                onChange={(e) => {
                  // console.log(langRef.current.value);
                  i18next.changeLanguage(e.target.value);
                }}
              >
                {langs.map(({ value, label }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid> */}

            {/* Mobile */}

            <Grid
              item
              xs={6}
              display={{ xs: "flex", md: "none" }}
              justifyContent="flex-end"
            >
              <IconButton onClick={toggleMenu}>
                <MenuIcon />
              </IconButton>
            </Grid>

            {/* Larger */}
            <Grid item md={6} display={{ xs: "none", md: "flex" }}>
              <Grid container justifyContent="flex-end">
                {links.map(({ name, link }) => (
                  <Link href={link} key={name}>
                    <Button
                      sx={{
                        ...setActive(router, link),
                      }}
                      onClick={() => {
                        link === "/" ? logOut() : null;
                      }}
                    >
                      {name}
                    </Button>
                  </Link>
                ))}
                <Box display="flex" m>
                  {!currentUser ? (
                    <>
                      {" "}
                      <Button
                        sx={{ mr: 1 }}
                        onClick={() => {
                          router.push("/signin");
                          // toggleMenu();
                        }}
                        // sx={{ mb: 1 }}
                        variant="outlined"
                        startIcon={<Person />}
                      >
                        Sign In
                      </Button>{" "}
                      <Button
                        onClick={() => {
                          router.push("/register");
                          // toggleMenu();
                        }}
                        variant="contained"
                        startIcon={<PersonAddAlt />}
                      >
                        Register
                      </Button>{" "}
                    </>
                  ) : (
                    <>
                      <>
                        <Box display="flex">
                          <Button
                            fullWidth
                            variant="contained"
                            onClick={() => {
                              router.push("/stocks");
                            }}
                          >
                            Stocks
                          </Button>
                          <Button
                            fullWidth
                            variant="contained"
                            sx={{
                              ml: 1,
                            }}
                            onClick={() => {
                              router.push("/mining");
                            }}
                          >
                            Mining
                          </Button>
                        </Box>
                      </>
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <MenuDrawer open={menuOpen} toggleMenu={toggleMenu}>
        <DrawerMenu toggleMenu={toggleMenu} links={links} />
      </MenuDrawer>
    </>
  );
};

export default MyAppBar;
