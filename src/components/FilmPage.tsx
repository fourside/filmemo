import React, { useEffect, useState } from "react";
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
import { createStock, getStock, deleteStock } from "../amplify/API";
import { FilmDetail } from "../model/Film";
import { DetailItem } from "./DetailItem";
import { Loading } from "./Loading";
import { ActionCard } from "./ActionCard";
import { Stock } from "../model/Stock";

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
      flexShrink: 0,
    },
  }),
);
const IMDB_URL = "https://www.imdb.com/title/";
interface Props extends RouteComponentProps<{ imdbID: string }> {
}
interface State {
  film?: FilmDetail;
  stock?: Stock;
  processing: boolean;
}
const FilmPage: React.FC<Props> = (props) => {
  const { imdbID } = props.match.params;
  const [state, setState] = useState<State>({
    film: undefined,
    stock: undefined,
    processing: false,
  });
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      setState(prev => {
        return {
          ...prev,
          processing: true,
        };
      });
      const results = await Promise.all([
        searchById(imdbID),
        getStock(imdbID),
      ]);
      setState(prev => {
        return {
          ...prev,
          film: results[0],
          stock: results[1],
          processing: false,
        };
      });
    })();
  }, [imdbID]);

  const handleAddStock = async () => {
    try {
      setState({
        ...state,
        processing: true,
      });
      const stock = await createStock(imdbID);
      setState({
        ...state,
        stock,
        processing: false,
      });
    } catch (err) {
      console.log(err);
      setState({
        ...state,
        processing: false,
      });
    }
  };

  const handleRemoveStock = async () => {
    try {
      setState({
        ...state,
        processing: true,
      });
      await deleteStock(imdbID);
      setState({
        ...state,
        stock: undefined,
        processing: false,
      });
    } catch (err) {
      console.log(err);
      setState({
        ...state,
        processing: false,
      });
    }
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
            handleAddStock={handleAddStock}
            handleRemoveStock={handleRemoveStock}
            hasStock={!!state.stock}
            processing={state.processing}
          />
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
