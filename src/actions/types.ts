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
  SEARCH_FILMS = "SEARCH_FILMS",
  SEARCH_FILMS_NEXT = "SEARCH_FILMS_NEXT",
  SEARCH_TITLE_INPUT = "SEARCH_TITLE_INPUT",
  SEARCH_FILM_DETAILS = "SEARCH_FILM_DETAILS",
  LIST_BOOKMARK = "LIST_BOOKMARK",
  LIST_BOOKMARK_NEXT = "LIST_BOOKMARK_NEXT",
  ADD_BOOKMARK = "ADD_BOOKMARK",
  REMOVE_BOOKMARK = "REMOVE_BOOKMARK",
  GET_BOOKMARK = "GET_BOOKMARK",
  CHANGE_NOTE_RATING = "CHANGE_NOTE_RATING",
  CHANGE_NOTE_WHEN = "CHANGE_NOTE_WHEN",
  CHANGE_NOTE_WHERE = "CHANGE_NOTE_WHERE",
  CHANGE_NOTE_TEXT = "CHANGE_NOTE_TEXT",
  ADD_NOTE = "ADD_NOTE",
  EDIT_NOTE = "EDIT_NOTE",
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
}
export interface ErrorAction extends Action {
  type: ACTIONS.ERROR,
  payload: {
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
interface SearchFilmsAction extends Action {
  type: ACTIONS.SEARCH_FILMS,
  payload: {
    films: Film[],
    hasNext: boolean,
  },
}

export type SearchFilmsActionTypes = SearchFilmsAction | RequestAction | ErrorAction;

interface SearchFilmsNextAction extends Action {
  type: ACTIONS.SEARCH_FILMS_NEXT,
  payload: {
    nextLoading: boolean,
    films: Film[],
    hasNext: boolean,
    page: number,
  },
}

export type SearchFilmsNextActionTypes = SearchFilmsNextAction | RequestNextAction | ErrorNextAction;
export type FilmsState = SearchFilmsAction["payload"]
  & SearchFilmsNextAction["payload"]
  & ErrorAction["payload"];

interface SearchTitleInputAction extends Action {
  type: ACTIONS.SEARCH_TITLE_INPUT,
  payload: {
    title: string,
  },
}
export type SearchTitleInputActionTypes = SearchTitleInputAction;

interface SearchFilmDetailsAction extends Action {
  type: ACTIONS.SEARCH_FILM_DETAILS,
  payload: {
    film?: FilmDetail,
    bookmark?: Bookmark,
  },
}

export type SearchFilmDetailsActionTypes = SearchFilmDetailsAction | RequestAction | ErrorAction;
export type FilmDetailsState = SearchFilmDetailsAction["payload"]
  & ErrorAction["payload"];

interface AddBookmarkAction extends Action {
  type: ACTIONS.ADD_BOOKMARK,
  payload: {
    bookmark: Bookmark,
  },
}

export type AddBookmarkActionTypes = AddBookmarkAction | RequestAction | ErrorAction;

interface RemoveBookmarkAction extends Action {
  type: ACTIONS.REMOVE_BOOKMARK,
  payload: {
    bookmark: undefined,
  },
}

export type RemoveBookmarkActionTypes = RemoveBookmarkAction | RequestAction | ErrorAction;

interface GetBookmarkAction extends Action {
  type: ACTIONS.GET_BOOKMARK,
  payload: {
    bookmark: Bookmark,
  },
}

export type GetBookmarkActionTypes = GetBookmarkAction | RequestAction | ErrorAction;

interface AddNoteAction extends Action {
  type: ACTIONS.ADD_NOTE,
  payload: {
    note: Note,
  },
}

export type NoteState = AddNoteAction["payload"] & ErrorAction["payload"];
export type AddNoteActionTypes = AddNoteAction | RequestAction | ErrorAction;

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

interface EditNoteAction extends Action {
  type: ACTIONS.EDIT_NOTE,
  payload: {
    note: Note,
  },
}

export type EditNoteActionTypes = EditNoteAction | RequestAction | ErrorAction;

interface ListBookmarkAction extends Action {
  type: ACTIONS.LIST_BOOKMARK,
  payload: {
    bookmarks: Bookmark[],
    nextToken: string | null,
  },
}
interface ListBookmarkNextAction extends Action {
  type: ACTIONS.LIST_BOOKMARK_NEXT,
  payload: {
    nextLoading: boolean,
    bookmarks: Bookmark[],
    nextToken: string | null,
  },
}

export type BookmarksState = ListBookmarkAction["payload"]
  & ListBookmarkNextAction["payload"]
  & ErrorAction["payload"]
  & RequestNextAction["payload"]
  & ErrorNextAction["payload"]
  ;
export type ListBookmarkActionTypes = ListBookmarkAction
  | ListBookmarkNextAction
  | RequestAction
  | ErrorAction
  | RequestNextAction
  | ErrorNextAction
  ;
