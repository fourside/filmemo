import React from "react";
import { useDispatch } from "react-redux";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { signIn } from "../features/user/userSlice";

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
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(signIn());
  };
  return (
    <Container maxWidth="md" className={classes.root}>
      <Typography variant="h5" gutterBottom>Sign in</Typography>
      <Button
        onClick={handleClick}
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<FontAwesomeIcon icon={faGoogle} />}
      >
        Open Google
      </Button>
    </Container>
  );
};

export default SignInPage;
