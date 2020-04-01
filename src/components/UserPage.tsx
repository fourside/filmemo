import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import { SearchForm } from "./SearchForm";
import { search } from '../amplify/API';
import { FilmOfSearchTile } from './FilmOfSearchTile';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridList: {
      width: 350,
      height: 300,
    },
  }),
);
const UserPage: React.FC = () => {
  const classes = useStyles();
  const [result, setResult] = useState({});
  const [processing, setProcessing] = useState(false);

  const handleSearch = async (title: string) => {
    setProcessing(true);
    const result = await search(title);
    setResult(result);
    setProcessing(false);
  };

  const film = {
    Title: "hoge",
    Year: "2020",
    imdbID: "aaa",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BODM2MzE3NmMtNmE2ZS00OGI2LWI5NTEtNWNlNzMxZjZhNzc0XkEyXkFqcGdeQXVyNzc5MjA3OA@@._V1_SX300.jpg",
  };
  return (
    <>
      <SearchForm processing={processing} handleSearch={handleSearch} />
      <GridList className={classes.gridList}>
        <FilmOfSearchTile film={film} />
      </GridList>
      {processing ? <div>searching...</div> : <pre>{JSON.stringify(result, null, 2)}</pre>}
    </>
  );
};

export default UserPage;
