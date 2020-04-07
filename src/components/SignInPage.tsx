import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { signInGoogle } from "../amplify/Auth";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: "2em",
    },
    button: {
    },
  }),
);
const SignInPage: React.FC = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.root}>
      <Typography variant="h5" gutterBottom>Sign in</Typography>
      <Button
        onClick={signInGoogle}
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Open Google
      </Button>
    </Container>
  );
};

export default SignInPage;
