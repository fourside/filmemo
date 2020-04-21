import React, { useEffect, useContext, ChangeEvent } from "react";
import { useHistory, useParams } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { SearchForm } from "./SearchForm";
import { FilmList } from "./FilmList";
import { ErrorContext } from "../context/ErrorContext";
import { useIntersect } from "../hooks/useIntersect";
import { Loading } from "./Loading";
import { useFilms, useTitle } from "../reducers/reducer";
import { Props } from "../containers/UserPage";

const UserPage: React.FC<Props> = (props) => {
  const films = useFilms();
  const history = useHistory();
  const { searchTitle } = useParams<{ searchTitle?: string }>();
  const title = useTitle();
  const { setError } = useContext(ErrorContext);
  const { intersecting, ref } = useIntersect();

  useEffect(() => {
    if (films.error) {
      setError(films.error);
    }
  }, [films.error, setError]);

  useEffect(() => {
    if (searchTitle) {
      props.searchTitleInput(searchTitle);
      props.searchFilms(searchTitle);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (films.nextLoading || films.processing) {
      return;
    }
    if (intersecting && films.hasNext) {
      (async () => {
        const nextPage = films.page + 1;
        props.searchFilmsNext(title, nextPage);
      })();
    }
  }, [intersecting, props, title, films.hasNext, films.page, films.nextLoading, films.processing]);

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    props.searchTitleInput(value);
  };

  const handleSubmit = async () => {
    history.push(`/title/${title}`);
    props.searchFilms(title);
  };

  return (
    <Container maxWidth="lg">
      <SearchForm
        processing={films.processing}
        handleSubmit={handleSubmit}
        handleChangeTitle={handleChangeTitle}
        title={title}
      />
      <FilmList processing={films.processing} films={films.films} />
      {films.nextLoading && <Loading />}
      <div ref={ref} />
    </Container>
  );
};

export default UserPage;
