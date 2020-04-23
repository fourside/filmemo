import { connect, ConnectedProps } from "react-redux";
import { listBookmark } from "../actions/action";
import BookmarkListPage from "../components/BookmarkListPage";

const mapState = () => ({});
const mapDispatch = {
  listBookmark,
};
const connector = connect(mapState, mapDispatch);

export type Props = ConnectedProps<typeof connector>;

export default connector(BookmarkListPage);
