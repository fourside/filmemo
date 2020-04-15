import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      flexGrow: 1,
    },
  })
);

export const HeaderLogo: React.FC = () => {
  const classes = useStyles();

  return (
    <Typography variant="h6" className={classes.logo}>
      FILM MEMO
    </Typography>
  );
};
