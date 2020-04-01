import React, { useContext, MouseEvent } from "react";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Input from "@material-ui/icons/Input";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../context/UserContext";
import { signOut } from "../amplify/Auth";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  })
);

export const Header: React.FC = () => {
  const { user } = useContext(UserContext);
  const classes = useStyles();
  const history = useHistory();

  const handleClickSignIn = (event: MouseEvent) => {
    history.push("/signin");
  };

  const handleClickSignOut = (event: MouseEvent) => {
    signOut();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            FILM MEMO
          </Typography>
          {user.id ? (
            <>
              <AccountCircle />
              <Typography variant="subtitle2">
                {user.name}
              </Typography>
              <Input />
              <Typography variant="subtitle2">
                <Link href="#" onClick={handleClickSignOut} color="inherit">Sign out</Link>
              </Typography>
            </>
          ) : (
            <>
              <Input />
              <Typography variant="subtitle2">
                <Link href="#" onClick={handleClickSignIn} color="inherit">Sign in</Link>
              </Typography>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
