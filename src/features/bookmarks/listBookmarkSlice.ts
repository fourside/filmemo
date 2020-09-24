import { createSlice, PayloadAction, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { Bookmark } from "../../model/Bookmark";
import * as API from "../../amplify/API";
import { request, done } from "../processing/processlingSlice";
import { error, clearError } from "../error/errorSlice";

type ListBookmarkState = {
  bookmarks?: Bookmark[],
  nextLoading: boolean,
  nextToken: string | null,
};

const initialState: ListBookmarkState = {
  bookmarks: undefined,
  nextToken: null,
  nextLoading: false,
};

type ListBookmarkPayload = {
  bookmarks: Bookmark[],
  nextToken: string | null,
};

const listBookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    requestNext(state) {
      state.nextLoading = true;
    },
    requestNextDone(state) {
      state.nextLoading = false;
    },
    listBookmarkSuccess(state, action: PayloadAction<ListBookmarkPayload>) {
      state.bookmarks = action.payload.bookmarks;
      state.nextToken = action.payload.nextToken;
      state.nextLoading = false;
    },
    listBookmarkNextSuccess(state, action: PayloadAction<ListBookmarkPayload>) {
      const bookmarks = state.bookmarks ?? [];
      state.bookmarks = bookmarks.concat(action.payload.bookmarks);
      state.nextToken = action.payload.nextToken;
      state.nextLoading = false;
    },
  },
});

const {
  requestNext,
  requestNextDone,
  listBookmarkSuccess,
  listBookmarkNextSuccess,
} = listBookmarkSlice.actions;

export const listBookmarkReducer = listBookmarkSlice.reducer;

type ThunkListBookmarkAction = ThunkAction<Promise<void>, ListBookmarkState, undefined, Action<string>>;

export function listBookmark(owner: string): ThunkListBookmarkAction {
  return async (dispatch) => {
    dispatch(request());
    dispatch(clearError());
    try {
      const { bookmarks, nextToken } = await API.listBookmarks(owner, null);
      dispatch(listBookmarkSuccess({ bookmarks, nextToken }));
    } catch (err) {
      dispatch(error(err.message));
    } finally {
      dispatch(done());
    }
  };
}

export function listBookmarkNext(owner: string, token: string): ThunkListBookmarkAction {
  return async (dispatch) => {
    dispatch(requestNext());
    dispatch(clearError());
    try {
      const { bookmarks, nextToken } = await API.listBookmarks(owner, token);
      dispatch(listBookmarkNextSuccess({ bookmarks, nextToken }));
    } catch (err) {
      dispatch(error(err.message));
    } finally {
      dispatch(requestNextDone());
    }
  };
}
