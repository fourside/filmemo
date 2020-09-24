import { ThunkAction } from "redux-thunk";
import {
  ACTIONS,
  NoteState,
  MutateNoteActionTypes,
  ListBookmarkActionTypes,
  BookmarksState,
  RequestAction,
  ErrorAction,
  RequestNextAction,
  ErrorNextAction,
  GetNoteActionTypes,
} from "./types";
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
