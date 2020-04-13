import React, { useEffect, useState, useContext } from 'react';
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import Typography from '@material-ui/core/Typography';
import { Bookmark } from '../model/Bookmark';
import { listBookmarks } from '../amplify/API';
import { Loading } from './Loading';
import { BookmarkTile } from './BookmarkTile';
import { ErrorContext } from "../context/ErrorContext";
import { UserContext } from '../context/UserContext';

interface State {
  bookmarks?: Bookmark[];
  processing: boolean;
  nextToken: string | null;
}
const BookmarkListPage: React.FC = () => {
  const [state, setState] = useState<State>({
    bookmarks: undefined,
    processing: false,
    nextToken: null,
  });
  const { user } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);

  useEffect(() => {
    if (!user.owner) {
      return;
    }
    (async () => {
      try {
        setState(prev => {
          return {
            ...prev,
            processing: true,
          };
        });
        const { bookmarks, nextToken } = await listBookmarks(user.owner, null);
        setState(prev => {
          return {
            ...prev,
            bookmarks,
            nextToken,
            processing: false,
          };
        });
      } catch (err) {
        setError(err.message);
        setState(prev => {
          return {
            ...prev,
            processing: false,
          };
        });
      }
    })();
  }, [user.owner, setError]);

  if (state.processing) {
    return <Loading />
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
    )
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>Bookmarks</Typography>
      <GridList>
        {state.bookmarks.map(bookmark => (
          <BookmarkTile bookmark={bookmark} key={bookmark.id} />
        ))}
      </GridList>
    </Container>
  );
};

export default BookmarkListPage;
