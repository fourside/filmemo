import { Action } from "redux";
import { User } from "../model/User";
import { Film } from "../model/Film";

export enum ACTIONS {
  SIGN_IN_REQUEST = "SIGN_IN_REQUEST",
  SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS",
  SIGN_IN_FAILURE = "SIGN_IN_FAILURE",
  SIGN_OUT_REQUEST = "SIGN_OUT_REQUEST",
  SIGNED_OUT = "SIGNED_OUT",
  SEARCH_FILMS_REQUEST = "SEARCH_FILMS_REQUEST",
  SEARCH_FILMS_SUCCESS = "SEARCH_FILMS_SUCCESS",
  SEARCH_FILMS_FAILURE = "SEARCH_FILMS_FAILURE",
  SEARCH_FILMS_NEXT_REQUEST = "SEARCH_FILMS_NEXT_REQUEST",
  SEARCH_FILMS_NEXT_SUCCESS = "SEARCH_FILMS_NEXT_SUCCESS",
  SEARCH_FILMS_NEXT_FAILURE = "SEARCH_FILMS_NEXT_FAILURE",
  SEARCH_TITLE_INPUT = "SEARCH_TITLE_INPUT",
  SEARCH_FILM_DETAILS_REQUEST = "SEARCH_FILM_DETAILS_REQUEST",
  SEARCH_FILM_DETAILS_SUCCESS = "SEARCH_FILM_DETAILS_SUCCESS",
  SEARCH_FILM_DETAILS_FAILURE = "SEARCH_FILM_DETAILS_FAILURE",
  LIST_BOOKMARK_REQUEST = "LIST_BOOKMARK_REQUEST",
  LIST_BOOKMARK_SUCCESS = "LIST_BOOKMARK_SUCCESS",
  LIST_BOOKMARK_FAILURE = "LIST_BOOKMARK_FAILURE",
  LIST_BOOKMARK_NEXT_REQUEST = "LIST_BOOKMARK_NEXT_REQUEST",
  LIST_BOOKMARK_NEXT_SUCCESS = "LIST_BOOKMARK_NEXT_SUCCESS",
  LIST_BOOKMARK_NEXT_FAILURE = "LIST_BOOKMARK_NEXT_FAILURE",
  ADD_BOOKMARK_REQUEST = "ADD_BOOKMARK_REQUEST",
  ADD_BOOKMARK_SUCCESS = "ADD_BOOKMARK_SUCCESS",
  ADD_BOOKMARK_FAILURE = "ADD_BOOKMARK_FAILURE",
  REMOVE_BOOKMARK_REQUEST = "REMOVE_BOOKMARK_SUCCESS",
  REMOVE_BOOKMARK_SUCCESS = "REMOVE_BOOKMARK_SUCCESS",
  REMOVE_BOOKMARK_FAILURE = "REMOVE_BOOKMARK_FAILURE",
  ADD_NOTE_REQUEST = "ADD_NOTE_REQUEST",
  ADD_NOTE_SUCCESS = "ADD_NOTE_SUCCESS",
  ADD_NOTE_FAILURE = "ADD_NOTE_FAILURE",
  EDIT_NOTE_REQUEST = "EDIT_NOTE_REQUEST",
  EDIT_NOTE_SUCCESS = "EDIT_NOTE_SUCCESS",
  EDIT_NOTE_FAILURE = "EDIT_NOTE_FAILURE",
}

interface SignInRequestAction extends Action {
  type: ACTIONS.SIGN_IN_REQUEST,
}
interface SignInSuccessAction extends Action {
  type: ACTIONS.SIGN_IN_SUCCESS,
  payload: User,
}
interface SignOutRequestAction extends Action {
  type: ACTIONS.SIGN_OUT_REQUEST,
  payload: User,
}
interface SignedOutAction extends Action {
  type: ACTIONS.SIGNED_OUT,
  payload: User,
}

export type UserActionTypes = SignInRequestAction | SignInSuccessAction | SignOutRequestAction | SignedOutAction;

interface SearchFilmsRequestAction extends Action {
  type: ACTIONS.SEARCH_FILMS_REQUEST,
  payload: {
    processing: true,
  },
}
interface SearchFilmsSuccessAction extends Action {
  type: ACTIONS.SEARCH_FILMS_SUCCESS,
  payload: {
    processing: false,
    films: Film[],
    hasNext: boolean,
  },
}
interface SearchFilmsFailureAction extends Action {
  type: ACTIONS.SEARCH_FILMS_FAILURE,
  payload: {
    processing: false,
    error: string,
  },
}

export type SearchFilmsActionTypes = SearchFilmsRequestAction | SearchFilmsSuccessAction | SearchFilmsFailureAction;

interface SearchFilmsNextRequestAction extends Action {
  type: ACTIONS.SEARCH_FILMS_NEXT_REQUEST,
  payload: {
    nextLoading: true,
  },
}
interface SearchFilmsNextSuccessAction extends Action {
  type: ACTIONS.SEARCH_FILMS_NEXT_SUCCESS,
  payload: {
    nextLoading: false,
    films: Film[],
    hasNext: boolean,
    page: number,
  },
}
interface SearchFilmsNextFailureAction extends Action {
  type: ACTIONS.SEARCH_FILMS_NEXT_FAILURE,
  payload: {
    nextLoading: false,
    error: string,
  },
}

export type SearchFilmsNextActionTypes = SearchFilmsNextRequestAction | SearchFilmsNextSuccessAction | SearchFilmsNextFailureAction;

interface SearchTitleInputAction extends Action {
  type: ACTIONS.SEARCH_TITLE_INPUT,
  payload: {
    title: string,
  },
}
export type SearchTitleInputActionTypes = SearchTitleInputAction;
