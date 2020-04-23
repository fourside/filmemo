import { Action } from "redux";
import { User } from "../model/User";
import { Film, FilmDetail } from "../model/Film";
import { Bookmark } from "../model/Bookmark";
import { Note } from "../model/Note";

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
  REMOVE_BOOKMARK_REQUEST = "REMOVE_BOOKMARK_REQUEST",
  REMOVE_BOOKMARK_SUCCESS = "REMOVE_BOOKMARK_SUCCESS",
  REMOVE_BOOKMARK_FAILURE = "REMOVE_BOOKMARK_FAILURE",
  GET_BOOKMARK_REQUEST = "GET_BOOKMARK_REQUEST",
  GET_BOOKMARK_SUCCESS = "GET_BOOKMARK_SUCCESS",
  GET_BOOKMARK_FAILURE = "GET_BOOKMARK_FAILURE",
  CHANGE_NOTE_RATING = "CHANGE_NOTE_RATING",
  CHANGE_NOTE_WHEN = "CHANGE_NOTE_WHEN",
  CHANGE_NOTE_WHERE = "CHANGE_NOTE_WHERE",
  CHANGE_NOTE_TEXT = "CHANGE_NOTE_TEXT",
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

interface SearchFilmDetailsRequestAction extends Action {
  type: ACTIONS.SEARCH_FILM_DETAILS_REQUEST,
  payload: {
    processing: true,
  },
}
interface SearchFilmDetailsSuccessAction extends Action {
  type: ACTIONS.SEARCH_FILM_DETAILS_SUCCESS,
  payload: {
    processing: false,
    film: FilmDetail,
    bookmark?: Bookmark,
  },
}
interface SearchFilmDetailsFailureAction extends Action {
  type: ACTIONS.SEARCH_FILM_DETAILS_FAILURE,
  payload: {
    processing: false,
    error: string,
  },
}

export type SearchFilmDetailsActionTypes = SearchFilmDetailsRequestAction | SearchFilmDetailsSuccessAction | SearchFilmDetailsFailureAction;

interface AddBookmarkRequestAction extends Action {
  type: ACTIONS.ADD_BOOKMARK_REQUEST,
  payload: {
    processing: true,
  },
}
interface AddBookmarkSuccessAction extends Action {
  type: ACTIONS.ADD_BOOKMARK_SUCCESS,
  payload: {
    processing: false,
    bookmark: Bookmark,
  },
}
interface AddBookmarkFailureAction extends Action {
  type: ACTIONS.ADD_BOOKMARK_FAILURE,
  payload: {
    processing: false,
    error: string,
  },
}

export type AddBookmarkActionTypes = AddBookmarkRequestAction | AddBookmarkSuccessAction | AddBookmarkFailureAction;

interface RemoveBookmarkRequestAction extends Action {
  type: ACTIONS.REMOVE_BOOKMARK_REQUEST,
  payload: {
    processing: true,
  },
}
interface RemoveBookmarkSuccessAction extends Action {
  type: ACTIONS.REMOVE_BOOKMARK_SUCCESS,
  payload: {
    processing: false,
    bookmark: undefined,
  },
}
interface RemoveBookmarkFailureAction extends Action {
  type: ACTIONS.REMOVE_BOOKMARK_FAILURE,
  payload: {
    processing: false,
    error: string,
  },
}

export type RemoveBookmarkActionTypes = RemoveBookmarkRequestAction | RemoveBookmarkSuccessAction | RemoveBookmarkFailureAction;

interface GetBookmarkRequestAction extends Action {
  type: ACTIONS.GET_BOOKMARK_REQUEST,
  payload: {
    processing: true,
  },
}
interface GetBookmarkSuccessAction extends Action {
  type: ACTIONS.GET_BOOKMARK_SUCCESS,
  payload: {
    processing: false,
    bookmark: Bookmark,
  },
}
interface GetBookmarkFailureAction extends Action {
  type: ACTIONS.GET_BOOKMARK_FAILURE,
  payload: {
    processing: false,
    error: string,
  },
}

export type GetBookmarkActionTypes = GetBookmarkRequestAction | GetBookmarkSuccessAction | GetBookmarkFailureAction;

interface AddNoteRequestAction extends Action {
  type: ACTIONS.ADD_NOTE_REQUEST,
  payload: {
    processing: boolean,
  },
}
interface AddNoteSuccessAction extends Action {
  type: ACTIONS.ADD_NOTE_SUCCESS,
  payload: {
    processing: boolean,
    note: Note,
  },
}
interface AddNoteFailureAction extends Action {
  type: ACTIONS.ADD_NOTE_FAILURE,
  payload: {
    processing: boolean,
    error: string,
  },
}

export type NoteState = AddNoteRequestAction["payload"] & AddNoteSuccessAction["payload"] & AddNoteFailureAction["payload"];
export type AddNoteActionTypes = AddNoteRequestAction | AddNoteSuccessAction | AddNoteFailureAction;

interface ChangeNoteDateAction extends Action {
  type: ACTIONS.CHANGE_NOTE_WHEN,
  payload: {
    note: {
      when: string,
    },
  },
}
interface ChangeNoteRatingAction extends Action {
  type: ACTIONS.CHANGE_NOTE_RATING,
  payload: {
    note: {
      rating: number,
    },
  },
}
interface ChangeNoteWhenAction extends Action {
  type: ACTIONS.CHANGE_NOTE_WHEN,
  payload: {
    note: {
      when: string,
    },
  },
}
interface ChangeNoteWhereAction extends Action {
  type: ACTIONS.CHANGE_NOTE_WHERE,
  payload: {
    note: {
      where: string,
    },
  },
}
interface ChangeNoteTextAction extends Action {
  type: ACTIONS.CHANGE_NOTE_TEXT,
  payload: {
    note: {
      text: string,
    },
  },
}
export type ChangeNoteFormActionTypes = ChangeNoteDateAction
  | ChangeNoteRatingAction
  | ChangeNoteWhenAction
  | ChangeNoteWhereAction
  | ChangeNoteTextAction
  ;
