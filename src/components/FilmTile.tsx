import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { Link } from "react-router-dom";
import { Film } from '../model/Film';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tile: {
      marginBottom: "10px",
      marginRight: "20px",
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    img: {
      width: "200px",
    }
  }),
);

interface Props {
  film: Film;
}
export const FilmTile: React.FC<Props> = (props) => {
  const classes = useStyles();
  return (
    <Link to={`/films/${props.film.imdbID}`}>
      <GridListTile className={classes.tile}>
        <img src={props.film.Poster} alt={props.film.Title} className={classes.img} />
        <GridListTileBar
          title={props.film.Title}
          actionIcon={
            <IconButton aria-label={`info about ${props.film.Title}`} className={classes.icon}>
              <InfoIcon />
            </IconButton>
          }
        />
      </GridListTile>
    </Link>
  );
};
