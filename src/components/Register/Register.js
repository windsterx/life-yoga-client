import React from "react";
import * as api from "../../api";

import {
  Button,
  Paper,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "'Hind Madurai', sans-serif",
    fontSize: "12px",
    marginTop: "20px",
    background: "#fff",
    borderRadius: "4px",
  },
  form: { display: "flex", flexDirection: "column", padding: "10px" },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    padding: "10px",
  },
}));
const Register = (props) => {
  const {
    user,
    setUser,
    event,
    handleClose,
    setResponse,
    setSnackOpen,
  } = props;
  const classes = useStyles();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  console.log(event);
  const handleSubmit = (e) => {
    e.preventDefault();
    addPost(user).then(() => {
      setResponse({ message: "Registration Successful", severity: "success" });
      setSnackOpen();
      handleClose();
      //   alert("You are Registered for this Event");
    });
  };
  const addPost = async (event) => {
    const data = await api.createRecord(event);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.container}>
        <Typography variant="h6">{event?.title}</Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={user.name}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            label="Email"
            name="email"
            value={user.email}
            onChange={(e) => handleChange(e)}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Paper>
    </div>
  );
};
export default Register;
