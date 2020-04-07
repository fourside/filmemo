import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { SearchForm } from "./SearchForm";
import { searchByTitle } from '../amplify/API';
import { FilmList } from './FilmList';
import { Film } from '../model/Film';
import { ErrorAlert } from "./ErrorAlert";

const UserPage: React.FC = () => {
  const [search, setSearch] = useState({
    films: [] as Film[],
    processing: false,
    error: "",
  });

  const handleSearch = async (title: string) => {
    setSearch({
      ...search,
      processing: true,
    });
    try {
      const films = await searchByTitle(title);
      setSearch({
        ...search,
        films,
        processing: false,
      });
    } catch (err) {
      setSearch({
        ...search,
        error: err.message,
      });
    }
  };

  return (
    <Container maxWidth="lg">
      <SearchForm processing={search.processing} handleSearch={handleSearch} />
      <FilmList processing={search.processing} films={search.films} />
      <ErrorAlert message={search.error} />
    </Container>
  );
};

export default UserPage;
