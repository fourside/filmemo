import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { Bookmark } from "../model/Bookmark";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tile: {
      marginTop: "10px",
      marginBottom: "10px",
      marginRight: "20px",
      width: 200,
      height: 300,
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
    img: {
      width: 200,
      height: 300,
    }
  }),
);
interface Props {
  bookmark: Bookmark;
}
export const BookmarkTile: React.FC<Props> = (props) => {
  const history = useHistory();
  const classes = useStyles();

  const handleClick = () => {
    history.push(`/films/${props.bookmark.imdbID}`);
  };

  return (
    <GridListTile className={classes.tile}>
      <img src={props.bookmark.posterURL} alt={props.bookmark.title} className={classes.img} />
      <GridListTileBar
        title={props.bookmark.title}
        actionIcon={
          <IconButton aria-label={"see film info"} className={classes.icon} onClick={handleClick}>
            <FontAwesomeIcon icon={faFilm} />
          </IconButton>
        }
      />
    </GridListTile>
  );
};
