import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImdb } from "@fortawesome/free-brands-svg-icons";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

import { saerchFilmDetails, addBookmark, removeBookmark, getBookmark } from "../features/filmDetails/filmDetailsSlice";
import { DetailItem } from "./DetailItem";
import { Loading } from "./Loading";
import { ActionCard } from "./ActionCard";
import { NoteForm } from "./NoteForm";
import { NoteCard } from "./NoteCard";
import { Poster } from "./Poster";
import { RootState } from "../reducers/reducer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "10px",
    },
    card: {
      height: "100%",
      padding: "10px",
    },
    details: {
      marginTop: "10px",
      padding: "10px 0px",
    },
    content: {
    },
    cover: {
      width: 300,
      maxHeight: 450,
    },
  }),
);
const IMDB_URL = "https://www.imdb.com/title/";

const FilmPage: React.FC = () => {
  const { imdbID } = useParams<{ imdbID: string} >();
  const [expanded, setExpanded] = useState({
    form: false,
    card: true,
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user, filmDetails, processing } = useSelector((state: RootState) => {
    return {
      user: state.user,
      filmDetails: state.filmDetails,
      processing: state.processing,
    };
  });

  useEffect(() => {
    dispatch(saerchFilmDetails(imdbID));
  }, [dispatch, imdbID]);

  const handleAddBookmark = async () => {
    if (!filmDetails.film) {
      return;
    }
    const params = {
      imdbID,
      title: filmDetails.film.Title,
      posterURL: filmDetails.film.Poster,
      owner: user.owner,
      createdAt: new Date(),
    };
    dispatch(addBookmark(params));
  };

  const handleRemoveBookmark = () => {
    if (!filmDetails.bookmark?.id) {
      return;
    }
    dispatch(removeBookmark(filmDetails.bookmark.id));
  };

  const handleFormExpand = () => {
    setExpanded({
      ...expanded,
      form: !expanded.form,
    });
  };

  const handleOnSubmit = () => {
    dispatch(getBookmark(imdbID));
    setExpanded({
      card: true,
      form: false,
    });
  };

  const handleEditNote = () => {
    setExpanded({
      card: false,
      form: true,
    });
  };

  const handleFormCancel = () => {
    setExpanded({
      card: true,
      form: false,
    });
  };

  if (!filmDetails.film) {
    return <Loading />;
  }

  return (
    <Container maxWidth="md" className={classes.root}>
      <Card className={classes.card}>
        <Grid container>
          <Grid item xs={12} sm={4}>
            <Poster src={filmDetails.film.Poster} alt={filmDetails.film.Title} className={classes.cover} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {filmDetails.film.Title}
              </Typography>
              <Card className={classes.details} elevation={0}>
                <DetailItem title={"Released"} value={filmDetails.film.Released} />
                <DetailItem title={"Genre"} value={filmDetails.film.Genre} />
                <DetailItem title={"Director"} value={filmDetails.film.Director} />
                <DetailItem title={"Writer"} value={filmDetails.film.Writer} />
                <DetailItem title={"Actors"} value={filmDetails.film.Actors} />
                <DetailItem title={"Runtime"} value={filmDetails.film.Runtime} />
                <DetailItem title={"Production"} value={filmDetails.film.Production} />
                <DetailItem title={"Imdb Rating"} value={filmDetails.film.imdbRating} />
              </Card>
              <ActionCard
                handleAddBookmark={handleAddBookmark}
                handleRemoveBookmark={handleRemoveBookmark}
                handleExpand={handleFormExpand}
                bookmark={filmDetails.bookmark}
                processing={processing}
              />
              {filmDetails.bookmark?.id && (
                <NoteForm
                  expanded={expanded.form}
                  bookmarkId={filmDetails.bookmark.id}
                  onSubmit={handleOnSubmit}
                  handleCancel={handleFormCancel}
                />
              )}
              {filmDetails.bookmark?.note && (
                <NoteCard
                  note={filmDetails.bookmark.note}
                  expanded={expanded.card}
                  handleEditNote={handleEditNote}
                />
              )}
              <Typography variant="body1">
                <Link href={`${IMDB_URL}${filmDetails.film.imdbID}/`} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faImdb} size="lg" /> <FontAwesomeIcon icon={faExternalLinkAlt} /> IMDb
                </Link>
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default FilmPage;
