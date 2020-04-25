import { connect, ConnectedProps } from "react-redux";
import { saerchFilmDetails, addBookmark, removeBookmark, getBookmark } from "../actions/action";
import FilmPage from "../components/FilmPage";
import { RootState } from "../reducers/reducer";

const mapState = (state: RootState) => {
  return {
    user: state.user,
    filmDetails: state.filmDetails,
    processing: state.processing,
  };
};
const mapDispatch = {
  saerchFilmDetails,
  addBookmark,
  removeBookmark,
  getBookmark,
};
const connector = connect(mapState, mapDispatch);

export type Props = ConnectedProps<typeof connector>;

export default connector(FilmPage);
