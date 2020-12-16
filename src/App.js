import {
  AppBar,
  Button,
  Container,
  Divider,
  Grid,
  Grow,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import React, { useState } from "react";
import EventCalender from "./components/EventCalender/EventCalender";
import Events from "./components/Events/Events";
import AppContextProvider from "./context/AppContext";
import "./Style.css";
import DateFnsUtils from "@date-io/date-fns";
import NewEvent from "./components/NewEvent/NewEvent";
import MainComp from "./components/MainComp";

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "#29b6f6",
    zIndex: "1",
    borderRadius: "5px",
    boxShadow: "0 0 5px 0.3px #0000",
  },
}));
const App = () => {
  const classes = useStyles();
  const [events, setEvents] = useState();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <AppContextProvider>
        <Container
          style={{
            background: "#263238",
            minHeight: "1000px",
            overflow: "hidden",
            fontFamily: "'Hind Madurai', sans-serif",
          }}
        >
          <Grow in>
            <Container>
              <Grid container alignItems="stretch">
                <Grid item xs={12} sm={7}>
                  <MainComp />
                  <Events />
                </Grid>
                <Divider />
                <Grid item xs={12} sm={4}>
                  <EventCalender />
                </Grid>
              </Grid>
            </Container>
          </Grow>
        </Container>
      </AppContextProvider>
    </MuiPickersUtilsProvider>
  );
};
export default App;
