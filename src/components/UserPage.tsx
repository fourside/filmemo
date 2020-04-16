import React, { useState, useEffect, useContext, useCallback, ChangeEvent } from "react";
import { useHistory, useParams } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { SearchForm } from "./SearchForm";
import { searchByTitle } from "../amplify/API";
import { FilmList } from "./FilmList";
import { Film } from "../model/Film";
import { ErrorContext } from "../context/ErrorContext";
import { useIntersect } from "../hooks/useIntersect";
import { Loading } from "./Loading";

interface RouterParams {
  searchTitle?: string;
}
const UserPage: React.FC = () => {
  const [search, setSearch] = useState({
    films: [] as Film[],
    page: 1,
    hasNext: false,
    processing: false,
    nextLoading: false,
  });
  const history = useHistory();
  const params = useParams<RouterParams>();
  const searchTitle = params.searchTitle ?? "";
  const [title, setTitle] = useState(searchTitle);
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

  const handleSearch = useCallback(async (title: string) => {
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
  }, [search, setError]);

  useEffect(() => {
    if (title) {
      setTitle(prev => {
        return title;
      });
      (async () => {
        await handleSearch(title);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    history.push(`/title/${title}`);
    handleSearch(title);
  };

  return (
    <Container maxWidth="lg">
      <SearchForm
        processing={search.processing}
        handleSubmit={handleSubmit}
        handleChangeTitle={handleChangeTitle}
        title={title}
      />
      <FilmList processing={search.processing} films={search.films} />
      {search.nextLoading && <Loading />}
      <div ref={ref} />
    </Container>
  );
};

export default UserPage;
