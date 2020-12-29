import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { Form, Formik, Field } from "formik";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { TextField } from "formik-material-ui";
import { CircularProgress, Grid, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Alert from "@material-ui/lab/Alert";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
interface login {
  oldpassword: string;
  newpassword: string;
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
const PersonalPage = () => {
  const classes = useStyles();
  const [message, setMessage] = useState<string>("");
  const [showMessage, setShowMessage] = useState<boolean>(false);
  return (
    <Container component="main" maxWidth="xs" className={classes.contain}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <Formik
          initialValues={{
            oldpassword: "",
            newpassword: "",
          }}
          validate={(values) => {
            const errors: Partial<login> = {};
            if (!values.newpassword) {
              errors.newpassword = "Required";
            }

            if (values.oldpassword !== "test") {
              errors.oldpassword = "Old Password was warn";
            }
            if (!values.oldpassword) {
              errors.oldpassword = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            window.location.replace("/");
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              {message && <Alert severity="error">{message}</Alert>}
              <Field
                component={TextField}
                fullWidth
                required
                label="Old Password"
                name="oldpassword"
              />
              <Field
                component={TextField}
                fullWidth
                required
                label="New Password"
                name="newpassword"
              />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    fullWidth
                    color="inherit"
                    className={classes.submit}
                    onClick={() => {
                      window.location.replace("/");
                    }}
                  >
                    Back
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    className={classes.submit}
                  >
                    {isSubmitting ? (
                      <CircularProgress color="secondary" />
                    ) : (
                      "Chang"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default PersonalPage;
