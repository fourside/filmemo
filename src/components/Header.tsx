import React, { MouseEvent } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/icons/Input";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { signOut } from "../amplify/Auth";
import { LoginUserMenu } from "./LoginUserMenu";
import { HeaderLogo } from "./HeaderLogo";
import { MobileMenu } from "./MobileMenu";
import { useUser } from "../reducers/reducer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    headerMenuTitle: {
      marginLeft: "0.25em",
      marginRight: "1em",
    }
  })
);

export const Header: React.FC = () => {
  const user = useUser();
  const classes = useStyles();

  const handleClickSignOut = (event: MouseEvent) => {
    signOut();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <HeaderLogo />
          {user.id && (
            <>
              <Hidden xsDown>
                <LoginUserMenu userName={user.name} />
                <Input />
                <Typography variant="subtitle2" className={classes.headerMenuTitle}>
                  <Link href="#" onClick={handleClickSignOut} color="inherit">Sign out</Link>
                </Typography>
              </Hidden>
              <Hidden smUp>
                <MobileMenu userName={user.name} />
              </Hidden>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
