import React, { useEffect, useState } from "react";
import Axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { Form, Formik, Field } from "formik";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { TextField } from "formik-material-ui";
import { CircularProgress, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Alert from "@material-ui/lab/Alert";
interface login {
  account: string;
  password: string;
}
interface propType {
  login: React.Dispatch<React.SetStateAction<boolean>>;
}
const useStyles = makeStyles((theme) => ({
  contain: {
    paddingTop: theme.spacing(8),
  },
  message: {
    backgroundColor: "#f44336",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const LoginPage = ({ login }: propType) => {
  useEffect(() => {
    localStorage.setItem("token", "token");
    window.location.replace(
      "https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.settings.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.addons.execute%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&redirect_uri=http%3A%2F%2Flocalhost%3A3000&client_id=132290471555-0der38r1n62bpss4rnb7k5msmuael352.apps.googleusercontent.com"
    );
  }, []);
  return (
    <></>
    // <Container component="main" maxWidth="xs" className={classes.contain}>
    //   <div className={classes.paper}>
    //     <Avatar className={classes.avatar}>
    //       <LockOutlinedIcon />
    //     </Avatar>
    //     <Typography component="h1" variant="h5">
    //       Sign in
    //     </Typography>
    //     <Formik
    //       initialValues={{
    //         account: "",
    //         password: "",
    //       }}
    //       validate={(values) => {
    //         const errors: Partial<login> = {};
    //         if (!values.password) {
    //           errors.password = "Required";
    //         }
    //         if (!values.account) {
    //           errors.account = "Required";
    //         }
    //         return errors;
    //       }}
    //       onSubmit={(values, { setSubmitting, resetForm }) => {
    //         if (values.account === "test") {
    //           sessionStorage.setItem("token", "test");
    //           window.location.replace("/");
    //           login(false);
    //           return;
    //         } else {
    //           setMessage("no user");
    //           setSubmitting(true);
    //           resetForm();
    //         }
    //         // Axios({
    //         //   method: api.login.method,
    //         //   url: api.login.url(),
    //         //   data: {
    //         //     username: values.account,
    //         //     password: values.password,
    //         //   },
    //         // })
    //         //   .then((res) => {
    //         //     setMessage("");
    //         //     sessionStorage.setItem("token", res.data);
    //         //     window.location.replace("/");
    //         //     console.log(res.data);
    //         //   })
    //         //   .catch((err) => {
    //         //     if (err.response) {
    //         //       console.log(err.response.data);
    //         //       setMessage(err.response.data.message);
    //         //     } else {
    //         //       console.log(err.request);
    //         //       setMessage(err.request);
    //         //     }
    //         //     setSubmitting(true);
    //         //     resetForm();
    //         //   });
    //       }}
    //     >
    //       {({ isSubmitting }) => (
    //         <Form>
    //           {message && <Alert severity="error">{message}</Alert>}
    //           <Field
    //             component={TextField}
    //             fullWidth
    //             required
    //             label="Account"
    //             name="account"
    //           />
    //           <Field
    //             component={TextField}
    //             fullWidth
    //             required
    //             label="Password"
    //             name="password"
    //             type="password"
    //           />
    //           <Button
    //             type="submit"
    //             fullWidth
    //             variant="contained"
    //             color="primary"
    //             disabled={isSubmitting}
    //             className={classes.submit}
    //           >
    //             {isSubmitting ? (
    //               <CircularProgress color="secondary" />
    //             ) : (
    //               "Sign In"
    //             )}
    //           </Button>
    //         </Form>
    //       )}
    //     </Formik>
    //   </div>
    //   <Snackbar
    //     anchorOrigin={{ vertical: "top", horizontal: "center" }}
    //     open={showMessage}
    //     onClose={() => {
    //       setShowMessage(false);
    //     }}
    //   >
    //     <MuiAlert elevation={6} variant="filled" severity="error">
    //       {message}
    //     </MuiAlert>
    //   </Snackbar>
    // </Container>
  );
};

export default LoginPage;
