import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "end",
    },
    title: {
      marginRight: "1em",
      fontSize: "0.9em",
      fontWeight: "bold",
      color: "#666",
    },
    value: {
      fontSize: "0.9em",
      color: "#444",
    },
  }),
);
interface Props {
  title: string;
  value: string;
}
export const DetailItem: React.FC<Props> = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="subtitle2" gutterBottom className={classes.title}>
        {props.title}
      </Typography>
      <Typography variant="caption" gutterBottom className={classes.value}>
        {props.value}
      </Typography>
    </div>
  );
};
