import { Action } from "redux";
import { FilmDetail } from "../model/Film";
import { Bookmark } from "../model/Bookmark";
import { Note } from "../model/Note";

export enum ACTIONS {
  REQUEST = "REQUEST",
  REQUEST_NEXT = "REQUEST_NEXT",
  ERROR = "ERROR",
  ERROR_NEXT = "ERROR_NEXT",
  SEARCH_FILM_DETAILS = "SEARCH_FILM_DETAILS",
  LIST_BOOKMARK = "LIST_BOOKMARK",
  LIST_BOOKMARK_NEXT = "LIST_BOOKMARK_NEXT",
  ADD_BOOKMARK = "ADD_BOOKMARK",
  REMOVE_BOOKMARK = "REMOVE_BOOKMARK",
  GET_BOOKMARK = "GET_BOOKMARK",
  GET_NOTE = "GET_NOTE",
  MUTATE_NOTE = "MUTATE_NOTE",
}

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

interface SearchFilmDetailsAction extends Action {
  type: ACTIONS.SEARCH_FILM_DETAILS,
  payload: {
    film?: FilmDetail,
    bookmark?: Bookmark,
  },
}

export type SearchFilmDetailsActionTypes = SearchFilmDetailsAction | RequestAction | ErrorAction;
export type FilmDetailsState = SearchFilmDetailsAction["payload"];

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

interface MutateNoteAction extends Action {
  type: ACTIONS.MUTATE_NOTE,
  payload: {
    note: Note,
  },
}
interface GetNoteAction extends Action {
  type: ACTIONS.GET_NOTE,
  payload: {
    note: Note,
  },
}

export type MutateNoteActionTypes = MutateNoteAction | RequestAction | ErrorAction;
export type GetNoteActionTypes = GetNoteAction;
export type NoteState = MutateNoteAction["payload"];

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
