import React, { useContext, useState } from "react";
import * as api from "../../api";
import {
  Button,
  Paper,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { AppContext } from "../../context/AppContext";
const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "'Hind Madurai', sans-serif",
    fontSize: "12px",
    background: "#fff",
    borderRadius: "4px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "15px 40px",
    fontFamily: "'Hind Madurai', sans-serif",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    padding: "10px",
  },
}));
const NewEvent = ({ handleClose, setSnackOpen, setResponse }) => {
  const classes = useStyles();
  const { fetchEvents } = useContext(AppContext);

  const [event, setEvent] = useState({
    title: "",
    description: "",
    duration: "",
    showTime: Date.parse(new Date()),
    location: "",
    price: 0,
  });

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addPost(event).then(() => {
      setResponse({
        message: "New Event Successfully Added ",
        severity: "success",
      });
      fetchEvents(new Date());

      setSnackOpen();
      handleClose();
    });
  };
  const addPost = async (eventData) => {
    const data = await api.createEvent(eventData);
  };
  const dateValue = (value) => {
    const date = new Date(value);
    const hour =
      date.getHours().toLocaleString().length > 1
        ? date.getHours()
        : `0${date.getHours()}`;
    const mins =
      date.getMinutes().toLocaleString().length > 1
        ? date.getMinutes()
        : `0${date.getMinutes()}`;
    const day =
      date.getDate().toLocaleString().length > 1
        ? date.getDate()
        : `0${date.getDate()}`;
    const month =
      date.getMonth().toLocaleString().length > 1
        ? date.getMonth()
        : `0${date.getMonth()}`;
    // 2017-05-24T10:30
    return `${date.getUTCFullYear()}-${month}-${day}T${hour}:${mins}`;
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.container}>
        <Typography
          style={{
            padding: "0 40px",
            margin: "0",
            fontSize: "20px",
            fontWeight: "600",
            fontFamily: "'Hind Madurai', sans-serif",
          }}
        >
          Create a New Event
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            color="primary"
            value={event.title}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            label="Description"
            name="description"
            color="primary"
            value={event.description}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            label="Duration in hours"
            name="duration"
            color="primary"
            value={event.duration}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            id="date"
            label="Show Time"
            name="showTime"
            color="primary"
            type="datetime-local"
            // defaultValue="2017-05-24T10:30"
            value={dateValue(event.showTime)}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) =>
              setEvent({ ...event, showTime: Date.parse(e.target.value) })
            }
          />
          <TextField
            label="Location"
            name="location"
            color="primary"
            value={event.location}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            label="Price"
            name="price"
            color="primary"
            value={event.price}
            onChange={(e) => handleChange(e)}
          />
          <Button
            variant="contained"
            color="secondary"
            style={{ marginTop: "10px" }}
            type="submit"
            size="small"
          >
            Submit
          </Button>
        </form>
      </Paper>
    </div>
  );
};
export default NewEvent;
