import React, { FormEvent, ChangeEvent } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  }),
);

interface Props {
  title: string;
  processing: boolean;
  handleChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
}
export const SearchForm: React.FC<Props> = (props) => {
  const classes = useStyles();
  const valid = !!props.title;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!valid) {
      return;
    }
    props.handleSubmit();
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Typography>Search films by title</Typography>
      <TextField value={props.title} autoFocus id="title" label="Title" name="title" onChange={props.handleChangeTitle} />
      <Button variant="contained" type="submit" disabled={!valid || props.processing} startIcon={<SearchIcon />}>
        Search
      </Button>
    </form>
  );
};
