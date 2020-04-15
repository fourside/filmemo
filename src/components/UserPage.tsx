import React, { useState, useEffect, useContext, ChangeEvent } from "react";
import Container from "@material-ui/core/Container";
import { SearchForm } from "./SearchForm";
import { searchByTitle } from "../amplify/API";
import { FilmList } from "./FilmList";
import { Film } from "../model/Film";
import { ErrorContext } from "../context/ErrorContext";
import { useIntersect } from "../hooks/useIntersect";
import { Loading } from "./Loading";

const UserPage: React.FC = () => {
  const [search, setSearch] = useState({
    films: [] as Film[],
    page: 1,
    hasNext: false,
    processing: false,
    nextLoading: false,
  });
  const [title, setTitle] = useState("");
  const { setError } = useContext(ErrorContext);
  const { intersecting, ref } = useIntersect();

  useEffect(() => {
    if (search.nextLoading) {
      return;
    }
    if (intersecting && search.hasNext) {
      (async () => {
        setSearch(prev => {
          return {
            ...prev,
            nextLoading: true,
          };
        });
        try {
          const nextPage = search.page + 1;
          const { films, hasNext } = await searchByTitle(title, nextPage);
          const totalFilms = search.films.concat(films);
          setSearch(prev => {
            return {
              ...prev,
              films: totalFilms,
              hasNext,
              page: nextPage,
            };
          });
        } catch (err) {
          setError(err.message);
        } finally {
          setSearch(prev => {
            return {
              ...prev,
              nextLoading: false,
            };
          });
        }
      })();
    }
  }, [intersecting, search.hasNext, search.nextLoading, setError, title, search.page, search.films]);

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTitle(value);
  };

  const handleSearch = async () => {
    setSearch({
      ...search,
      processing: true,
    });
    try {
      const { films, hasNext } = await searchByTitle(title);
      setSearch({
        ...search,
        films,
        hasNext,
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
      <SearchForm processing={search.processing} handleSearch={handleSearch} handleChangeTitle={handleChangeTitle} title={title} />
      <FilmList processing={search.processing} films={search.films} />
      {search.nextLoading && <Loading />}
      <div ref={ref} />
    </Container>
  );
};

export default UserPage;
