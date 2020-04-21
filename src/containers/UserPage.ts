import { connect, ConnectedProps } from "react-redux";
import { searchFilms, searchFilmsNext } from "../actions/action";
import UserPage from "../components/UserPage";

const mapState = () => ({});
const mapDispatch = {
  searchFilms,
  searchFilmsNext,
};
const connector = connect(mapState, mapDispatch);

export type Props = ConnectedProps<typeof connector>;

export default connector(UserPage);
