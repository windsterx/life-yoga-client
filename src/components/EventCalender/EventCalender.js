import React, { useContext, useEffect, useState } from "react";
import {
  Badge,
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import lightBlue from "@material-ui/core/colors/lightBlue";
import { AppContext } from "../../context/AppContext";

const useStyles = makeStyles((theme) => ({
  date: {
    color: "#fff",
  },
  root: {
    margin: "50px 0",

    [theme.breakpoints.up("sm")]: {
      margin: "50px",
    },
  },
}));
const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersBasePicker: {
      pickerView: {
        backgroundColor: "#263238",
      },
    },
    MuiTypography: {
      alignCenter: {
        textAlign: "left",
        marginLeft: "30px",
      },
      body2: {
        fontWeight: "500",
      },
    },
    MuiPickersToolbar: {
      toolbar: {
        display: "none",
        backgroundColor: "#263238",
        color: "#76ff03",
      },
      color: "#fff",
    },
    MuiToolbar: {
      display: "none",
      gutters: {
        display: "none",
      },
    },
    MuiBadge: {
      dot: {
        height: "5px",
        minWidth: "5px",
        borderRadius: "3px",
      },
      colorPrimary: { backgroundColor: "#40c4ff", margin: "0 20px 4px 20px" },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        backgroundColor: "#263238",
        color: "#76ff03",
      },
      iconButton: {
        color: "#fff",
        backgroundColor: "none",
        textAlign: "right",
        order: 2,
      },
      transitionContainer: {
        display: "flex",
        right: 0,
        order: 1,
        flexDirection: "column",
      },

      dayLabel: {
        color: "#7cb342",
        fontWeight: "bold",
      },
    },
    MuiPickersDay: {
      day: {
        color: "#7cb342",
      },

      daySelected: {
        color: "#7cb342",
        fontWeight: "600",
        fontSize: "18px",
        backgroundColor: "none",
      },
      dayDisabled: {
        color: lightBlue["100"],
      },
      current: {
        fontWeight: "600",
        backgroundColor: "none",
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: lightBlue["400"],
      },
    },
  },
});
const EventCalender = () => {
  const [selectedDays, setSelectedDays] = useState([1, 2, 15]);
  const { getEvents, date, setDate } = useContext(AppContext);
  const [selectedDate, setSelectedDate] = useState(date);

  const fetchEvents = (date) => {
    getEvents().then((eventData) => {
      const newEvents = eventData.filter((event) => {
        return date.getMonth() === new Date(event.showTime).getMonth();
      });
      setSelectedDays(
        newEvents.map((event) => new Date(event.showTime).getDate())
      );
      setDate(date);
    });
  };

  useEffect(() => {
    fetchEvents(date);
  }, []);
  const classes = useStyles();
  const handleClick = () => {};
  const handleMonthChange = async (date) => {
    fetchEvents(date);
  };
  return (
    <div className={classes.root}>
      <h3 variant="h6" style={{ color: "#7cb342", marginLeft: "20px" }}>
        Select a Date and Time
      </h3>
      <ThemeProvider theme={materialTheme}>
        <DatePicker
          variant="static"
          date={selectedDate}
          onChange={(date) => {
            setDate(date);
          }}
          onMonthChange={handleMonthChange}
          renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
            const isSelected =
              isInCurrentMonth && selectedDays.includes(day.getDate());
            return (
              <div
                style={{
                  color: "#fff",
                  borderRadius: "50%",
                  height: "100%",
                  width: "90%",
                  padding: "0",
                  display: "block",
                  textAlign: "center",
                  margin: "0 2px 0 2px",
                  backgroundColor: isSelected ? "#01579b" : "",
                }}
              >
                <Badge
                  badgeContent=" "
                  color={
                    new Date().getDate() === day.getDate() &&
                    new Date().getMonth() === day.getMonth() &&
                    new Date().getFullYear() === day.getFullYear()
                      ? "primary"
                      : ""
                  }
                  variant="dot"
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                >
                  {dayComponent}
                </Badge>
              </div>
            );
          }}
          dayComponent
        />
      </ThemeProvider>
    </div>
  );
};

export default EventCalender;
