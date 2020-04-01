import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { FilmOfSearch } from '../model/FilmOfSearch';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }),
);

interface Props {
  film: FilmOfSearch;
}
export const FilmOfSearchTile: React.FC<Props> = (props) => {
  const classes = useStyles();
  return (
    <GridListTile>
      <img src={props.film.Poster} alt={props.film.Title} />
      <GridListTileBar
        title={props.film.Title}
        actionIcon={
          <IconButton aria-label={`info about ${props.film.Title}`} className={classes.icon}>
            <InfoIcon />
          </IconButton>
        }
      />
    </GridListTile>
  );
};
