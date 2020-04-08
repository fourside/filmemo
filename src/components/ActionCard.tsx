import React from "react";
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'

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
  hasStock: boolean;
  handleAddStock: () => void;
  handleRemoveStock: () => void;
}
export const ActionCard: React.FC<Props> = (props) => {
  const classes = useStyles();

  const AddButton: React.FC = () => (
    <Button
      className={classes.button}
      aria-label="add this to stock"
      color="primary"
      onClick={props.handleAddStock}
      startIcon={<FontAwesomeIcon icon={faBookmark} />}
      disabled={props.processing || !!props.hasStock}
    >
      add this to stock
    </Button>
  );

  const RemoveButton: React.FC = () => (
    <Button
      className={classes.button}
      aria-label="remove this to stock"
      color="secondary"
      onClick={props.handleRemoveStock}
      startIcon={<FontAwesomeIcon icon={faBookmark} />}
      disabled={props.processing || !props.hasStock}
    >
      remove this from stock
    </Button>
  );

  return (
    <CardActions className={classes.root}>
      {props.hasStock ? <RemoveButton /> : <AddButton />}
    </CardActions>
  );
};
