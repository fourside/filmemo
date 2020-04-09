// tslint:disable
// eslint-disable
// this is an auto generated file. This will be overwritten

export const getBookmark = /* GraphQL */ `
  query GetBookmark($id: ID!) {
    getBookmark(id: $id) {
      id
      imdbID
      title
      posterURL
      owner
    }
  }
`;
export const listBookmarks = /* GraphQL */ `
  query ListBookmarks(
    $filter: ModelBookmarkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBookmarks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        imdbID
        title
        posterURL
        owner
      }
      nextToken
    }
  }
`;
export const bookmarksByImdbId = /* GraphQL */ `
  query BookmarksByImdbId(
    $imdbID: String
    $sortDirection: ModelSortDirection
    $filter: ModelBookmarkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bookmarksByImdbID(
      imdbID: $imdbID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        imdbID
        title
        posterURL
        owner
      }
      nextToken
    }
  }
`;
