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
  GetBookmarkActionTypes,
  AddNoteActionTypes,
  NoteState,
  ChangeNoteFormActionTypes,
  EditNoteActionTypes,
  ListBookmarkActionTypes,
  BookmarksState,
  RequestAction,
  ErrorAction,
  RequestNextAction,
  ErrorNextAction,
  FilmDetailsState,
  FilmsState,
} from "./types";
import { User, emptyUser } from "../model/User";
import { Film, FilmDetail } from "../model/Film";
import * as Auth from "../amplify/Auth";
import * as API from "../amplify/API";
import { Bookmark } from "../model/Bookmark";
import { Note } from "../model/Note";

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

type ThunkSearchFilmsAction = ThunkAction<Promise<void>, FilmsState, undefined, SearchFilmsActionTypes>;

function request(): RequestAction {
  return {
    type: ACTIONS.REQUEST,
    payload: {
      processing: true,
    },
  };
}
function error(error: string): ErrorAction {
  return {
    type: ACTIONS.ERROR,
    payload: {
      processing: false,
      error,
    },
  };
}
function requestNext(): RequestNextAction {
  return {
    type: ACTIONS.REQUEST_NEXT,
    payload: {
      nextLoading: true,
    },
  };
}
function errorNext(error: string): ErrorNextAction {
  return {
    type: ACTIONS.ERROR_NEXT,
    payload: {
      nextLoading: false,
      error,
    },
  };
}

function searchFilmsSuccess(films: Film[], hasNext: boolean): SearchFilmsActionTypes {
  return {
    type: ACTIONS.SEARCH_FILMS,
    payload: {
      processing: false,
      films,
      hasNext,
    },
  };
}

export function searchFilms(title: string): ThunkSearchFilmsAction {
  return async (dispatch) => {
    dispatch(request());
    try {
      const { films, hasNext } = await API.searchByTitle(title);
      dispatch(searchFilmsSuccess(films, hasNext));
    } catch (err) {
      dispatch(error(err.message));
    }
  };
}

type ThunkSearchFilmsNextAction = ThunkAction<Promise<void>, FilmsState, undefined, SearchFilmsNextActionTypes>;

function searchFilmsNextSuccess(response: { films: Film[], hasNext: boolean, page: number }): SearchFilmsNextActionTypes {
  return {
    type: ACTIONS.SEARCH_FILMS_NEXT,
    payload: {
      nextLoading: false,
      films: response.films,
      hasNext: response.hasNext,
      page: response.page,
    },
  };
}

