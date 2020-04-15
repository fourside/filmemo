import React, { useState, useContext } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { ErrorContext } from "../context/ErrorContext";

export const ErrorAlert: React.FC = () => {
  const [open, setOpen] = useState(true);
  const { error } = useContext(ErrorContext);

  if (!error) {
    return null;
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar open={open} onClose={handleClose}>
      <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="error">
        {error}
      </MuiAlert>
    </Snackbar>
  );
};
