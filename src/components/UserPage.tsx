import React, { useEffect, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { SearchForm } from "./SearchForm";
import { FilmList } from "./FilmList";
import { useIntersect } from "../hooks/useIntersect";
import { Loading } from "./Loading";
import { RootState } from "../reducers/reducer";
import { searchFilms, searchFilmsNext, searchTitleInput } from "../actions/action";

const UserPage: React.FC = () => {
  const history = useHistory();
  const { searchTitle } = useParams<{ searchTitle?: string }>();
  const { intersecting, ref } = useIntersect();
  const dispatch = useDispatch();
  const { title, films, processing } = useSelector((state: RootState) => {
    return {
      title: state.title,
      films: state.films,
      processing: state.processing,
    };
  });

  useEffect(() => {
    if (searchTitle) {
      dispatch(searchTitleInput(searchTitle));
      dispatch(searchFilms(searchTitle));
    }
  }, [searchTitle, dispatch]);

  useEffect(() => {
    if (films.nextLoading || processing) {
      return;
    }
    if (intersecting && films.hasNext) {
      const nextPage = films.page + 1;
      dispatch(searchFilmsNext(title, nextPage));
    }
  }, [dispatch, intersecting, title, films.hasNext, films.page, films.nextLoading, processing]);

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch(searchTitleInput(value));
  };

  const handleSubmit = async () => {
    history.push(`/title/${title}`);
    dispatch(searchFilms(title));
  };

  return (
    <Container maxWidth="lg">
      <SearchForm
        processing={processing}
        handleSubmit={handleSubmit}
        handleChangeTitle={handleChangeTitle}
        title={title}
      />
      <FilmList processing={processing} films={films.films} />
      {films.nextLoading && <Loading />}
      <div ref={ref} />
    </Container>
  );
};

export default UserPage;
