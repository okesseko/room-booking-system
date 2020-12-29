import { ThemeProvider } from "@material-ui/styles";
import { Route, HashRouter, Redirect } from "react-router-dom";
import React, { useState } from "react";
import { createMuiTheme, createStyles, Paper } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import LoginPage from "./component/login";
import Navbar from "./component/navbar";
import Home from "./component/home";
import PersonalPage from "./component/personal";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    "@global": {
      "*::-webkit-scrollbar": {
        width: "0.3rem",
        height: "0.5rem",
      },
      "*::-webkit-scrollbar-track": {
        background: "#f1f1f1",
      },
      "*::-webkit-scrollbar-thumb": {
        background: "#888",
      },
      // "*.MuiPickersDay-day": {
      //   width: "24px",
      //   height: "24px",
      // },
      // "*.MuiPickersCalendarHeader-dayLabel": {
      //   width: "24px",
      // },
    },
    body: {
      minHeight: "100vh",
      height: "100%",
      boxShadow: theme.shadows[0],
    },
  })
);

const App = () => {
  const [login, setLogin] = useState<boolean>(true);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const classes = useStyles();
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#303f9f" : "#3f51b5",
      },
      action: {
        selected: darkMode ? "#303f9f" : "#97CBFF",
      },
    },
    typography: {
      body2: {
        fontSize: "0.85rem",
      },
    },
  });
  console.log("app");
  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <Paper  square className={classes.body}>
          {/* {sessionStorage.getItem("token") && login && (
            <Navbar Mode={darkMode} setMode={setDarkMode} />
          )} */}
          <Route
            exact
            path="/"
            render={() =>
              sessionStorage.getItem("token") ? (
                <Home />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
           <Route
            path="/personal"
            render={() =>
              sessionStorage.getItem("token") ? (
                <PersonalPage />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/login"
            component={() => <LoginPage login={setLogin} />}
          />
        </Paper>
      </ThemeProvider>
    </HashRouter>
  );
};
export default App;
