import React from "react";
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faEdit } from '@fortawesome/free-solid-svg-icons'

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
  hasBookmark: boolean;
  handleAddBookmark: () => void;
  handleRemoveBookmark: () => void;
  handleExpand: () => void;
}
export const ActionCard: React.FC<Props> = (props) => {
  const classes = useStyles();

  const AddButton: React.FC = () => (
    <Button
      className={classes.button}
      aria-label="bookmark"
      color="primary"
      onClick={props.handleAddBookmark}
      startIcon={<FontAwesomeIcon icon={faBookmark} />}
      disabled={props.processing || !!props.hasBookmark}
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
      disabled={props.processing || !props.hasBookmark}
    >
      remove bookmark
    </Button>
  );

  return (
    <CardActions className={classes.root}>
      {props.hasBookmark ? <RemoveButton /> : <AddButton />}
      {props.hasBookmark && (
        <Button
          className={classes.button}
          aria-label="take a note"
          color="primary"
          onClick={props.handleExpand}
          startIcon={<FontAwesomeIcon icon={faEdit} />}
          disabled={props.processing || !props.hasBookmark}
        >
          take a note
        </Button>
      )}
    </CardActions>
  );
};
