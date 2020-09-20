import React, { useState, ChangeEvent, useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import RoomIcon from "@material-ui/icons/Room";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { formatDate, Note, validate } from "../model/Note";
import { ContainerProps } from "../containers/NoteForm";
import { useForm, Controller } from "react-hook-form";

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

interface Props {
  expanded: boolean;
  bookmarkId: string;
  onSubmit: () => void;
  handleCancel: () => void;
}
export const NoteForm: React.FC<Props & ContainerProps> = (props) => {
  const classes = useStyles();
  const { mutateNote, processing } = props;
  const [valid, setValid] = useState(true);
  const { register, handleSubmit, control, setValue, reset, watch } = useForm({
    mode: "onBlur",
  });
  const ratingValue = watch("rating");
  const whenValue = watch("when");

  useEffect(() => {
    reset(props.note);
  }, [reset, props.note]);

  const handleChangeRating = (event: ChangeEvent<{}>, value: number | null) => {
    const rating = value ?? 0;
    setValue("rating", rating);
  };

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      try {
        const when = formatDate(date);
        setValue("when", when);
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const onSubmit = async (note: Note) => {
    const isSuccess = await mutateNote(note, props.bookmarkId);
    if (isSuccess) {
      props.onSubmit();
    }
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
              />
            </MuiPickersUtilsProvider>
          }
          name="when"
          control={control}
        />

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="where">Where did you see this?</InputLabel>
          <Input
            id="where"
            name="where"
            inputRef={register}
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
            inputRef={register}
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
