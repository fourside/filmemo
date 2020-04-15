import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      flexGrow: 1,
    },
  })
);

interface Props {
  isLogedIn: boolean;
}
export const HeaderLogo: React.FC<Props> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));

  if (matches && props.isLogedIn) {
    return null;
  }

  return (
    <Typography variant="h6" className={classes.logo}>
      FILM MEMO
    </Typography>
  );
};
