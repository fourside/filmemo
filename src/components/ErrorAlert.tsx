import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

interface Props {
  message: string;
}
export const ErrorAlert: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(true);

  if (!props.message) {
    return null;
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="error">
        {props.message}
      </MuiAlert>
    </Snackbar>
  );
};
