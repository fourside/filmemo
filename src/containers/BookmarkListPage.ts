import { connect, ConnectedProps } from "react-redux";
import { listBookmark, listBookmarkNext } from "../actions/action";
import BookmarkListPage from "../components/BookmarkListPage";
import { RootState } from "../reducers/reducer";

const mapState = (state: RootState) => {
  return {
    user: state.user,
    state: state.bookmarks,
    processing: state.processing,
  };
};
const mapDispatch = {
  listBookmark,
  listBookmarkNext,
};
const connector = connect(mapState, mapDispatch);

export type Props = ConnectedProps<typeof connector>;

export default connector(BookmarkListPage);
