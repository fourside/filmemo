import React, { ChangeEvent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import RoomIcon from "@material-ui/icons/Room";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { formatDate, Note } from "../model/Note";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { RootState } from "../reducers/reducer";
import { mutateNote } from "../features/note/noteSlice";

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

const schema = yup.object().shape({
  where: yup.string().required("Required"),
});

interface Props {
  expanded: boolean;
  bookmarkId: string;
  onSubmit: () => void;
  handleCancel: () => void;
}
export const NoteForm: React.FC<Props> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { note, processing } = useSelector((state: RootState) => {
    return {
      note: state.note,
      processing: state.processing,
    };
  });
  const { register, handleSubmit, control, setValue, setError, clearErrors, reset, watch, formState, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const ratingValue = watch("rating");
  const whenValue = watch("when");

  useEffect(() => {
    reset(note);
  }, [reset, note]);

  const handleChangeRating = (event: ChangeEvent<{}>, value: number | null) => {
    const rating = value ?? 0;
    setValue("rating", rating);
  };

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      try {
        const when = formatDate(date);
        setValue("when", when);
        clearErrors("when");
      } catch (err) {
        setError("when", { message: "Invalid date" });
      }
    } else {
      setError("when", { message: "Required" });
    }
  };

  const onSubmit = async (noteForm: Note) => {
    dispatch(mutateNote(noteForm, props.bookmarkId, props.onSubmit));
  };

  return (
    <Collapse in={props.expanded} timeout="auto" unmountOnExit className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <Controller
          as={
            <FormControl className={classes.formControl}>
              <Typography component="legend" variant="caption" display="block">Rating</Typography>
              <Rating name="rating" defaultValue={ratingValue} precision={0.5} onChange={handleChangeRating} />
            </FormControl>
          }
          name="rating"
          control={control}
        />

        <Controller
          as={
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                className={classes.formControl}
                disableToolbar
                variant="inline"
                format="yyyy/MM/dd"
                margin="normal"
                id="when"
                name="when"
                label="When did you see this?"
                value={whenValue}
                disableFuture={true}
                autoOk={true}
                onChange={handleChangeDate}
                KeyboardButtonProps={{
                  "aria-label": "change date to see this",
                }}
                error={!!errors.when}
                helperText={errors.when?.message}
              />
            </MuiPickersUtilsProvider>
          }
          name="when"
          control={control}
        />

        <FormControl className={classes.formControl}>
          <TextField
            id="where"
            name="where"
            label="Where did you see this?"
            inputRef={register}
            error={!!errors.where}
            helperText={errors.where?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="end">
                  <RoomIcon />
                </InputAdornment>
              )
            }}
          />
        </FormControl>

        <FormControl fullWidth className={classes.formControl}>
          <TextField
            id="text"
            name="text"
            multiline
            label="what feel about this"
            inputRef={register}
            error={!!errors.text}
            helperText={errors.text?.message}
          />
        </FormControl>

        <Button
          type="submit"
          variant="outlined"
          size="small"
          color="primary"
          className={classes.button}
          disabled={!formState.isValid || processing}
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
