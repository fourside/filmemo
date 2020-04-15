import React from "react";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Bookmark } from "../model/Bookmark";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "8px 5px 8px 0",
    },
    button: {
      paddingLeft: "2px",
    }
  }),
);

interface Props {
  processing: boolean;
  bookmark?: Bookmark;
  handleAddBookmark: () => void;
  handleRemoveBookmark: () => void;
  handleExpand: () => void;
}
export const ActionCard: React.FC<Props> = (props) => {
  const classes = useStyles();
  const hasNote = !!props.bookmark?.note;

  const AddButton: React.FC = () => (
    <Button
      className={classes.button}
      aria-label="bookmark"
      color="primary"
      onClick={props.handleAddBookmark}
      startIcon={<FontAwesomeIcon icon={faBookmark} />}
      disabled={props.processing || !!props.bookmark}
    >
      bookmark
    </Button>
  );

  const RemoveButton: React.FC = () => (
    <Button
      className={classes.button}
      aria-label="remove bookmark"
      color="secondary"
      onClick={props.handleRemoveBookmark}
      startIcon={<FontAwesomeIcon icon={faBookmark} />}
      disabled={props.processing || !props.bookmark}
    >
      remove bookmark
    </Button>
  );

  return (
    <CardActions className={classes.root}>
      {props.bookmark ? <RemoveButton /> : <AddButton />}
      {props.bookmark && !hasNote && (
        <Button
          className={classes.button}
          aria-label="take a note"
          color="primary"
          onClick={props.handleExpand}
          startIcon={<FontAwesomeIcon icon={faEdit} />}
          disabled={props.processing || !props.bookmark}
        >
          take a note
        </Button>
      )}
    </CardActions>
  );
};
