/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateBookmarkInput = {
  id?: string | null,
  imdbID: string,
  title: string,
  posterURL: string,
};

export type ModelBookmarkConditionInput = {
  imdbID?: ModelStringInput | null,
  title?: ModelStringInput | null,
  posterURL?: ModelStringInput | null,
  and?: Array< ModelBookmarkConditionInput | null > | null,
  or?: Array< ModelBookmarkConditionInput | null > | null,
  not?: ModelBookmarkConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UpdateBookmarkInput = {
  id: string,
  imdbID?: string | null,
  title?: string | null,
  posterURL?: string | null,
};

export type DeleteBookmarkInput = {
  id?: string | null,
};

export type ModelBookmarkFilterInput = {
  id?: ModelIDInput | null,
  imdbID?: ModelStringInput | null,
  title?: ModelStringInput | null,
  posterURL?: ModelStringInput | null,
  and?: Array< ModelBookmarkFilterInput | null > | null,
  or?: Array< ModelBookmarkFilterInput | null > | null,
  not?: ModelBookmarkFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type CreateBookmarkMutationVariables = {
  input: CreateBookmarkInput,
  condition?: ModelBookmarkConditionInput | null,
};

export type CreateBookmarkMutation = {
  createBookmark:  {
    __typename: "Bookmark",
    id: string,
    imdbID: string,
    title: string,
    posterURL: string,
    owner: string | null,
  } | null,
};

export type UpdateBookmarkMutationVariables = {
  input: UpdateBookmarkInput,
  condition?: ModelBookmarkConditionInput | null,
};

export type UpdateBookmarkMutation = {
  updateBookmark:  {
    __typename: "Bookmark",
    id: string,
    imdbID: string,
    title: string,
    posterURL: string,
    owner: string | null,
  } | null,
};

export type DeleteBookmarkMutationVariables = {
  input: DeleteBookmarkInput,
  condition?: ModelBookmarkConditionInput | null,
};

export type DeleteBookmarkMutation = {
  deleteBookmark:  {
    __typename: "Bookmark",
    id: string,
    imdbID: string,
    title: string,
    posterURL: string,
    owner: string | null,
  } | null,
};

export type GetBookmarkQueryVariables = {
  id: string,
};

export type GetBookmarkQuery = {
  getBookmark:  {
    __typename: "Bookmark",
    id: string,
    imdbID: string,
    title: string,
    posterURL: string,
    owner: string | null,
  } | null,
};

export type ListBookmarksQueryVariables = {
  filter?: ModelBookmarkFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListBookmarksQuery = {
  listBookmarks:  {
    __typename: "ModelBookmarkConnection",
    items:  Array< {
      __typename: "Bookmark",
      id: string,
      imdbID: string,
      title: string,
      posterURL: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type BookmarksByImdbIdQueryVariables = {
  imdbID?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelBookmarkFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type BookmarksByImdbIdQuery = {
  bookmarksByImdbID:  {
    __typename: "ModelBookmarkConnection",
    items:  Array< {
      __typename: "Bookmark",
      id: string,
      imdbID: string,
      title: string,
      posterURL: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateBookmarkSubscriptionVariables = {
  owner: string,
};

export type OnCreateBookmarkSubscription = {
  onCreateBookmark:  {
    __typename: "Bookmark",
    id: string,
    imdbID: string,
    title: string,
    posterURL: string,
    owner: string | null,
  } | null,
};

export type OnUpdateBookmarkSubscriptionVariables = {
  owner: string,
};

export type OnUpdateBookmarkSubscription = {
  onUpdateBookmark:  {
    __typename: "Bookmark",
    id: string,
    imdbID: string,
    title: string,
    posterURL: string,
    owner: string | null,
  } | null,
};

export type OnDeleteBookmarkSubscriptionVariables = {
  owner: string,
};

export type OnDeleteBookmarkSubscription = {
  onDeleteBookmark:  {
    __typename: "Bookmark",
    id: string,
    imdbID: string,
    title: string,
    posterURL: string,
    owner: string | null,
  } | null,
};
