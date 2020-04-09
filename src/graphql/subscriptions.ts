// tslint:disable
// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateBookmark = /* GraphQL */ `
  subscription OnCreateBookmark($owner: String!) {
    onCreateBookmark(owner: $owner) {
      id
      imdbID
      title
      posterURL
      owner
      createdAt
      note {
        id
        bookmarkId
        rating
        when
        where
        text
        owner
      }
    }
  }
`;
export const onUpdateBookmark = /* GraphQL */ `
  subscription OnUpdateBookmark($owner: String!) {
    onUpdateBookmark(owner: $owner) {
      id
      imdbID
      title
      posterURL
      owner
      createdAt
      note {
        id
        bookmarkId
        rating
        when
        where
        text
        owner
      }
    }
  }
`;
export const onDeleteBookmark = /* GraphQL */ `
  subscription OnDeleteBookmark($owner: String!) {
    onDeleteBookmark(owner: $owner) {
      id
      imdbID
      title
      posterURL
      owner
      createdAt
      note {
        id
        bookmarkId
        rating
        when
        where
        text
        owner
      }
    }
  }
`;
export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote($owner: String!) {
    onCreateNote(owner: $owner) {
      id
      bookmarkId
      rating
      when
      where
      text
      owner
    }
  }
`;
export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote($owner: String!) {
    onUpdateNote(owner: $owner) {
      id
      bookmarkId
      rating
      when
      where
      text
      owner
    }
  }
`;
export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote($owner: String!) {
    onDeleteNote(owner: $owner) {
      id
      bookmarkId
      rating
      when
      where
      text
      owner
    }
  }
`;
