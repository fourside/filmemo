import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import GridList from "@material-ui/core/GridList";
import Typography from "@material-ui/core/Typography";
import { Loading } from "./Loading";
import { BookmarkTile } from "./BookmarkTile";
import { useIntersect } from "../hooks/useIntersect";
import { Props } from "../containers/BookmarkListPage";

const BookmarkListPage: React.FC<Props> = (props) => {
  const { listBookmark, listBookmarkNext, state, user, processing } = props;
  const { intersecting, ref } = useIntersect();

  useEffect(() => {
    if (user.owner) {
      listBookmark(user.owner);
    }
  }, [user.owner, listBookmark]);

  useEffect(() => {
    if (intersecting && !state.nextLoading && state.nextToken) {
      listBookmarkNext(user.owner, state.nextToken);
    }
  }, [intersecting, state.nextLoading, state.nextToken, listBookmarkNext, user.owner]);

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
