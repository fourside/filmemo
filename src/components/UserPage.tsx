import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { SearchForm } from "./SearchForm";
import { searchByTitle } from '../amplify/API';
import { FilmList } from './FilmList';
import { Film } from '../model/Film';

const UserPage: React.FC = () => {
  const [films, setFilms] = useState<Film[]>([])
  const [processing, setProcessing] = useState(false);

  const handleSearch = async (title: string) => {
    setProcessing(true);
    const result = await searchByTitle(title);
    const films = result.Search as Film[];
    setFilms(films);
    setProcessing(false);
  };

  return (
    <Container maxWidth="lg">
      <SearchForm processing={processing} handleSearch={handleSearch} />
      <FilmList processing={processing} films={films} />
    </Container>
  );
};

export default UserPage;
