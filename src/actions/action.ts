import { ThunkAction } from "redux-thunk";
import {
  ACTIONS,
  SearchFilmDetailsActionTypes,
  AddBookmarkActionTypes,
  RemoveBookmarkActionTypes,
  GetBookmarkActionTypes,
  NoteState,
  MutateNoteActionTypes,
  ListBookmarkActionTypes,
  BookmarksState,
  RequestAction,
  ErrorAction,
  RequestNextAction,
  ErrorNextAction,
  FilmDetailsState,
  GetNoteActionTypes,
} from "./types";
import { FilmDetail } from "../model/Film";
import * as API from "../amplify/API";
import { Bookmark } from "../model/Bookmark";
import { Note } from "../model/Note";

function request(): RequestAction {
  return {
    type: ACTIONS.REQUEST,
  };
}
function error(error: string): ErrorAction {
  return {
    type: ACTIONS.ERROR,
    payload: {
      error,
    },
  };
}
function requestNext(): RequestNextAction {
  return {
    type: ACTIONS.REQUEST_NEXT,
    payload: {
      nextLoading: true,
    },
  };
}
function errorNext(error: string): ErrorNextAction {
  return {
    type: ACTIONS.ERROR_NEXT,
    payload: {
      nextLoading: false,
      error,
    },
  };
}

type ThunkSearchFilmDetailsAction = ThunkAction<Promise<void>, FilmDetailsState, undefined, SearchFilmDetailsActionTypes | GetNoteActionTypes>;

function searchFilmDetailsSuccess(film: FilmDetail, bookmark?: Bookmark): SearchFilmDetailsActionTypes {
  return {
    type: ACTIONS.SEARCH_FILM_DETAILS,
    payload: {
      film,
      bookmark,
    },
  };
}

export function saerchFilmDetails(imdbID: string): ThunkSearchFilmDetailsAction {
  return async (dispatch) => {
    dispatch(request());
    try {
      const [filmDetails, bookmark] = await Promise.all([
        API.searchById(imdbID),
        API.getBookmark(imdbID),
      ]);
      dispatch(searchFilmDetailsSuccess(filmDetails, bookmark));
      if (bookmark?.note) {
        dispatch(getNoteSuccess(bookmark.note));
      }
    } catch (err) {
      dispatch(error(err.message));
    }
  };
}

type ThunkAddBookmarkAction = ThunkAction<Promise<void>, BookmarksState, undefined, AddBookmarkActionTypes>;

function addBookmarkSuccess(bookmark: Bookmark): AddBookmarkActionTypes {
  return {
    type: ACTIONS.ADD_BOOKMARK,
    payload: {
      bookmark,
    },
  };
}
type AddBookmarkParams = {
  imdbID: string;
  title: string;
  posterURL: string
  owner: string;
  createdAt: Date;
};
export function addBookmark(params: AddBookmarkParams): ThunkAddBookmarkAction {
  return async (dispatch) => {
    dispatch(request());
    try {
      const bookmark = await API.createBookmark(params);
      dispatch(addBookmarkSuccess(bookmark));
    } catch (err) {
      dispatch(error(err.message));
    }
  };
}

type ThunkRemoveBookmarkAction = ThunkAction<Promise<void>, BookmarksState, undefined, RemoveBookmarkActionTypes>;

function removeBookmarkSuccess(): RemoveBookmarkActionTypes {
  return {
    type: ACTIONS.REMOVE_BOOKMARK,
    payload: {
      bookmark: undefined,
    },
  };
}
export function removeBookmark(bookmarkId: string): ThunkRemoveBookmarkAction {
  return async (dispatch) => {
    dispatch(request());
    try {
      await API.deleteBookmark(bookmarkId);
      dispatch(removeBookmarkSuccess());
    } catch (err) {
      dispatch(error(err.message));
    }
  };
}

type ThunkGetBookmarkAction = ThunkAction<Promise<void>, BookmarksState, undefined, GetBookmarkActionTypes | GetNoteActionTypes>;

function getBookmarkSuccess(bookmark: Bookmark): GetBookmarkActionTypes {
  return {
    type: ACTIONS.GET_BOOKMARK,
    payload: {
      bookmark,
    },
  };
}
export function getBookmark(imdbID: string): ThunkGetBookmarkAction {
  return async (dispatch) => {
    dispatch(request());
    try {
      const bookmark = await API.getBookmark(imdbID);
      dispatch(getBookmarkSuccess(bookmark));
      if (bookmark.note) {
        dispatch(getNoteSuccess(bookmark.note));
      }
    } catch (err) {
      dispatch(error(err.message));
    }
  };
}

type ThunkMutateNoteAction = ThunkAction<Promise<boolean>, NoteState, undefined, MutateNoteActionTypes>;

function mutateNoteSuccess(note: Note): MutateNoteActionTypes {
  return {
    type: ACTIONS.MUTATE_NOTE,
    payload: {
      note,
    },
  };
}

function getNoteSuccess(note: Note): GetNoteActionTypes {
  return {
    type: ACTIONS.GET_NOTE,
    payload: {
      note,
    },
  };
}

export function mutateNote(noteParams: Note, bookmarkId: string): ThunkMutateNoteAction {
  return async (dispatch) => {
    dispatch(request());
    try {
      const paramsCopy = Object.assign({}, noteParams);
      delete paramsCopy.owner;
      let note: Required<Note>;
      if (!paramsCopy.text) {
        delete paramsCopy.text; // appsync raise an error by passing empty string
      }
      if (!paramsCopy.id) {
        note = await API.createNote({ ...paramsCopy, bookmarkId });
        await API.relateBookmark(bookmarkId, note.id);
      } else {
        note = await API.editNote(paramsCopy);
      }
      dispatch(mutateNoteSuccess(note));
      return true;
    } catch (err) {
      dispatch(error(err.message));
      return false;
    }
  };
}

type ThunkListBookmarkAction = ThunkAction<Promise<void>, BookmarksState, undefined, ListBookmarkActionTypes>;

function listBookmarkSuccess(bookmarks: Bookmark[], nextToken: string | null): ListBookmarkActionTypes {
  return {
    type: ACTIONS.LIST_BOOKMARK,
    payload: {
      bookmarks,
      nextToken,
    },
  };
}

export function listBookmark(owner: string): ThunkListBookmarkAction {
  return async (dispatch) => {
    dispatch(request());
    try {
      const { bookmarks, nextToken } = await API.listBookmarks(owner, null);
      dispatch(listBookmarkSuccess(bookmarks, nextToken));
    } catch (err) {
      dispatch(error(err.message));
    }
  };
}
function listBookmarkNextSuccess(bookmarks: Bookmark[], nextToken: string | null): ListBookmarkActionTypes {
  return {
    type: ACTIONS.LIST_BOOKMARK_NEXT,
    payload: {
      nextLoading: false,
      bookmarks,
      nextToken,
    },
  };
}

export function listBookmarkNext(owner: string, token: string): ThunkListBookmarkAction {
  return async (dispatch) => {
    dispatch(requestNext());
    try {
      const { bookmarks, nextToken } = await API.listBookmarks(owner, token);
      dispatch(listBookmarkNextSuccess(bookmarks, nextToken));
    } catch (err) {
      dispatch(errorNext(err.message));
    }
  };
}
