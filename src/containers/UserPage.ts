import { connect, ConnectedProps } from "react-redux";
import { searchFilms, searchFilmsNext, searchTitleInput } from "../actions/action";
import UserPage from "../components/UserPage";

const mapState = () => ({});
const mapDispatch = {
  searchFilms,
  searchFilmsNext,
  searchTitleInput,
};
const connector = connect(mapState, mapDispatch);

export type Props = ConnectedProps<typeof connector>;

export default connector(UserPage);
