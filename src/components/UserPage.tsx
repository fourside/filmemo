import React, { useEffect, ChangeEvent } from "react";
import { useHistory, useParams } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { SearchForm } from "./SearchForm";
import { FilmList } from "./FilmList";
import { useIntersect } from "../hooks/useIntersect";
import { Loading } from "./Loading";
import { Props } from "../containers/UserPage";

const UserPage: React.FC<Props> = (props) => {
  const history = useHistory();
  const { searchTitle } = useParams<{ searchTitle?: string }>();
  const { intersecting, ref } = useIntersect();
  const { searchTitleInput, searchFilms, films, title, processing } = props;

  useEffect(() => {
    if (searchTitle) {
      searchTitleInput(searchTitle);
      searchFilms(searchTitle);
    }
  }, [searchTitle, searchTitleInput, searchFilms]);

  useEffect(() => {
    if (films.nextLoading || processing) {
      return;
    }
    if (intersecting && films.hasNext) {
      const nextPage = films.page + 1;
      props.searchFilmsNext(title, nextPage);
    }
  }, [intersecting, props, title, films.hasNext, films.page, films.nextLoading, processing]);

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
