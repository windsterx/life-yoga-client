import { Typography, Button, Dialog, DialogTitle } from "@material-ui/core";
import React from "react";
import NewEvent from "./NewEvent/NewEvent";

const DialogBox = (props) => {
  const { open, handleClose, title } = props;
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth
    >
      <DialogTitle id="simple-dialog-title">{title ? title : ""}</DialogTitle>
      {props.children}
    </Dialog>
  );
};
export default DialogBox;
