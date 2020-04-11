import React, { useEffect, useState, useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Link from "@material-ui/core/Link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImdb } from '@fortawesome/free-brands-svg-icons'

import { searchById } from "../amplify/API";
import { createBookmark, getBookmark, deleteBookmark } from "../amplify/API";
import { FilmDetail } from "../model/Film";
import { DetailItem } from "./DetailItem";
import { Loading } from "./Loading";
import { ActionCard } from "./ActionCard";
import { Bookmark } from "../model/Bookmark";
import { ErrorContext } from "../context/ErrorContext";
import { UserContext } from "../context/UserContext";
import { NoteForm } from "./NoteForm";
import { NoteCard } from "./NoteCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "10px",
    },
    card: {
      display: 'flex',
      height: "100%",
      minHeight: "466px",
      padding: "10px",
    },
    details: {
      marginTop: "10px",
      padding: "10px 0px",
    },
    content: {
      flex: '1 0 auto',
      marginLeft: "20px",
    },
    cover: {
      width: 300,
      maxHeight: 450,
      flexShrink: 0,
    },
  }),
);
const IMDB_URL = "https://www.imdb.com/title/";
interface Props extends RouteComponentProps<{ imdbID: string }> {
}
interface State {
  film?: FilmDetail;
  bookmark?: Bookmark;
  processing: boolean;
}
const FilmPage: React.FC<Props> = (props) => {
  const { imdbID } = props.match.params;
  const [state, setState] = useState<State>({
    film: undefined,
    bookmark: undefined,
    processing: false,
  });
  const [expanded, setExpanded] = useState(false);

  const classes = useStyles();
  const { user } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);

  useEffect(() => {
    (async () => {
      setState(prev => {
        return {
          ...prev,
          processing: true,
        };
      });
      try {
        const results = await Promise.all([
          searchById(imdbID),
          getBookmark(imdbID),
        ]);
        setState(prev => {
          return {
            ...prev,
            film: results[0],
            bookmark: results[1],
            processing: false,
          };
        });
      } catch (err) {
        setError(err.message);
        setState(prev => {
          return {
            ...prev,
            processing: false,
          };
        });
      }
    })();
  }, [imdbID, setError]);

  const handleAddBookmark = async () => {
    if (!state.film) {
      return;
    }
    try {
      setState({
        ...state,
        processing: true,
      });
      const params = {
        imdbID,
        title: state.film.Title,
        posterURL: state.film.Poster,
        owner: user.owner,
        createdAt: new Date(),
      };
      const bookmark = await createBookmark(params);
      setState({
        ...state,
        bookmark,
        processing: false,
      });
    } catch (err) {
      setError(err.message);
      setState({
        ...state,
        processing: false,
      });
    }
  };

  const handleRemoveBookmark = async () => {
    if (!state.bookmark?.id) {
      return;
    }
    try {
      setState({
        ...state,
        processing: true,
      });
      await deleteBookmark(state.bookmark.id);
      setState({
        ...state,
        bookmark: undefined,
        processing: false,
      });
      if (expanded) {
        setExpanded(false);
      }
    } catch (err) {
      console.log(err);
      setState({
        ...state,
        processing: false,
      });
    }
  };

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleOnSubmit = () => {
    setExpanded(false);
  };

  const handleEditNote = () => {
  };

  if (!state.film) {
    return <Loading />
  }

  return (
    <Container maxWidth="md" className={classes.root}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cover}
          image={state.film.Poster}
          title={state.film.Title}
        />
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {state.film.Title}
          </Typography>
          <Card className={classes.details} elevation={0}>
            <DetailItem title={"Released"} value={state.film.Released} />
            <DetailItem title={"Genre"} value={state.film.Genre} />
            <DetailItem title={"Director"} value={state.film.Director} />
            <DetailItem title={"Writer"} value={state.film.Writer} />
            <DetailItem title={"Actors"} value={state.film.Actors} />
            <DetailItem title={"Runtime"} value={state.film.Runtime} />
            <DetailItem title={"Production"} value={state.film.Production} />
            <DetailItem title={"Imdb Rating"} value={state.film.imdbRating} />
          </Card>
          <ActionCard
            handleAddBookmark={handleAddBookmark}
            handleRemoveBookmark={handleRemoveBookmark}
            handleExpand={handleExpand}
            bookmark={state.bookmark}
            processing={state.processing}
          />
          {state.bookmark?.id && (
            <NoteForm
              expanded={expanded}
              bookmarkId={state.bookmark.id}
              onSubmit={handleOnSubmit}
            />
          )}
          {state.bookmark?.note && (
            <NoteCard
              note={state.bookmark.note}
              handleEditNote={handleEditNote}
            />
          )}
          <Typography variant="body1">
            <Link href={`${IMDB_URL}${state.film.imdbID}/`} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faImdb} /> go to imdb
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default FilmPage;
