import React  from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Collapse from '@material-ui/core/Collapse';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import RoomIcon from "@material-ui/icons/Room";
import EventIcon from "@material-ui/icons/Event";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { Note } from "../model/Note";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "5px auto",
    },
    whenAndWhere: {
      display: "flex",
      alignItems: "end",
      margin: "10px auto"
    },
    element: {
      marginRight: 10,
    },
    icon: {
      marginRight: 4,
    },
    text: {
      marginLeft: "4px",
      whiteSpace: "pre-wrap",
    },
    button: {
      marginLeft: "4px",
    },
  }),
);
interface Props {
  note: Note;
  expanded: boolean;
  handleEditNote: () => void;
}
export const NoteCard: React.FC<Props> = (props) => {
  const classes = useStyles();
  return (
    <Collapse in={props.expanded} timeout="auto" unmountOnExit>
      <Card variant="outlined" className={classes.root}>
        <CardContent>
          <Rating value={props.note.rating} readOnly />
          <div className={classes.whenAndWhere}>
            <EventIcon className={classes.icon}/>
            <Typography className={classes.element}>
              {props.note.when}
            </Typography>
            <RoomIcon className={classes.icon}/>
            <Typography>
              {props.note.where}
            </Typography>
          </div>
          <Typography className={classes.text}>
            {props.note.text}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            className={classes.button}
            size="small"
            color="primary"
            startIcon={<FontAwesomeIcon icon={faEdit} size="sm" />}
            onClick={props.handleEditNote}
          >
            edit note
          </Button>
        </CardActions>
      </Card>
    </Collapse>
  );
};
