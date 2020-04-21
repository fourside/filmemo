import { ThunkAction } from "redux-thunk";
import { ACTIONS, UserActionTypes, SearchFilmsActionTypes, SearchFilmsNextActionTypes, SearchTitleInputActionTypes } from "./types";
import { User, emptyUser } from "../model/User";
import { Film } from "../model/Film";
import * as Auth from "../amplify/Auth";
import { searchByTitle } from "../amplify/API";

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
      const { films, hasNext } = await searchByTitle(title);
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
      const { films, hasNext } = await searchByTitle(title, nextPage);
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
