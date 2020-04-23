import { connect, ConnectedProps } from "react-redux";
import { listBookmark, listBookmarkNext } from "../actions/action";
import BookmarkListPage from "../components/BookmarkListPage";

const mapState = () => ({});
const mapDispatch = {
  listBookmark,
  listBookmarkNext,
};
const connector = connect(mapState, mapDispatch);

export type Props = ConnectedProps<typeof connector>;

export default connector(BookmarkListPage);
