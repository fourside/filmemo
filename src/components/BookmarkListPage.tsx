import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import { Bookmark } from '../model/Bookmark';
import { listBookmarks } from '../amplify/API';

interface State {
  bookmarks: Bookmark[];
  processing: boolean;
}
const BookmarkListPage: React.FC = () => {
  const [state, setState] = useState<State>({
    bookmarks: [],
    processing: false,
  });

  useEffect(() => {
    (async () => {
      try {
        setState(prev => {
          return {
            ...prev,
            processing: true,
          };
        });
        const bookmarks = await listBookmarks();
        setState(prev => {
          return {
            ...prev,
            bookmarks,
            processing: false,
          };
        });
      } catch (err) {
        console.log(err);
        setState(prev => {
          return {
            ...prev,
            processing: false,
          };
        });
      }
    })();
  }, []);

  return (
    <Container maxWidth="lg">
      {state.bookmarks.map(bookmark => (
        <div key={bookmark.id}>{bookmark.imdbID}</div>
      ))}
    </Container>
  );
};

export default BookmarkListPage;
