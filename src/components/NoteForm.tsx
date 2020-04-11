import React, { FormEvent, ChangeEvent ,useState, useEffect, useContext } from "react";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Collapse from "@material-ui/core/Collapse";
import Typography from '@material-ui/core/Typography';
import Rating from "@material-ui/lab/Rating";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import RoomIcon from '@material-ui/icons/Room';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";
import { createNote, relateBookmark, editNote } from "../amplify/API";
import { Note } from "../model/Note";
import { ErrorContext } from "../context/ErrorContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "90%",
    },
    form: {
      marginTop: "10px",
      marginBottom: "20px",
    },
    formControl: {
      margin: theme.spacing(1),
    },
    button: {
      margin: theme.spacing(1),
    },
  }),
);
const FORMAT_DATE = "yyyy/MM/dd";
interface Props {
  expanded: boolean;
  bookmarkId: string;
  note?: Note;
  onSubmit: () => void;
  handleCancel: () => void;
}
export const NoteForm: React.FC<Props> = (props) => {
  const initialDate = format(new Date(), FORMAT_DATE);
  const initialNote = props.note ?? {
    rating: 0,
    when: initialDate,
    where: "",
    text: "",
    bookmarkId: props.bookmarkId,
  };
  const [form, setForm] = useState<Note>(initialNote);
  const [valid, setValid] = useState(false);
  const [processing, setProcessing] = useState(false);
  const classes = useStyles();
  const { setError } = useContext(ErrorContext);

  useEffect(() => {
    const valid = form.rating > 0
      && !!form.when
      && !!form.where;
    setValid(valid);
  }, [form]);

  const handleChangeRating = (event: ChangeEvent<{}>, value: number | null) => {
    const rating = value ?? 0;
    setForm({
      ...form,
      rating,
    });
  };

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      const when = format(date, FORMAT_DATE);
      setForm({
        ...form,
        when,
      });
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!valid) {
      return;
    }
    setProcessing(true);
    try {
      if (!form.id) {
        const note = await createNote(form);
        await relateBookmark(props.bookmarkId, note.id as string);
      } else {
        const note = Object.assign({}, form);
        delete note.owner;
        await editNote(note);
      }
      props.onSubmit();
    } catch (err) {
      setProcessing(false);
      setError(err.message);
    }
  };

  return (
    <Collapse in={props.expanded} timeout="auto" unmountOnExit className={classes.root}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <FormControl className={classes.formControl}>
          <Typography component="legend" variant="caption" display="block">Rating</Typography>
          <Rating name="rating" defaultValue={form.rating} precision={0.5} onChange={handleChangeRating} />
        </FormControl>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            className={classes.formControl}
            disableToolbar
            variant="inline"
            format="yyyy/MM/dd"
            margin="normal"
            id="when"
            label="When did you see this?"
            value={form.when}
            disableFuture={true}
            autoOk={true}
            onChange={handleChangeDate}
            KeyboardButtonProps={{
              "aria-label": "change date to see this",
            }}
          />
        </MuiPickersUtilsProvider>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="where">Where did you see this?</InputLabel>
          <Input
            id="where"
            name="where"
            value={form.where}
            onChange={handleChange}
            startAdornment={
              <InputAdornment position="end">
                <RoomIcon />
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl fullWidth className={classes.formControl}>
          <InputLabel htmlFor="text">what feel about this</InputLabel>
          <Input
            id="text"
            name="text"
            multiline
            value={form.text}
            onChange={handleChange}
          />
        </FormControl>

        <Button
          type="submit"
          variant="outlined"
          size="small"
          color="primary"
          className={classes.button}
          disabled={!valid || processing}
        >
          {processing && <CircularProgress size={16} />}
          {!processing && "submit"}
        </Button>

        <Button
          variant="outlined"
          size="small"
          disabled={processing}
          className={classes.button}
          onClick={props.handleCancel}
        >
          cancel
        </Button>

      </form>

    </Collapse>
  );
};
