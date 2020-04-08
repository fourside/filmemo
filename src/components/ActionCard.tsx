import React, { useState, useEffect } from "react";
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { createStock, getStock } from "../amplify/API";
import { Stock } from "../model/Stock";

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
  imdbID: string;
}
export const ActionCard: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [stock, setStock] = useState<Stock | undefined>(undefined);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    (async () => {
      setProcessing(true);
      const stock = await getStock(props.imdbID);
      setStock(stock);
      setProcessing(false);
    })();
  }, [props.imdbID]);

  const handleClickBookmark = async () => {
    try {
      setProcessing(true);
      const stock = await createStock(props.imdbID);
      setStock(stock);
    } catch (err) {
      console.log(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <CardActions className={classes.root}>
      <Button
        className={classes.button}
        aria-label="add this to stock"
        color="primary"
        onClick={handleClickBookmark}
        startIcon={<FontAwesomeIcon icon={faBookmark} />}
        disabled={processing || !!stock}
      >
        add this to stock
      </Button>
    </CardActions>
  );
};
