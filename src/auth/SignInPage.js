import {
  Avatar,
  Button,
  FormControl,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import LockIcon from "@material-ui/icons/Lock";
// import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
// import firebase from "firebase";

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
    margin: "8px 0 3px 0",
    width: "100%",
  },
  inputb: {
    margin: "5px 0 0 0",
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
}));

// var uiConfig = {
//   signInFlow: "popup",
//   signInOptions: [
//     firebase.auth.EmailAuthProvider.PROVIDER_ID,
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//   ],
//   callbacks: {
//     signInSuccessWithAuthResult: async (authResult) => {
//       const userInfo = authResult.additionalUserInfo;
//       if (userInfo.isNewUser && userInfo.providerId === "password") {
//         try {
//           await authResult.user.sendEmailVerification();
//           console.log("Check your email");
//         } catch (e) {
//           console.log(e);
//         }
//       }
//       return false;
//     },
//   },
// };

function SignInPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={10} className={classes.paper}>
        <div className={classes.header}>
          <Avatar className={classes.large}>
            <LockIcon />
          </Avatar>
          <Typography variant="h5">Sign In</Typography>
        </div>
        <FormControl className={classes.form}>
          <TextField
            className={classes.input}
            label="Email"
            variant="outlined"
          />
          <TextField
            className={classes.input}
            label="Password"
            variant="outlined"
          />
          <Button className={classes.input} variant="contained" color="primary">
            Sign In
          </Button>
          <Typography variant="subtitle2" component="p">
            <Link className={classes.link} to="/forget-password">
              Forget Password
            </Link>
          </Typography>
          <div style={{ marginTop: "15px" }}>
            <Link className={classes.link} to="/signup">
              <Button
                className={classes.inputb}
                variant="contained"
                color="primary"
              >
                Sign Up with Email
              </Button>
            </Link>
            <Button
              className={classes.inputb}
              variant="contained"
              color="primary"
            >
              Sign Up with Google
            </Button>
          </div>
        </FormControl>

        {/* <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        /> */}
      </Paper>
    </div>
  );
}

export default SignInPage;
