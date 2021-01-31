import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {
  Button,
  TextField,
  Container,
  InputAdornment,
  Divider,
  Avatar,
  Typography,
} from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PasswordChange from "../PasswordChange";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import AuthUserContext from "../Session/context";
import withAuthorization from "../Session/withAuthorization";
import { auth, rmUser, signOut, user } from "../../firebase";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTypography-h3": {
      textAlign: "center",
      fontFamily: "Acme, sans-serif",
    },
    "& .MuiButton-outlinedSizeSmall": {
      margin: "10px 10px 0 10px",
    },
    "& .MuiContainer-root": {
      marginTop: "20px",
    },
    "&   label + .MuiInput-formControl": {
      marginTop: "10px",
    },
    "& .MuiFormLabel-root.Mui-disabled, .MuiInputBase-root.Mui-disabled": {
      color: "rgba(0, 0, 0, 0.54)",
    },
    "& .MuiInputAdornment-positionEnd": {
      color: "green",
    },
    "& .MuiButton-root": {
      padding: "6px 8px",
    },
  },
  photo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    margin: "15px 0px 0px 0px",
    padding: "0px 20px",
  },
  input: {
    margin: "5px",
  },
  bottom: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  dialog: {
    "& .MuiDialog-paper": {
      margin: "10px",
    },
    "& .MuiDialogTitle-root": {
      padding: "16px 15px 10px 15px",
      color: "red",
    },
    "& .MuiTypography-h6": {
      fontWeight: "bold",
    },
    "& .MuiTypography-colorTextSecondary": {
      color: "black",
    },
  },
}));

function FullWidthGrid() {
  const classes = useStyles();
  const { authUser } = React.useContext(AuthUserContext);
  const { displayName, email, photoURL, emailVerified } = authUser;

  const [username, setUsername] = React.useState(displayName);
  const [save, setsave] = React.useState(false);

  React.useEffect(() => {
    if (displayName !== username) {
      setsave(true);
    }
  }, [displayName, username]);

  const saveHandler = () => {
    user(authUser.uid).set({
      name: username,
      email,
      photoURL: "https://img.icons8.com/dusk/344/change-user-male.png",
    });
    authUser.updateProfile({
      displayName: username,
    });
    setsave(false);
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    rmUser(auth.currentUser?.uid)
      .then(() => {
        auth.currentUser
          ?.delete()
          .then(() => {
            console.log("Delete account success.");
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h3">My Profile</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={classes.photo}>
              <img
                src={photoURL}
                alt=""
                width="100px"
                style={{ borderRadius: "50%" }}
              />
              <Button variant="outlined" size="small" color="primary">
                Change Photo
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={classes.info}>
              <TextField
                className={classes.input}
                label="User Name"
                defaultValue={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={saveHandler}
                    >
                      {save && <CheckCircleIcon />}
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                className={classes.input}
                label="Email"
                value={email}
                disabled
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {emailVerified ? (
                        <Avatar
                          alt="Remy Sharp"
                          src="https://img.icons8.com/fluent/344/google-logo.png"
                          style={{ width: "22px", height: "22px" }}
                        />
                      ) : (
                        <EmailIcon />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </Grid>
          <Divider width="100%" />
          <Grid item xs={12}>
            <PasswordChange />
          </Grid>
          <Divider width="100%" />
          <Grid item xs={12} className={classes.bottom}>
            <Button
              variant="contained"
              color="default"
              style={{ marginRight: "4px" }}
              startIcon={<ExitToAppIcon />}
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DeleteForeverIcon />}
              onClick={() => setOpen(true)}
            >
              Delete Account
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Dialog
        className={classes.dialog}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you suru to delete your account and database? This action can't
            be undone!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button
            onClick={handleAgree}
            color="primary"
            style={{ color: "red" }}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withAuthorization(FullWidthGrid);
