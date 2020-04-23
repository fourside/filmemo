import React, { useEffect, useState, useContext, useCallback } from "react";
import Container from "@material-ui/core/Container";
import GridList from "@material-ui/core/GridList";
import Typography from "@material-ui/core/Typography";
import { Bookmark } from "../model/Bookmark";
import { listBookmarks } from "../amplify/API";
import { Loading } from "./Loading";
import { BookmarkTile } from "./BookmarkTile";
import { ErrorContext } from "../context/ErrorContext";
import { useIntersect } from "../hooks/useIntersect";
import { useUser, useBookmarks } from "../reducers/reducer";
import { Props } from "../containers/BookmarkListPage";

interface State {
  bookmarks?: Bookmark[];
  processing: boolean;
  nextToken: string | null;
}
const BookmarkListPage: React.FC<Props> = (props) => {
  const [state, setState] = useState<State>({
    bookmarks: undefined,
    processing: false,
    nextToken: null,
  });
  const bookmarkState = useBookmarks();
  const [nextLoading, setNextLoading] = useState(false);
  const user = useUser();
  const { setError } = useContext(ErrorContext);
  const { listBookmark } = props;

  useEffect(() => {
    if (!user.owner) {
      return;
    }
    listBookmark(user.owner);
  }, [user.owner, listBookmark]);

  const fetchNextBookmarks = useCallback(() => {
    if (nextLoading) {
      return;
    }
    if (bookmarkState.nextToken) {
      (async () => {
        try {
          setNextLoading(true);
          const { bookmarks, nextToken } = await listBookmarks(user.owner, bookmarkState.nextToken);
          const before = bookmarkState.bookmarks ?? [];
          setState(prev => {
            return {
              ...prev,
              nextToken,
              bookmarks: before.concat(bookmarks),
            };
          });
        } catch (err) {
          setError(err.message);
        } finally {
          setNextLoading(false);
        }
      })();
    }
  }, [nextLoading, setError, user.owner, bookmarkState.nextToken, bookmarkState.bookmarks]);

  const { intersecting, ref } = useIntersect();
  useEffect(() => {
    if (intersecting) {
      fetchNextBookmarks();
    }
  }, [intersecting, fetchNextBookmarks]);

  if (bookmarkState.processing) {
    return <Loading />;
  }

  if (!bookmarkState.bookmarks) {
    // when error
    return null;
  }

  if (bookmarkState.bookmarks.length === 0) {
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
        {bookmarkState.bookmarks.map(bookmark => (
          <BookmarkTile bookmark={bookmark} key={bookmark.id} />
        ))}
      </GridList>
      {nextLoading && <Loading />}
      <div ref={ref} />
    </Container>
  );
};

export default BookmarkListPage;
