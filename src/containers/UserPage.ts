import { connect, ConnectedProps } from "react-redux";
import { searchFilms, searchFilmsNext, searchTitleInput } from "../actions/action";
import UserPage from "../components/UserPage";
import { RootState } from "../reducers/reducer";

const mapState = (state: RootState) => {
  return {
    title: state.title,
    films: state.films,
    processing: state.processing,
  };
};
const mapDispatch = {
  searchFilms,
  searchFilmsNext,
  searchTitleInput,
};
const connector = connect(mapState, mapDispatch);

export type Props = ConnectedProps<typeof connector>;

export default connector(UserPage);
