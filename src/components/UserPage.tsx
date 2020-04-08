import React, { useState, useEffect, useContext } from 'react';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import { SearchForm } from "./SearchForm";
import { searchByTitle } from '../amplify/API';
import { FilmList } from './FilmList';
import { Film } from '../model/Film';
import { getLoginUser } from '../amplify/Auth';
import { ErrorContext } from '../context/ErrorContext';

const UserPage: React.FC = () => {
  const [search, setSearch] = useState({
    films: [] as Film[],
    processing: false,
  });
  const history = useHistory();
  const { setError } = useContext(ErrorContext);

  useEffect(() => {
    (async () => {
      const user = await getLoginUser();
      if (!user.id) {
        history.push("/signin");
      }
    })();
  }, [history]);

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
      setError(err.message);
      setSearch({
        ...search,
        processing: false,
      });
    }
  };

  return (
    <Container maxWidth="lg">
      <SearchForm processing={search.processing} handleSearch={handleSearch} />
      <FilmList processing={search.processing} films={search.films} />
    </Container>
  );
};

export default UserPage;
