import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PasswordUpdate } from "../../firebase";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: "0px 20px",
    flexDirection: "column",
    padding: "0px 10px",
  },
  input: {
    margin: "10px 0 0 0",
    width: "100%",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
}));

const schema = yup.object().shape({
  passwordOne: yup
    .string()
    .required("Password is a required field.")
    .min(6, "Too short."),
  passwordTwo: yup
    .string()
    .required("Confirm Password is a required field.")
    .oneOf([yup.ref("passwordOne"), null], "Passwords does not match."),
});

const PasswordChange = () => {
  const classes = useStyle();
  const [msg, setmsg] = React.useState(null);
  const { register, handleSubmit, errors, reset } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    PasswordUpdate(data.passwordOne)
      .then(() => {
        reset();
        setmsg("Password successfully changed!");
      })
      .catch(() => {
        setmsg(null);
      });
  };
  return (
    <div className={classes.root}>
      <Typography variant="h5">Change Password</Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          className={classes.input}
          fullWidth
          label="New Password"
          variant="outlined"
          name="passwordOne"
          inputRef={register}
        />
        {errors.passwordOne && (
          <span className={classes.error}>{errors.passwordOne.message}</span>
        )}
        <TextField
          className={classes.input}
          fullWidth
          label="Confirm Password"
          variant="outlined"
          name="passwordTwo"
          inputRef={register}
        />
        {errors.passwordTwo && (
          <span className={classes.error}>{errors.passwordTwo.message}</span>
        )}
        {msg && (
          <span style={{ textDecoration: "none", color: "green" }}>{msg}</span>
        )}
        <Button
          type="submit"
          className={classes.input}
          variant="contained"
          color="primary"
        >
          Change Password
        </Button>
      </form>
    </div>
  );
};

export default PasswordChange;
