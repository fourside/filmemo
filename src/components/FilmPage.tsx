import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { searchById } from "../amplify/API";
import { FilmDetail } from "../model/Film";
import { DetailItem } from "./DetailItem";
import { Loading } from "./Loading";

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
interface Props extends RouteComponentProps<{ imdbID: string }> {
}
const FilmPage: React.FC<Props> = (props) => {
  const { imdbID } = props.match.params;
  const [film, setFilm] = useState<FilmDetail | undefined>(undefined);
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      const film = await searchById(imdbID);
      setFilm(film);
    })();
  }, [imdbID]);

  if (!film) {
    return <Loading />
  }

  return (
    <Container maxWidth="md" className={classes.root}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cover}
          image={film.Poster}
          title={film.Title}
        />
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {film.Title}
          </Typography>

          <Card className={classes.details} elevation={0}>
            <DetailItem title={"Released"} value={film.Released} />
            <DetailItem title={"Genre"} value={film.Genre} />
            <DetailItem title={"Director"} value={film.Director} />
            <DetailItem title={"Writer"} value={film.Writer} />
            <DetailItem title={"Actors"} value={film.Actors} />
            <DetailItem title={"Runtime"} value={film.Runtime} />
            <DetailItem title={"Production"} value={film.Production} />
            <DetailItem title={"imdbRating"} value={film.imdbRating} />
          </Card>
        </CardContent>
      </Card>

    </Container>
  );
};

export default FilmPage;
