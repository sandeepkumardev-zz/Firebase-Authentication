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
import { auth, reAuth, rmUser, signOut, storage, user } from "../../firebase";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { Data } from "../../firebase/context";

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
  error: {
    color: "red",
    fontSize: "14px",
  },
  upload: {
    "& input": {
      display: "none",
    },
    cursor: "pointer",
    border: "1px solid #3f51b5",
    margin: "10px 0 0 0",
    padding: "2px 5px",
    borderRadius: "4px",
    fontSize: "12px",
    color: "#3f51b5",
  },
}));

function FullWidthGrid() {
  const classes = useStyles();
  const agreeRef = React.useRef(null);
  const { authUser } = React.useContext(AuthUserContext);
  const { displayName, email, photoURL, emailVerified } = authUser;

  const [username, setUsername] = React.useState(displayName);
  const [image, setImage] = React.useState(photoURL);

  const [save, setsave] = React.useState(false);

  React.useEffect(() => {
    if (displayName !== username) {
      setsave(true);
    }
  }, [displayName, username]);

  const { updateUser } = React.useContext(Data);

  const saveHandler = () => {
    user(authUser.uid).set({
      name: username,
      email,
      photoURL: image,
    });
    authUser.updateProfile({
      displayName: username,
    });
    updateUser({
      name: username,
      photoURL: image,
    });
    setsave(false);
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const [error, setError] = React.useState(null);
  const handleAgree = () => {
    setError(null);
    if (agreeRef.current.value === "") {
      agreeRef.current.focus();
    }
    if (agreeRef.current.value.length < 6 && agreeRef.current.value !== "") {
      setError("Too short!");
    }
    if (agreeRef.current.value.length >= 6) {
      const credential = reAuth.credential(email, agreeRef.current.value);
      rmUser(auth.currentUser?.uid)
        .then(() => {
          auth.currentUser
            .reauthenticateWithCredential(credential)
            .then(() => {
              auth.currentUser
                ?.delete()
                .then(() => {
                  console.log("Delete account success.");
                })
                .catch(function (error) {
                  setError("Somthing went wrong!");
                });
            })
            .catch((err) => {
              setError(err.message);
            });
        })
        .catch((err) => {
          setError("Somthing went wrong!");
        });
    }
  };

  const [fileError, setFileError] = React.useState(null);
  const types = ["image/jpeg", "image/png"];
  const fileUpload = (e) => {
    let file = e.target.files[0];
    if (file && types.includes(file.type)) {
      setFileError(null);

      const storageRef = storage.ref(file.name);
      storageRef.put(file).on(
        "stage_changed",
        (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          console.log(percentage);
        },
        (err) => {
          setError(err);
        },
        async () => {
          const url = await storageRef.getDownloadURL();
          setImage(url);
          user(authUser.uid).set({
            name: username,
            email,
            photoURL: url,
          });
          authUser.updateProfile({
            photoURL: url,
          });
          updateUser({
            name: username,
            photoURL: url,
          });
        }
      );
    } else {
      setFileError("Select a valid file type (png or jpeg).");
    }
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
                src={image}
                alt="image_not_found"
                width="100px"
                height="100px"
                style={{ borderRadius: "50%" }}
              />
              <label className={classes.upload}>
                <input type="file" onChange={fileUpload} />
                {fileError && (
                  <span className={classes.error}>{fileError}</span>
                )}
                <span variant="outlined" size="small" color="primary">
                  Change Photo
                </span>
              </label>
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
          <span style={{ width: "100%", height: "12px" }}></span>
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
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              className={classes.input}
              label="Re-enter your password."
              inputRef={agreeRef}
            />
            {error && <span className={classes.error}>{error}</span>}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleAgree} style={{ color: "red" }}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withAuthorization(FullWidthGrid);
