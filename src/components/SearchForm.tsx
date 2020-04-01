import React, { useState, FormEvent, ChangeEvent } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Typography from "@material-ui/core/Typography";
import { search } from '../amplify/API';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

export const SearchForm: React.FC = () => {
  const classes = useStyles();
  const [form, setForm] = useState({
    title: "",
    processing: false,
  });
  const [result, setResult] = useState({});

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setForm({
      ...form,
      title: value,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setForm({
      ...form,
      processing: true,
    });
    try {
      const result = await search(form.title);
      setResult(result);
    } catch (err) {
      console.log(err);
      setForm({
        ...form,
        processing: false,
      });
      return;
    }
    setForm({
      ...form,
      title: "",
      processing: false,
    });
  };

  if (form.processing) {
    return <div>searching...</div>
  }

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Typography>Search films by title</Typography>
      <TextField value={form.title} id="title" label="Title" name="title" onChange={handleChange} />
      <Button variant="contained" type="submit" startIcon={<SearchIcon />}>Search</Button>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </form>
  );
};
