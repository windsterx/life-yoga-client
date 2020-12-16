import { Typography, Button, Dialog, DialogTitle } from "@material-ui/core";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import DialogBox from "./DialogBox";
import NewEvent from "./NewEvent/NewEvent";
import SnackAlert from "./SnackAlert";

const MainComp = () => {
  const [open, setOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [response, setResponse] = useState({ message: "", severity: "" });
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setSnackOpen(true);
  };
  return (
    <>
      <div style={{ marginTop: "40px" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: "50%",
            width: "75px",
            height: "75px",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            fontWeight: "700",
            alignItems: "center",
          }}
        >
          <span>Life Yoga</span>
        </div>
      </div>
      <Typography variant="h5" style={{ color: "#76ff03", margin: "50px 0" }}>
        Ashtanga Yoga Live Session
      </Typography>
      <span>
        <Button
          color="secondary"
          variant="outlined"
          onClick={() => {
            setOpen(true);
          }}
        >
          New Event
        </Button>
      </span>
      <DialogBox handleClose={handleClose} open={open}>
        <NewEvent
          handleClose={handleClose}
          setResponse={setResponse}
          setSnackOpen={handleClick}
        />
      </DialogBox>
      {snackOpen ? (
        <SnackAlert
          setOpen={setSnackOpen}
          open={snackOpen}
          response={response}
        />
      ) : (
        ""
      )}
    </>
  );
};
export default MainComp;
