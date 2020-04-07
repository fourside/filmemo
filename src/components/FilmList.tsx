import React from 'react';
import GridList from '@material-ui/core/GridList';
import { Film } from '../model/Film';
import { FilmTile } from './FilmTile';
import { Loading } from './Loading';

interface Props {
  films: Film[];
  processing: boolean;
}
export const FilmList: React.FC<Props> = (props) => {
  if (props.processing) {
    return <Loading text="searching" />
  }

  return (
    <GridList>
      {props.films.map(film => (
        <FilmTile key={film.Title} film={film} />
      ))}
    </GridList>
  );
};
