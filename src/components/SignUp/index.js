import { Avatar, Button, Paper, Typography } from "@material-ui/core";
import React from "react";
import {
  IconButton,
  OutlinedInput,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import EnhancedEncryptionIcon from "@material-ui/icons/EnhancedEncryption";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import {} from "firebase";
import { user, auth, signUp } from "../../firebase";
import * as yup from "yup";
import * as ROUTES from "../../constants/routes";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  paper: {
    margin: "10px",
    maxWidth: "320px",
    padding: theme.spacing(3),
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
  },
  lable: {
    padding: "0px 5px",
    backgroundColor: "#fff",
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

function SignUpPage(props) {
  const [error, seterror] = React.useState(null);
  const classes = useStyles();
  const { register, handleSubmit, errors, reset } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const [showPassword, setshowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = (data) => {
    const { name, email, passwordOne } = data;
    signUp(email, passwordOne)
      .then((authUser) => {
        user(authUser.user.uid).set({
          name,
          email,
          photoURL: "https://img.icons8.com/dusk/344/change-user-male.png",
        });
        seterror(null);
        authUser.user.updateProfile({
          displayName: name,
          photoURL: "https://img.icons8.com/dusk/344/change-user-male.png",
        });
      })
      .catch((err) => {
        seterror(err);
      });
  };

  React.useEffect(() => {
    const listener = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        props.history.push(ROUTES.DASHBOARD);
      }
    });

    return () => {
      listener();
    };
  }, [props.history]);

  return (
    <div className={classes.root}>
      <Paper elevation={10} className={classes.paper}>
        <div className={classes.header}>
          <Avatar className={classes.large}>
            <EnhancedEncryptionIcon />
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
          <FormControl className={classes.input} variant="outlined">
            <InputLabel
              className={classes.lable}
              htmlFor="outlined-adornment-password"
            >
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              name="passwordOne"
              inputRef={register({
                required: "Password is empty!",
                minLength: { value: 6, message: "Too short" },
              })}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {errors.passwordOne && (
            <span className={classes.error}>{errors.passwordOne.message}</span>
          )}
          <FormControl className={classes.input} variant="outlined">
            <InputLabel
              className={classes.lable}
              htmlFor="outlined-adornment-password2"
            >
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password2"
              type={showPassword ? "text" : "password"}
              name="passwordTwo"
              inputRef={register({
                required: "Password is empty!",
                minLength: { value: 6, message: "Too short" },
              })}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
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
          {error && <span className={classes.error}>{error.message}</span>}
        </form>

        <Typography variant="subtitle2" component="p">
          Already have an account{" "}
          <Link className={classes.link} to={ROUTES.SIGN_IN}>
            SignIn
          </Link>
        </Typography>
      </Paper>
    </div>
  );
}

export default withRouter(SignUpPage);
