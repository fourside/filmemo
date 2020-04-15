import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "2em",
    },
  }),
);

interface Props {
  text?: string;
}
export const Loading: React.FC<Props> = (props) => {
  const classes = useStyles();
  const text = props.text ?? "loading";
  return (
    <Container maxWidth="sm" className={classes.root}>
      <CircularProgress />
      {text}...
    </Container>
  );
};
