import { Action } from "redux";
import { Bookmark } from "../model/Bookmark";
import { Note } from "../model/Note";

export enum ACTIONS {
  REQUEST = "REQUEST",
  REQUEST_NEXT = "REQUEST_NEXT",
  ERROR = "ERROR",
  ERROR_NEXT = "ERROR_NEXT",
  LIST_BOOKMARK = "LIST_BOOKMARK",
  LIST_BOOKMARK_NEXT = "LIST_BOOKMARK_NEXT",
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
