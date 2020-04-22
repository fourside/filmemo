import { ThunkAction } from "redux-thunk";
import {
  ACTIONS,
  UserActionTypes,
  SearchFilmsActionTypes,
  SearchFilmsNextActionTypes,
  SearchTitleInputActionTypes,
  SearchFilmDetailsActionTypes,
  AddBookmarkActionTypes,
  RemoveBookmarkActionTypes,
} from "./types";
import { User, emptyUser } from "../model/User";
import { Film, FilmDetail } from "../model/Film";
import * as Auth from "../amplify/Auth";
import * as API from "../amplify/API";
import { Bookmark } from "../model/Bookmark";

function signInRequest(): UserActionTypes {
  return { type: ACTIONS.SIGN_IN_REQUEST };
}

function signInSuccess(user: User): UserActionTypes {
  return {
    type: ACTIONS.SIGN_IN_SUCCESS,
    payload: user,
  };
}

export function signOutRequest(): UserActionTypes {
  return {
    type: ACTIONS.SIGN_OUT_REQUEST,
    payload: emptyUser,
  };
}

type ThunkUserAction = ThunkAction<Promise<void | User>, User, undefined, UserActionTypes>;

export function signIn(): ThunkUserAction {
  return async function(dispatch) {
    dispatch(signInRequest());
    await Auth.signInGoogle();
  };
}

export function signedIn(): ThunkUserAction {
  return async (dispatch) => {
    const user = await Auth.getLoginUser();
    dispatch(signInSuccess(user));
    return user;
  };
}

export function signOut(): ThunkUserAction {
  return async (dispatch) => {
    await Auth.signOut();
    dispatch(signOutRequest());
  };
}

export function clearUser(): UserActionTypes {
  return {
    type: ACTIONS.SIGNED_OUT,
    payload: emptyUser,
  };
}

type FilmsState = {
  processing: false;
  films: Film[];
  page: number;
  hasNext: boolean;
  nextLoading: boolean;
  error: string;
};
type ThunkSearchFilmsAction = ThunkAction<Promise<void>, FilmsState, undefined, SearchFilmsActionTypes>;

function searchFilmsRequest(): SearchFilmsActionTypes {
  return {
    type: ACTIONS.SEARCH_FILMS_REQUEST,
    payload: {
      processing: true,
    },
  };
}

function searchFilmsSuccess(response: { films: Film[], hasNext: boolean }): SearchFilmsActionTypes {
  return {
    type: ACTIONS.SEARCH_FILMS_SUCCESS,
    payload: {
      processing: false,
      films: response.films,
      hasNext: response.hasNext,
    },
  };
}
function searchFilmsFailure(error: string): SearchFilmsActionTypes {
  return {
    type: ACTIONS.SEARCH_FILMS_FAILURE,
    payload: {
      processing: false,
      error,
    },
  };
}

export function searchFilms(title: string): ThunkSearchFilmsAction {
  return async (dispatch) => {
    dispatch(searchFilmsRequest());
    try {
      const { films, hasNext } = await API.searchByTitle(title);
      dispatch(searchFilmsSuccess({ films, hasNext }));
    } catch (err) {
      dispatch(searchFilmsFailure(err.message));
    }
  };
}

type ThunkSearchFilmsNextAction = ThunkAction<Promise<void>, FilmsState, undefined, SearchFilmsNextActionTypes>;

function searchFilmsNextRequest(): SearchFilmsNextActionTypes {
  return {
    type: ACTIONS.SEARCH_FILMS_NEXT_REQUEST,
    payload: {
      nextLoading: true,
    },
  };
}

function searchFilmsNextSuccess(response: { films: Film[], hasNext: boolean, page: number }): SearchFilmsNextActionTypes {
  return {
    type: ACTIONS.SEARCH_FILMS_NEXT_SUCCESS,
    payload: {
      nextLoading: false,
      films: response.films,
      hasNext: response.hasNext,
      page: response.page,
    },
  };
}
function searchFilmsNextFailure(error: string): SearchFilmsNextActionTypes {
  return {
    type: ACTIONS.SEARCH_FILMS_NEXT_FAILURE,
    payload: {
      nextLoading: false,
      error,
    },
  };
}

