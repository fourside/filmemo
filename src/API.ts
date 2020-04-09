/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateBookmarkInput = {
  id?: string | null,
  imdbID: string,
  title: string,
  posterURL: string,
  owner: string,
  createdAt: string,
  bookmarkNoteId?: string | null,
};

export type ModelBookmarkConditionInput = {
  imdbID?: ModelStringInput | null,
  title?: ModelStringInput | null,
  posterURL?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
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
  owner?: string | null,
  createdAt?: string | null,
  bookmarkNoteId?: string | null,
};

export type DeleteBookmarkInput = {
  id?: string | null,
};

export type CreateNoteInput = {
  id?: string | null,
  bookmarkId: string,
  rating: number,
  when: string,
  where: string,
  text?: string | null,
};

export type ModelNoteConditionInput = {
  bookmarkId?: ModelIDInput | null,
  rating?: ModelFloatInput | null,
  when?: ModelStringInput | null,
  where?: ModelStringInput | null,
  text?: ModelStringInput | null,
  and?: Array< ModelNoteConditionInput | null > | null,
  or?: Array< ModelNoteConditionInput | null > | null,
  not?: ModelNoteConditionInput | null,
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

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateNoteInput = {
  id: string,
  bookmarkId?: string | null,
  rating?: number | null,
  when?: string | null,
  where?: string | null,
  text?: string | null,
};

export type DeleteNoteInput = {
  id?: string | null,
};

export type ModelBookmarkFilterInput = {
  id?: ModelIDInput | null,
  imdbID?: ModelStringInput | null,
  title?: ModelStringInput | null,
  posterURL?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelBookmarkFilterInput | null > | null,
  or?: Array< ModelBookmarkFilterInput | null > | null,
  not?: ModelBookmarkFilterInput | null,
};

export type ModelNoteFilterInput = {
  id?: ModelIDInput | null,
  bookmarkId?: ModelIDInput | null,
  rating?: ModelFloatInput | null,
  when?: ModelStringInput | null,
  where?: ModelStringInput | null,
  text?: ModelStringInput | null,
  and?: Array< ModelNoteFilterInput | null > | null,
  or?: Array< ModelNoteFilterInput | null > | null,
  not?: ModelNoteFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

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
    owner: string,
    createdAt: string,
    note:  {
      __typename: "Note",
      id: string,
      bookmarkId: string,
      rating: number,
      when: string,
      where: string,
      text: string | null,
      owner: string | null,
    } | null,
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
    owner: string,
    createdAt: string,
    note:  {
      __typename: "Note",
      id: string,
      bookmarkId: string,
      rating: number,
      when: string,
      where: string,
      text: string | null,
      owner: string | null,
    } | null,
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
    owner: string,
    createdAt: string,
    note:  {
      __typename: "Note",
      id: string,
      bookmarkId: string,
      rating: number,
      when: string,
      where: string,
      text: string | null,
      owner: string | null,
    } | null,
  } | null,
};

export type CreateNoteMutationVariables = {
  input: CreateNoteInput,
  condition?: ModelNoteConditionInput | null,
};

export type CreateNoteMutation = {
  createNote:  {
    __typename: "Note",
    id: string,
    bookmarkId: string,
    rating: number,
    when: string,
    where: string,
    text: string | null,
    owner: string | null,
  } | null,
};

export type UpdateNoteMutationVariables = {
  input: UpdateNoteInput,
  condition?: ModelNoteConditionInput | null,
};

export type UpdateNoteMutation = {
  updateNote:  {
    __typename: "Note",
    id: string,
    bookmarkId: string,
    rating: number,
    when: string,
    where: string,
    text: string | null,
    owner: string | null,
  } | null,
};

export type DeleteNoteMutationVariables = {
  input: DeleteNoteInput,
  condition?: ModelNoteConditionInput | null,
};

export type DeleteNoteMutation = {
  deleteNote:  {
    __typename: "Note",
    id: string,
    bookmarkId: string,
    rating: number,
    when: string,
    where: string,
    text: string | null,
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
    owner: string,
    createdAt: string,
    note:  {
      __typename: "Note",
      id: string,
      bookmarkId: string,
      rating: number,
      when: string,
      where: string,
      text: string | null,
      owner: string | null,
    } | null,
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
      owner: string,
      createdAt: string,
      note:  {
        __typename: "Note",
        id: string,
        bookmarkId: string,
        rating: number,
        when: string,
        where: string,
        text: string | null,
        owner: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetNoteQueryVariables = {
  id: string,
};

export type GetNoteQuery = {
  getNote:  {
    __typename: "Note",
    id: string,
    bookmarkId: string,
    rating: number,
    when: string,
    where: string,
    text: string | null,
    owner: string | null,
  } | null,
};

export type ListNotesQueryVariables = {
  filter?: ModelNoteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNotesQuery = {
  listNotes:  {
    __typename: "ModelNoteConnection",
    items:  Array< {
      __typename: "Note",
      id: string,
      bookmarkId: string,
      rating: number,
      when: string,
      where: string,
      text: string | null,
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
      owner: string,
      createdAt: string,
      note:  {
        __typename: "Note",
        id: string,
        bookmarkId: string,
        rating: number,
        when: string,
        where: string,
        text: string | null,
        owner: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type BookmarksSortedByTimestampQueryVariables = {
  owner?: string | null,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelBookmarkFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type BookmarksSortedByTimestampQuery = {
  bookmarksSortedByTimestamp:  {
    __typename: "ModelBookmarkConnection",
    items:  Array< {
      __typename: "Bookmark",
      id: string,
      imdbID: string,
      title: string,
      posterURL: string,
      owner: string,
      createdAt: string,
      note:  {
        __typename: "Note",
        id: string,
        bookmarkId: string,
        rating: number,
        when: string,
        where: string,
        text: string | null,
        owner: string | null,
      } | null,
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
    owner: string,
    createdAt: string,
    note:  {
      __typename: "Note",
      id: string,
      bookmarkId: string,
      rating: number,
      when: string,
      where: string,
      text: string | null,
      owner: string | null,
    } | null,
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
    owner: string,
    createdAt: string,
    note:  {
      __typename: "Note",
      id: string,
      bookmarkId: string,
      rating: number,
      when: string,
      where: string,
      text: string | null,
      owner: string | null,
    } | null,
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
    owner: string,
    createdAt: string,
    note:  {
      __typename: "Note",
      id: string,
      bookmarkId: string,
      rating: number,
      when: string,
      where: string,
      text: string | null,
      owner: string | null,
    } | null,
  } | null,
};

export type OnCreateNoteSubscriptionVariables = {
  owner: string,
};

export type OnCreateNoteSubscription = {
  onCreateNote:  {
    __typename: "Note",
    id: string,
    bookmarkId: string,
    rating: number,
    when: string,
    where: string,
    text: string | null,
    owner: string | null,
  } | null,
};

export type OnUpdateNoteSubscriptionVariables = {
  owner: string,
};

export type OnUpdateNoteSubscription = {
  onUpdateNote:  {
    __typename: "Note",
    id: string,
    bookmarkId: string,
    rating: number,
    when: string,
    where: string,
    text: string | null,
    owner: string | null,
  } | null,
};

export type OnDeleteNoteSubscriptionVariables = {
  owner: string,
};

export type OnDeleteNoteSubscription = {
  onDeleteNote:  {
    __typename: "Note",
    id: string,
    bookmarkId: string,
    rating: number,
    when: string,
    where: string,
    text: string | null,
    owner: string | null,
  } | null,
};
