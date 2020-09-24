import { createSlice, PayloadAction, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { FilmDetail } from "../../model/Film";
import { Bookmark } from "../../model/Bookmark";
import * as API from "../../amplify/API";
import { request, done } from "../processing/processlingSlice";
import { error, clearError } from "../error/errorSlice";
import { getNote } from "../note/noteSlice";

type FilmDetailsState = {
  film?: FilmDetail,
  bookmark?: Bookmark,
};

const initialState: FilmDetailsState = {
  film: undefined,
  bookmark: undefined,
};

type SearchFilmDetailsPayload = {
  film: FilmDetail,
  bookmark?: Bookmark,
};

type BookmarkPayload = {
  bookmark: Bookmark,
};

const filmDetails = createSlice({
  name: "films",
  initialState,
  reducers: {
    searchFilmDetails(state, action: PayloadAction<SearchFilmDetailsPayload>) {
      state.film = action.payload.film;
      state.bookmark = action.payload.bookmark;
    },
    getBookmarkSuccess(state, action: PayloadAction<BookmarkPayload>) {
      state.bookmark = action.payload.bookmark;
    },
    addBookmarkSuccess(state, action: PayloadAction<BookmarkPayload>) {
      state.bookmark = action.payload.bookmark;
    },
    removeBookmarkSuccess(state) {
      state.bookmark = undefined;
    },
  },
});

const {
  searchFilmDetails,
  getBookmarkSuccess,
  addBookmarkSuccess,
  removeBookmarkSuccess,
} = filmDetails.actions;

export const filmDetailsReducer = filmDetails.reducer;

type ThunkSearchFilmDetailsAction = ThunkAction<Promise<void>, FilmDetailsState, undefined, Action<string>>;

export function saerchFilmDetails(imdbID: string): ThunkSearchFilmDetailsAction {
  return async (dispatch) => {
    dispatch(request());
    dispatch(clearError());
    try {
      const [film, bookmark] = await Promise.all([
        API.searchById(imdbID),
        API.getBookmark(imdbID),
      ]);
      dispatch(searchFilmDetails({ film, bookmark }));
      if (bookmark.note) {
        dispatch(getNote(bookmark.note));
      }
    } catch (err) {
      dispatch(error(err.message));
    } finally {
      dispatch(done());
    }
  };
}

type ThunkBookmarkAction = ThunkAction<Promise<void>, FilmDetailsState, undefined, Action<string>>;

export function getBookmark(imdbID: string): ThunkBookmarkAction {
  return async (dispatch) => {
    dispatch(request());
    dispatch(clearError());
    try {
      const bookmark = await API.getBookmark(imdbID);
      dispatch(getBookmarkSuccess({ bookmark }));
      if (bookmark.note) {
        dispatch(getNote(bookmark.note));
      }
    } catch (err) {
      dispatch(error(err.message));
    } finally {
      dispatch(done());
    }
  };
}

type AddBookmarkParams = {
  imdbID: string;
  title: string;
  posterURL: string
  owner: string;
  createdAt: Date;
};
export function addBookmark(params: AddBookmarkParams): ThunkBookmarkAction {
  return async (dispatch) => {
    dispatch(request());
    dispatch(clearError());
    try {
      const bookmark = await API.createBookmark(params);
      dispatch(addBookmarkSuccess({ bookmark }));
    } catch (err) {
      dispatch(error(err.message));
    } finally {
      dispatch(done());
    }
  };
}

export function removeBookmark(bookmarkId: string): ThunkBookmarkAction {
  return async (dispatch) => {
    dispatch(request());
    dispatch(clearError());
    try {
      await API.deleteBookmark(bookmarkId);
      dispatch(removeBookmarkSuccess());
    } catch (err) {
      dispatch(error(err.message));
    } finally {
      dispatch(done());
    }
  };
}
