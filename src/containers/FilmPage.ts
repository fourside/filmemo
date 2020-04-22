import { connect, ConnectedProps } from "react-redux";
import { saerchFilmDetails, addBookmark, removeBookmark } from "../actions/action";
import FilmPage from "../components/FilmPage";

const mapState = () => ({});
const mapDispatch = {
  saerchFilmDetails,
  addBookmark,
  removeBookmark,
};
const connector = connect(mapState, mapDispatch);

export type Props = ConnectedProps<typeof connector>;

export default connector(FilmPage);
