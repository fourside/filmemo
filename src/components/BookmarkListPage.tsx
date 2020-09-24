import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "@material-ui/core/Container";
import GridList from "@material-ui/core/GridList";
import Typography from "@material-ui/core/Typography";
import { Loading } from "./Loading";
import { BookmarkTile } from "./BookmarkTile";
import { useIntersect } from "../hooks/useIntersect";
import { listBookmark, listBookmarkNext } from "../features/bookmarks/listBookmarkSlice";
import { RootState } from "../reducers/reducer";

const BookmarkListPage: React.FC = () => {
  const { intersecting, ref } = useIntersect();
  const dispatch = useDispatch();
  const { user , state, processing } = useSelector((state: RootState) => {
    return {
      user: state.user,
      state: state.bookmarks,
      processing: state.processing,
    };
  });

  useEffect(() => {
    if (user.owner) {
      dispatch(listBookmark(user.owner));
    }
  }, [dispatch, user.owner]);

  useEffect(() => {
    if (intersecting && !state.nextLoading && state.nextToken) {
      dispatch(listBookmarkNext(user.owner, state.nextToken));
    }
  }, [dispatch, intersecting, state.nextLoading, state.nextToken, user.owner]);

  if (processing) {
    return <Loading />;
  }

  if (!state.bookmarks) {
    // when error
    return null;
  }

  if (state.bookmarks.length === 0) {
    return (
      <Container maxWidth="lg">
        <div>no bookmark. add bookmark!</div>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>Bookmarks</Typography>
      <GridList>
        {state.bookmarks.map(bookmark => (
          <BookmarkTile bookmark={bookmark} key={bookmark.id} />
        ))}
      </GridList>
      {state.nextLoading && <Loading />}
      <div ref={ref} />
    </Container>
  );
};

export default BookmarkListPage;