export function searchFilmsNext(title: string, nextPage: number): ThunkSearchFilmsNextAction {
  return async (dispatch) => {
    dispatch(requestNext());
    try {
      const { films, hasNext } = await API.searchByTitle(title, nextPage);
      dispatch(searchFilmsNextSuccess({ films, hasNext, page: nextPage }));
    } catch (err) {
      dispatch(errorNext(err.message));
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

type ThunkSearchFilmDetailsAction = ThunkAction<Promise<void>, FilmDetailsState, undefined, SearchFilmDetailsActionTypes>;

function searchFilmDetailsSuccess(film: FilmDetail, bookmark?: Bookmark): SearchFilmDetailsActionTypes {
  return {
    type: ACTIONS.SEARCH_FILM_DETAILS,
    payload: {
      processing: false,
      film,
      bookmark,
    },
  };
}

export function saerchFilmDetails(imdbID: string): ThunkSearchFilmDetailsAction {
  return async (dispatch) => {
    dispatch(request());
    try {
      const [filmDetails, bookmark] = await Promise.all([
        API.searchById(imdbID),
        API.getBookmark(imdbID),
      ]);
      dispatch(searchFilmDetailsSuccess(filmDetails, bookmark));
    } catch (err) {
      dispatch(error(err.message));
    }
  };
}

type ThunkAddBookmarkAction = ThunkAction<Promise<void>, BookmarksState, undefined, AddBookmarkActionTypes>;

function addBookmarkSuccess(bookmark: Bookmark): AddBookmarkActionTypes {
  return {
    type: ACTIONS.ADD_BOOKMARK,
    payload: {
      processing: false,
      bookmark,
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
    dispatch(request());
    try {
      const bookmark = await API.createBookmark(params);
      dispatch(addBookmarkSuccess(bookmark));
    } catch (err) {
      dispatch(error(err.message));
    }
  };
}

type ThunkRemoveBookmarkAction = ThunkAction<Promise<void>, BookmarksState, undefined, RemoveBookmarkActionTypes>;

function removeBookmarkSuccess(): RemoveBookmarkActionTypes {
  return {
    type: ACTIONS.REMOVE_BOOKMARK,
    payload: {
      processing: false,
      bookmark: undefined,
    },
  };
}
export function removeBookmark(bookmarkId: string): ThunkRemoveBookmarkAction {
  return async (dispatch) => {
    dispatch(request());
    try {
      await API.deleteBookmark(bookmarkId);
      dispatch(removeBookmarkSuccess());
    } catch (err) {
      dispatch(error(err.message));
    }
  };
}

type ThunkGetBookmarkAction = ThunkAction<Promise<void>, BookmarksState, undefined, GetBookmarkActionTypes>;

function getBookmarkSuccess(bookmark: Bookmark): GetBookmarkActionTypes {
  return {
    type: ACTIONS.GET_BOOKMARK,
    payload: {
      processing: false,
      bookmark,
    },
  };
}
export function getBookmark(imdbID: string): ThunkGetBookmarkAction {
  return async (dispatch) => {
    dispatch(request());
    try {
      const bookmark = await API.getBookmark(imdbID);
      dispatch(getBookmarkSuccess(bookmark));
    } catch (err) {
      dispatch(error(err.message));
    }
  };
}

type ThunkAddNoteAction = ThunkAction<Promise<void>, NoteState, undefined, AddNoteActionTypes>;

function addNoteSuccess(note: Note): AddNoteActionTypes {
  return {
    type: ACTIONS.ADD_NOTE,
    payload: {
      processing: false,
      note,
    },
  };
}
type NoteParams = Omit<Note, "owner">;
export function addNote(noteParams: NoteParams, bookmarkId: string): ThunkAddNoteAction {
  return async (dispatch) => {
    dispatch(request());
    try {
      const note = await API.createNote({ ...noteParams, bookmarkId });
      await API.relateBookmark(bookmarkId, note.id);
      dispatch(addNoteSuccess(note));
    } catch (err) {
      dispatch(error(err.message));
    }
  };
}

export function changeNoteRating(rating: number): ChangeNoteFormActionTypes {
  return {
    type: ACTIONS.CHANGE_NOTE_RATING,
    payload: {
      note: {
        rating,
      },
    },
  };
}
export function changeNoteWhen(when: string): ChangeNoteFormActionTypes {
  return {
    type: ACTIONS.CHANGE_NOTE_WHEN,
    payload: {
      note: {
        when,
      },
    },
  };
}
export function changeNoteWhere(where: string): ChangeNoteFormActionTypes {
  return {
    type: ACTIONS.CHANGE_NOTE_WHERE,
    payload: {
      note: {
        where,
      },
    },
  };
}
export function changeNoteText(text: string): ChangeNoteFormActionTypes {
  return {
    type: ACTIONS.CHANGE_NOTE_TEXT,
    payload: {
      note: {
        text,
      },
    },
  };
}

type ThunkEditNoteAction = ThunkAction<Promise<void>, NoteState, undefined, EditNoteActionTypes>;

function editNoteSuccess(note: Note): EditNoteActionTypes {
  return {
    type: ACTIONS.EDIT_NOTE,
    payload: {
      processing: false,
      note,
    },
  };
}
export function editNote(noteParams: NoteParams): ThunkEditNoteAction {
  return async (dispatch) => {
    dispatch(request());
    try {
      const note = await API.editNote(noteParams);
      dispatch(editNoteSuccess(note));
    } catch (err) {
      dispatch(error(err.message));
    }
  };
}

type ThunkListBookmarkAction = ThunkAction<Promise<void>, BookmarksState, undefined, ListBookmarkActionTypes>;

function listBookmarkSuccess(bookmarks: Bookmark[], nextToken: string | null): ListBookmarkActionTypes {
  return {
    type: ACTIONS.LIST_BOOKMARK,
    payload: {
      processing: false,
      bookmarks,
      nextToken,
    },
  };
}

export function listBookmark(owner: string): ThunkListBookmarkAction {
  return async (dispatch) => {
    dispatch(request());
    try {
      const { bookmarks, nextToken } = await API.listBookmarks(owner, null);
      dispatch(listBookmarkSuccess(bookmarks, nextToken));
    } catch (err) {
      dispatch(error(err.message));
    }
  };
}
function listBookmarkNextSuccess(bookmarks: Bookmark[], nextToken: string | null): ListBookmarkActionTypes {
  return {
    type: ACTIONS.LIST_BOOKMARK_NEXT,
    payload: {
      nextLoading: false,
      bookmarks,
      nextToken,
    },
  };
}

export function listBookmarkNext(owner: string, token: string): ThunkListBookmarkAction {
  return async (dispatch) => {
    dispatch(requestNext());
    try {
      const { bookmarks, nextToken } = await API.listBookmarks(owner, token);
      dispatch(listBookmarkNextSuccess(bookmarks, nextToken));
    } catch (err) {
      dispatch(errorNext(err.message));
    }
  };
}
