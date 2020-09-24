import { ThunkAction } from "redux-thunk";
import {
  ACTIONS,
  ListBookmarkActionTypes,
  BookmarksState,
  RequestAction,
  ErrorAction,
  RequestNextAction,
  ErrorNextAction,
} from "./types";
import * as API from "../amplify/API";
import { Bookmark } from "../model/Bookmark";

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
