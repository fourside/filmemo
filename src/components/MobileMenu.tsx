import React, { useState, MouseEvent } from "react";
import { useHistory } from "react-router-dom";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import Input from "@material-ui/icons/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "../amplify/Auth";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      color: "#fff",
      textTransform: "inherit",
    },
    icon: {
      marginRight: 5,
      marginLeft: 4,
    },
  })
);
interface Props {
  userName: string;
}
export const MobileMenu: React.FC<Props> = (props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>(undefined);
  const classes = useStyles();
  const history = useHistory();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(undefined);
  };

  const handleBookmarkList = () => {
    history.push("/bookmarks");
    handleClose();
  };

  const handleSearch = () => {
    history.push("/");
    handleClose();
  };

  const handleClickSignOut = (event: MouseEvent) => {
    signOut();
  };

  return (
    <div>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleClick}
        edge="start"
        className={classes.button}
      >
        <MenuIcon />
      </IconButton>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        elevation={0}
      >
        <MenuItem disabled={true}>
          <AccountCircle className={classes.icon} />
          {props.userName}
        </MenuItem>
        <MenuItem onClick={handleSearch}>
          <SearchIcon />
          Search
        </MenuItem>
        <MenuItem onClick={handleBookmarkList}>
          <FontAwesomeIcon icon={faBookmark} className={classes.icon} />
          Bookmarks
        </MenuItem>
        <MenuItem onClick={handleClickSignOut}>
          <Input className={classes.icon} />
          Sign out
        </MenuItem>
      </Menu>
    </div>
  );
};
