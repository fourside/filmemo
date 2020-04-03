import React, { useState } from 'react';
import { SearchForm } from "./SearchForm";
import { search } from '../amplify/API';
import { FilmList } from './FilmList';
import { FilmOfSearch } from '../model/FilmOfSearch';

const UserPage: React.FC = () => {
  const [films, setFilms] = useState<FilmOfSearch[]>([])
  const [processing, setProcessing] = useState(false);

  const handleSearch = async (title: string) => {
    setProcessing(true);
    const result = await search(title);
    const films = result.Search as FilmOfSearch[];
    setFilms(films);
    setProcessing(false);
  };

  return (
    <>
      <SearchForm processing={processing} handleSearch={handleSearch} />
      <FilmList processing={processing} films={films} />
    </>
  );
};

export default UserPage;
