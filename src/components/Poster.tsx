import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    notAvailable: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#777",
      color: "white",
      textAlign: "center",
    },
  }),
);
interface Props {
  src?: string;
  alt: string;
  className: string;
}
export const Poster: React.FC<Props> = (props) => {
  const classes = useStyles();

  const NotAvailable: React.FC = () => {
    const className = `${classes.notAvailable} ${props.className}`;
    return (
      <div className={className}>
        <Typography>N/A</Typography>
      </div>
    );
  };

  if (!props.src || !/^http/.test(props.src)) return <NotAvailable />;
  return (
    <img src={props.src} alt={props.alt} className={props.className} />
  );
};
