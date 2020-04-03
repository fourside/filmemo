import React from 'react';
import GridList from '@material-ui/core/GridList';
import { FilmOfSearch } from '../model/FilmOfSearch';
import { FilmOfSearchTile } from './FilmOfSearchTile';

interface Props {
  films: FilmOfSearch[];
  processing: boolean;
}
export const FilmList: React.FC<Props> = (props) => {
  if (props.processing) {
    return <div>saerching...</div>
  }

  return (
    <GridList>
      {props.films.map(film => (
        <FilmOfSearchTile key={film.Title} film={film} />
      ))}
    </GridList>
  );
};
