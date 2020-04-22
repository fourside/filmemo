import { connect, ConnectedProps } from "react-redux";
import { saerchFilmDetails } from "../actions/action";
import FilmPage from "../components/FilmPage";

const mapState = () => ({});
const mapDispatch = {
  saerchFilmDetails,
};
const connector = connect(mapState, mapDispatch);

export type Props = ConnectedProps<typeof connector>;

export default connector(FilmPage);
