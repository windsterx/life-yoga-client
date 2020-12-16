import { Card, Grid, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "'Hind Madurai', sans-serif",
    fontSize: "12px",
    marginTop: "20px",
    background: "#fff",
    borderRadius: "4px",
  },
  main: { padding: "10px 25px" },
  card: {
    borderRadius: "4px",
    marginBottom: "10px",
    "&:hover": {
      boxShadow: "0 0 5px 0.3px #757575",
      transition: "0.2s ease-in",
    },
  },
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
  price: {
    textAlign: "center",
    fontSize: "15px",
    fontWeight: "600",
    color: "#757575",
    padding: "0 2px",
    [theme.breakpoints.down("md")]: {
      fontSize: "12px",
      width: "auto",
    },
  },
}));

const Event = ({ data, handleClick }) => {
  const event = data;
  const classes = useStyles();
  return (
    <Card className={classes.card} onClick={() => handleClick(event)}>
      <Grid container spacing={2}>
        <Grid item md={3} sm={3} xs={3} className={classes.grid}>
          <div className={classes.itemContainer}>
            <span
              style={{
                fontWeight: "600",
                fontSize: "17px",
                textAlign: "right",
              }}
            >
              {new Date(event.showTime).toTimeString().slice(0, 5)} AM
            </span>
            <span style={{ textAlign: "right" }}>{event?.duration} hrs</span>
          </div>
        </Grid>
        <Grid item md={7} sm={7} xs={7}>
          <div className={classes.itemContainer2}>
            <span
              style={{ marginTop: "4px", fontWeight: "600", fontSize: "16px" }}
            >
              {event?.title}
            </span>
            <span style={{ marginTop: "4px", fontSize: "12px" }}>
              with{" "}
              <span style={{ color: "#d32f2f" }}>{event?.description}</span>
            </span>
            <span style={{ marginTop: "8px", fontSize: "13px" }}>
              {event?.location}
            </span>
            <span style={{ marginTop: "4px" }}>{event?.attended}</span>
          </div>
        </Grid>
        <Grid item md={2} sm={2} xs={2}>
          <div className={classes.itemContainer}>
            <p className={classes.price}>
              {data.price === 0 ? "FREE" : data?.price}
            </p>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};
export default Event;
