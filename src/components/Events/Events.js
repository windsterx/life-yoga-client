import {
  Card,
  Container,
  Grid,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import DialogBox from "../DialogBox";
import Register from "../Register/Register";
import SnackAlert from "../SnackAlert";
import Event from "./Event";
const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "'Hind Madurai', sans-serif",
    fontSize: "12px",
    marginTop: "20px",
    background: "#fff",
    borderRadius: "4px",
  },
  main: { padding: "10px 25px" },
  card: { borderRadius: "4px" },
  itemContainer: {
    display: "flex",
    flexDirection: "column",
    marginRight: "18%",
    marginTop: "22%",
  },
  itemContainer2: {
    display: "flex",
    justifyContent: "space-around",

    flexDirection: "column",
    textAlign: "left",
    marginLeft: "5%",
    marginTop: "2%",
  },
  grid: {
    boxShadow: " 0 0 5px 0.4px #757575",
  },
}));

const Events = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({ name: "", email: "", eventId: "" });
  const { date, fetchEvents, events } = useContext(AppContext);

  const [snackOpen, setSnackOpen] = useState(false);
  const [response, setResponse] = useState({ message: "", severity: "" });
  const handleClick = () => {
    setSnackOpen(true);
  };
  const [event, setEvent] = useState();

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (data) => {
    setEvent(data);
    setUser({ ...user, eventId: data._id });
    setOpen(true);
  };
  useEffect(() => {
    fetchEvents(date);
  }, [date]);
  //   const tempEve = {
  //     title: "CricFicx",
  //     description: "sdgshgkhgs",
  //     duration: "30",
  //     showTime: Date.parse(new Date()),
  //     location: "Pune",
  //     price: 0,
  //   };

  return (
    <div className={classes.root}>
      <Container className={classes.main}>
        <p style={{ color: "#e53935", fontSize: "16px", fontWeight: "600" }}>
          {date
            .toDateString()
            .slice(0, new Date().toDateString().length - 4)
            .toLocaleUpperCase()}
        </p>
        <Button
          variant="outlined"
          onClick={(e) => {
            fetchEvents(new Date());
          }}
        >
          Refresh
        </Button>
        {/* <Event data={tempEve} /> */}
        {events?.map((event, index) => (
          <Event key={index} data={event} handleClick={handleOpen} />
        ))}

        <p>{events?.length > 0 ? "" : "No Events on this day"}</p>
      </Container>
      <DialogBox
        handleClose={handleClose}
        open={open}
        title={`Register for Event`}
      >
        <Register
          user={user}
          setUser={setUser}
          event={event}
          setResponse={setResponse}
          setSnackOpen={handleClick}
          handleClose={handleClose}
        />
        {snackOpen ? (
          <SnackAlert
            setOpen={setSnackOpen}
            open={snackOpen}
            response={response}
          />
        ) : (
          ""
        )}
      </DialogBox>
    </div>
  );
};
export default Events;
