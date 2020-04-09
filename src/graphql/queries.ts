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
      createdAt
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
        createdAt
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
        createdAt
      }
      nextToken
    }
  }
`;
export const bookmarksSortedByTimestamp = /* GraphQL */ `
  query BookmarksSortedByTimestamp(
    $owner: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelBookmarkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bookmarksSortedByTimestamp(
      owner: $owner
      createdAt: $createdAt
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
        createdAt
      }
      nextToken
    }
  }
`;
