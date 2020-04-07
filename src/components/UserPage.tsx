import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { SearchForm } from "./SearchForm";
import { searchByTitle } from '../amplify/API';
import { FilmList } from './FilmList';
import { Film } from '../model/Film';

const UserPage: React.FC = () => {
  const [search, setSearch] = useState({
    films: [] as Film[],
    processing: false,
  });

  const handleSearch = async (title: string) => {
    setSearch({
      ...search,
      processing: true,
    });
    const result = await searchByTitle(title);
    const films = result.Search as Film[];
    setSearch({
      films,
      processing: false,
    });
  };

  return (
    <Container maxWidth="lg">
      <SearchForm processing={search.processing} handleSearch={handleSearch} />
      <FilmList processing={search.processing} films={search.films} />
    </Container>
  );
};

export default UserPage;
