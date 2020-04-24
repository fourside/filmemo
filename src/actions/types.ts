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
  REQUEST = "REQUEST",
  REQUEST_NEXT = "REQUEST_NEXT",
  ERROR = "ERROR",
  ERROR_NEXT = "ERROR_NEXT",
  SEARCH_FILMS_SUCCESS = "SEARCH_FILMS_SUCCESS",
  SEARCH_FILMS_NEXT_SUCCESS = "SEARCH_FILMS_NEXT_SUCCESS",
  SEARCH_TITLE_INPUT = "SEARCH_TITLE_INPUT",
  SEARCH_FILM_DETAILS_SUCCESS = "SEARCH_FILM_DETAILS_SUCCESS",
  LIST_BOOKMARK_SUCCESS = "LIST_BOOKMARK_SUCCESS",
  LIST_BOOKMARK_NEXT_SUCCESS = "LIST_BOOKMARK_NEXT_SUCCESS",
  ADD_BOOKMARK_SUCCESS = "ADD_BOOKMARK_SUCCESS",
  REMOVE_BOOKMARK_SUCCESS = "REMOVE_BOOKMARK_SUCCESS",
  GET_BOOKMARK_SUCCESS = "GET_BOOKMARK_SUCCESS",
  CHANGE_NOTE_RATING = "CHANGE_NOTE_RATING",
  CHANGE_NOTE_WHEN = "CHANGE_NOTE_WHEN",
  CHANGE_NOTE_WHERE = "CHANGE_NOTE_WHERE",
  CHANGE_NOTE_TEXT = "CHANGE_NOTE_TEXT",
  ADD_NOTE_SUCCESS = "ADD_NOTE_SUCCESS",
  EDIT_NOTE_SUCCESS = "EDIT_NOTE_SUCCESS",
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

export interface RequestAction extends Action {
  type: ACTIONS.REQUEST,
  payload: {
    processing: boolean,
  },
}
export interface ErrorAction extends Action {
  type: ACTIONS.ERROR,
  payload: {
    processing: boolean,
    error: string,
  },
}
export interface RequestNextAction extends Action {
  type: ACTIONS.REQUEST_NEXT,
  payload: {
    nextLoading: boolean,
  },
}
export interface ErrorNextAction extends Action {
  type: ACTIONS.ERROR_NEXT,
  payload: {
    nextLoading: boolean,
    error: string,
  },
}
interface SearchFilmsSuccessAction extends Action {
  type: ACTIONS.SEARCH_FILMS_SUCCESS,
  payload: {
    processing: boolean,
    films: Film[],
    hasNext: boolean,
  },
}

export type SearchFilmsActionTypes = SearchFilmsSuccessAction | RequestAction | ErrorAction;

interface SearchFilmsNextSuccessAction extends Action {
  type: ACTIONS.SEARCH_FILMS_NEXT_SUCCESS,
  payload: {
    nextLoading: boolean,
    films: Film[],
    hasNext: boolean,
    page: number,
  },
}

export type SearchFilmsNextActionTypes = SearchFilmsNextSuccessAction | RequestNextAction | ErrorNextAction;
export type FilmsState = SearchFilmsSuccessAction["payload"]
  & SearchFilmsNextSuccessAction["payload"]
  & RequestAction["payload"]
  & ErrorAction["payload"];

interface SearchTitleInputAction extends Action {
  type: ACTIONS.SEARCH_TITLE_INPUT,
  payload: {
    title: string,
  },
}
export type SearchTitleInputActionTypes = SearchTitleInputAction;

interface SearchFilmDetailsSuccessAction extends Action {
  type: ACTIONS.SEARCH_FILM_DETAILS_SUCCESS,
  payload: {
    processing: boolean,
    film?: FilmDetail,
    bookmark?: Bookmark,
  },
}

export type SearchFilmDetailsActionTypes = SearchFilmDetailsSuccessAction | RequestAction | ErrorAction;
export type FilmDetailsState = SearchFilmDetailsSuccessAction["payload"]
  & RequestAction["payload"]
  & ErrorAction["payload"];

interface AddBookmarkSuccessAction extends Action {
  type: ACTIONS.ADD_BOOKMARK_SUCCESS,
  payload: {
    processing: boolean,
    bookmark: Bookmark,
  },
}

export type AddBookmarkActionTypes = AddBookmarkSuccessAction | RequestAction | ErrorAction;

interface RemoveBookmarkSuccessAction extends Action {
  type: ACTIONS.REMOVE_BOOKMARK_SUCCESS,
  payload: {
    processing: boolean,
    bookmark: undefined,
  },
}

export type RemoveBookmarkActionTypes = RemoveBookmarkSuccessAction | RequestAction | ErrorAction;

interface GetBookmarkSuccessAction extends Action {
  type: ACTIONS.GET_BOOKMARK_SUCCESS,
  payload: {
    processing: boolean,
    bookmark: Bookmark,
  },
}

export type GetBookmarkActionTypes = GetBookmarkSuccessAction | RequestAction | ErrorAction;

interface AddNoteSuccessAction extends Action {
  type: ACTIONS.ADD_NOTE_SUCCESS,
  payload: {
    processing: boolean,
    note: Note,
  },
}

export type NoteState = AddNoteSuccessAction["payload"] & RequestAction["payload"] & ErrorAction["payload"];
export type AddNoteActionTypes = AddNoteSuccessAction | RequestAction | ErrorAction;

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

interface EditNoteSuccessAction extends Action {
  type: ACTIONS.EDIT_NOTE_SUCCESS,
  payload: {
    processing: boolean,
    note: Note,
  },
}

export type EditNoteActionTypes = EditNoteSuccessAction | RequestAction | ErrorAction;

interface ListBookmarkSuccessAction extends Action {
  type: ACTIONS.LIST_BOOKMARK_SUCCESS,
  payload: {
    processing: boolean,
    bookmarks: Bookmark[],
    nextToken: string | null,
  },
}
interface ListBookmarkNextSuccessAction extends Action {
  type: ACTIONS.LIST_BOOKMARK_NEXT_SUCCESS,
  payload: {
    nextLoading: boolean,
    bookmarks: Bookmark[],
    nextToken: string | null,
  },
}

export type BookmarksState = ListBookmarkSuccessAction["payload"]
  & ListBookmarkNextSuccessAction["payload"]
  & RequestAction["payload"]
  & ErrorAction["payload"]
  & RequestNextAction["payload"]
  & ErrorNextAction["payload"]
  ;
export type ListBookmarkActionTypes = ListBookmarkSuccessAction
  | ListBookmarkNextSuccessAction
  | RequestAction
  | ErrorAction
  | RequestNextAction
  | ErrorNextAction
  ;
