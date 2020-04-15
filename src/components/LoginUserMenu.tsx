import React, { useState, MouseEvent } from "react";
import { useHistory } from "react-router-dom";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SearchIcon from "@material-ui/icons/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    button: {
      color: "#fff",
      textTransform: "inherit",
    },
    text: {
      marginLeft: "0.25em",
    },
    menu: {
      transformOrigin: "center bottom",
    },
    fontawesome: {
      marginRight: 5,
      marginLeft: 4,
    },
  })
);
interface Props {
  userName: string;
}
export const LoginUserMenu: React.FC<Props> = (props) => {
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

  return (
    <div className={classes.root}>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        color="primary"
        className={classes.button}
        onClick={handleClick}
      >
        <AccountCircle />
        <Typography variant="subtitle2" className={classes.text}>
          {props.userName}
        </Typography>
        <ExpandMoreIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        elevation={0}
      >
        <MenuItem onClick={handleSearch}>
          <SearchIcon />
          Search
        </MenuItem>
        <MenuItem onClick={handleBookmarkList}>
          <FontAwesomeIcon icon={faBookmark} className={classes.fontawesome} />
          Bookmarks
        </MenuItem>
      </Menu>
    </div>
  );
};
