import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import { Bookmark } from '../model/Bookmark';
import { listBookmarks } from '../amplify/API';
import { Loading } from './Loading';

interface State {
  bookmarks?: Bookmark[];
  processing: boolean;
}
const BookmarkListPage: React.FC = () => {
  const [state, setState] = useState<State>({
    bookmarks: undefined,
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

  if (!state.bookmarks) {
    return <Loading />
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
      {state.bookmarks.map(bookmark => (
        <div key={bookmark.id}>
          {bookmark.title}
          <img src={bookmark.posterURL} alt={bookmark.title} />
        </div>
      ))}
    </Container>
  );
};

export default BookmarkListPage;
