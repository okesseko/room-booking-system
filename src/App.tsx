import { ThemeProvider } from "@material-ui/styles";
import { Route, HashRouter, Redirect } from "react-router-dom";
import React, { useState } from "react";
import { createMuiTheme, createStyles, Paper } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import LoginPage from "./component/login";
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
    },
    body: {
      minHeight: "100vh",
      height: "100%",
      boxShadow: theme.shadows[0],
    },
  })
);

const App = () => {
  const [login, setLogin] = useState(true);
  const classes = useStyles();
  const theme = createMuiTheme({
    typography: {
      body2: {
        fontSize: "0.85rem",
      },
    },
  });
  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <Paper  square className={classes.body}>
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