export function searchFilmsNext(title: string, nextPage: number): ThunkSearchFilmsNextAction {
  return async (dispatch) => {
    dispatch(searchFilmsNextRequest());
    try {
      const { films, hasNext } = await API.searchByTitle(title, nextPage);
      dispatch(searchFilmsNextSuccess({ films, hasNext, page: nextPage }));
    } catch (err) {
      dispatch(searchFilmsNextFailure(err.message));
    }
  };
}

export function searchTitleInput(title: string): SearchTitleInputActionTypes {
  return {
    type: ACTIONS.SEARCH_TITLE_INPUT,
    payload: {
      title
    },
  };
}

export type FilmDetailsState = {
  processing: boolean;
  film?: FilmDetail;
  bookmark?: Bookmark;
  error: string;
};
type ThunkSearchFilmDetailsAction = ThunkAction<Promise<void>, FilmDetailsState, undefined, SearchFilmDetailsActionTypes>;

function searchFilmDetailsRequest(): SearchFilmDetailsActionTypes {
  return {
    type: ACTIONS.SEARCH_FILM_DETAILS_REQUEST,
    payload: {
      processing: true,
    },
  };
}

function searchFilmDetailsSuccess(film: FilmDetail, bookmark?: Bookmark): SearchFilmDetailsActionTypes {
  return {
    type: ACTIONS.SEARCH_FILM_DETAILS_SUCCESS,
    payload: {
      processing: false,
      film,
      bookmark,
    },
  };
}
function searchFilmDetailsFailure(error: string): SearchFilmDetailsActionTypes {
  return {
    type: ACTIONS.SEARCH_FILM_DETAILS_FAILURE,
    payload: {
      processing: false,
      error,
    },
  };
}

export function saerchFilmDetails(imdbID: string): ThunkSearchFilmDetailsAction {
  return async (dispatch) => {
    dispatch(searchFilmDetailsRequest());
    try {
      const [filmDetails, bookmark] = await Promise.all([
        API.searchById(imdbID),
        API.getBookmark(imdbID),
      ]);
      dispatch(searchFilmDetailsSuccess(filmDetails, bookmark));
    } catch (err) {
      dispatch(searchFilmDetailsFailure(err.message));
    }
  };
}

export type BookmarkState = {
  processing: boolean;
  bookmark: Bookmark;
  error: string;
};
type ThunkAddBookmarkAction = ThunkAction<Promise<void>, BookmarkState, undefined, AddBookmarkActionTypes>;

function addBookmarkRequest(): AddBookmarkActionTypes {
  return {
    type: ACTIONS.ADD_BOOKMARK_REQUEST,
    payload: {
      processing: true,
    },
  };
}
function addBookmarkSuccess(bookmark: Bookmark): AddBookmarkActionTypes {
  return {
    type: ACTIONS.ADD_BOOKMARK_SUCCESS,
    payload: {
      processing: false,
      bookmark,
    },
  };
}
function addBookmarkFailure(error: string): AddBookmarkActionTypes {
  return {
    type: ACTIONS.ADD_BOOKMARK_FAILURE,
    payload: {
      processing: false,
      error,
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
    dispatch(addBookmarkRequest());
    try {
      const bookmark = await API.createBookmark(params);
      dispatch(addBookmarkSuccess(bookmark));
    } catch (err) {
      dispatch(addBookmarkFailure(err.message));
    }
  };
}

type ThunkRemoveBookmarkAction = ThunkAction<Promise<void>, BookmarkState, undefined, RemoveBookmarkActionTypes>;

function removeBookmarkRequest(): RemoveBookmarkActionTypes {
  return {
    type: ACTIONS.REMOVE_BOOKMARK_REQUEST,
    payload: {
      processing: true,
    },
  };
}
function removeBookmarkSuccess(): RemoveBookmarkActionTypes {
  return {
    type: ACTIONS.REMOVE_BOOKMARK_SUCCESS,
    payload: {
      processing: false,
      bookmark: undefined,
    },
  };
}
function removeBookmarkFailure(error: string): RemoveBookmarkActionTypes {
  return {
    type: ACTIONS.REMOVE_BOOKMARK_FAILURE,
    payload: {
      processing: false,
      error,
    },
  };
}
export function removeBookmark(bookmarkId: string): ThunkRemoveBookmarkAction {
  return async (dispatch) => {
    dispatch(removeBookmarkRequest());
    try {
      await API.deleteBookmark(bookmarkId);
      dispatch(removeBookmarkSuccess());
    } catch (err) {
      dispatch(removeBookmarkFailure(err.message));
    }
  };
}
