import React, { useContext, MouseEvent } from "react";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/icons/Input";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../context/UserContext";
import { signOut } from "../amplify/Auth";
import { LoginUserMenu } from "./LoginUserMenu";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    headerMenuTitle: {
      marginLeft: "0.25em",
      marginRight: "1em",
    }
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
              <LoginUserMenu userName={user.name} />
              <Input />
              <Typography variant="subtitle2" className={classes.headerMenuTitle}>
                <Link href="#" onClick={handleClickSignOut} color="inherit">Sign out</Link>
              </Typography>
            </>
          ) : (
            <>
              <Input />
              <Typography variant="subtitle2" className={classes.headerMenuTitle}>
                <Link href="#" onClick={handleClickSignIn} color="inherit">Sign in</Link>
              </Typography>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
