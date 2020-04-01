import React, { useState, FormEvent, ChangeEvent } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

interface Props {
  processing: boolean;
  handleSearch: (title: string) => void;
}
export const SearchForm: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [form, setForm] = useState({
    title: "",
    valid: false,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const valid = !!value;
    setForm({
      ...form,
      title: value,
      valid,
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!form.valid) {
      return;
    }
    try {
      props.handleSearch(form.title);
    } catch (err) {
      console.log(err);
      return;
    }
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Typography>Search films by title</Typography>
      <TextField value={form.title} id="title" label="Title" name="title" onChange={handleChange} />
      <Button variant="contained" type="submit" disabled={!form.valid || props.processing} startIcon={<SearchIcon />}>Search</Button>
    </form>
  );
};
