import { Avatar, Button, Paper, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import LockIcon from "@material-ui/icons/Lock";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    width: "270px",
    padding: theme.spacing(3),
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
  form: {
    width: "100%",
    marginBottom: "8px",
  },
  input: {
    margin: "10px 0 0 0",
    width: "100%",
  },
  link: {
    textDecoration: "none",
    color: "#25317F",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundColor: "#25317F",
  },
  header: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginBottom: "25px",
    "& .MuiTypography-h5": {
      fontWeight: "bold",
      fontFamily: "Acme, sans-serif",
      color: "#25317F",
    },
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginLeft: "10px",
  },
}));

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^([^0-9]*)$/, "Name should not contain numbers.")
    .required("First name is a required field."),
  email: yup
    .string()
    .email("Email must be a valid email.")
    .required("Email is a required field."),
  passwordOne: yup
    .string()
    .required("Password is a required field.")
    .min(6, "Too short."),
  passwordTwo: yup
    .string()
    .required("Confirm Password is a required field.")
    .oneOf([yup.ref("passwordOne"), null], "Passwords does not match."),
});

function SignUpPage() {
  const classes = useStyles();
  const { register, handleSubmit, errors, reset } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className={classes.root}>
      <Paper elevation={10} className={classes.paper}>
        <div className={classes.header}>
          <Avatar className={classes.large}>
            <LockIcon />
          </Avatar>
          <Typography variant="h5">Sign Up</Typography>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classes.form}
          noValidate
        >
          <TextField
            className={classes.input}
            label="Name"
            variant="outlined"
            name="name"
            inputRef={register}
          />
          {errors.name && (
            <span className={classes.error}>{errors.name.message}</span>
          )}
          <TextField
            className={classes.input}
            label="Email"
            variant="outlined"
            name="email"
            inputRef={register}
          />
          {errors.email && (
            <span className={classes.error}>{errors.email.message}</span>
          )}
          <TextField
            className={classes.input}
            label="Password"
            variant="outlined"
            name="passwordOne"
            inputRef={register}
          />
          {errors.passwordOne && (
            <span className={classes.error}>{errors.passwordOne.message}</span>
          )}
          <TextField
            className={classes.input}
            label="Confirm Password"
            variant="outlined"
            name="passwordTwo"
            inputRef={register}
          />
          {errors.passwordTwo && (
            <span className={classes.error}>{errors.passwordTwo.message}</span>
          )}

          <Button
            type="submit"
            className={classes.input}
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
        </form>

        <Typography variant="subtitle2" component="p">
          Already have an account{" "}
          <Link className={classes.link} to="/signin">
            SignIn
          </Link>
        </Typography>
      </Paper>
    </div>
  );
}

export default SignUpPage;
