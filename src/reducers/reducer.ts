import { combineReducers } from "@reduxjs/toolkit";
import { Action } from "redux";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import {
  ACTIONS,
  SearchFilmsActionTypes,
  SearchFilmsNextActionTypes,
  SearchFilmDetailsActionTypes,
  AddBookmarkActionTypes,
  RemoveBookmarkActionTypes,
  GetBookmarkActionTypes,
  MutateNoteActionTypes,
  ListBookmarkActionTypes,
  ErrorAction,
  ErrorNextAction,
  FilmsState,
  FilmDetailsState,
  NoteState,
  BookmarksState,
  GetNoteActionTypes,
} from "../actions/types";
import { Film } from "../model/Film";
import { formatDate } from "../model/Note";
import { Bookmark } from "../model/Bookmark";
import { userReducer } from "../features/user/userSlice";

const initFilmsState: FilmsState = {
  films: new Array<Film>(),
  page: 1,
  hasNext: false,
  nextLoading: false,
};
const filmsReducer = (state = initFilmsState, action: SearchFilmsActionTypes | SearchFilmsNextActionTypes) => {
  switch(action.type) {
    case ACTIONS.REQUEST_NEXT:
    case ACTIONS.ERROR_NEXT:
    case ACTIONS.SEARCH_FILMS:
      return {
        ...state,
        ...action.payload,
      };
    case ACTIONS.SEARCH_FILMS_NEXT:
      const films = state.films.concat(action.payload.films);
      return {
        ...state,
        ...action.payload,
        films,
      };
    default:
      return state;
  }
};

const initialFilmDetailsState: FilmDetailsState = {
  film: undefined,
  bookmark: undefined,
};
type FilmDetailsActionTyeps = SearchFilmDetailsActionTypes
  | AddBookmarkActionTypes
  | RemoveBookmarkActionTypes
  | GetBookmarkActionTypes
  ;
const filmDetailsReducer = (state = initialFilmDetailsState, action: FilmDetailsActionTyeps) => {
  switch(action.type) {
    case ACTIONS.SEARCH_FILM_DETAILS:
    case ACTIONS.ADD_BOOKMARK:
    case ACTIONS.REMOVE_BOOKMARK:
    case ACTIONS.GET_BOOKMARK:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const initialNoteState: NoteState = {
  note: {
    rating: 0,
    when: formatDate(),
    where: "",
    text: "",
    bookmarkId: "",
  }
};
type NoteActionTypes = MutateNoteActionTypes | GetNoteActionTypes;
const noteReducer = (state = initialNoteState, action: NoteActionTypes) => {
  switch(action.type) {
    case ACTIONS.MUTATE_NOTE:
    case ACTIONS.GET_NOTE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const initBookmarkListState: BookmarksState = {
  bookmarks: new Array<Bookmark>(),
  nextToken: null,
  error: "",
  nextLoading: false,
};
const listBookmarkReducer = (state = initBookmarkListState, action: ListBookmarkActionTypes) => {
  switch(action.type) {
    case ACTIONS.REQUEST_NEXT:
    case ACTIONS.ERROR_NEXT:
    case ACTIONS.LIST_BOOKMARK:
      return {
        ...state,
        ...action.payload,
      };
    case ACTIONS.LIST_BOOKMARK_NEXT:
      const bookmarks = state.bookmarks.concat(action.payload.bookmarks);
      return {
        ...state,
        ...action.payload,
        bookmarks,
      };
    default:
      return state;
  }
};

const errorReducer = (state = "", action: ErrorAction | ErrorNextAction) => {
  switch (action.type) {
    case ACTIONS.ERROR:
    case ACTIONS.ERROR_NEXT:
      return action.payload.error;
    default:
      return state;
  }
};

const processingReducer = (state =  false, action: Action) => {
  switch (action.type) {
    case ACTIONS.REQUEST:
      return true;
    default:
      return false;
  }
};

export const rootReducer = combineReducers({
  user: userReducer,
  films: filmsReducer,
  filmDetails: filmDetailsReducer,
  note: noteReducer,
  bookmarks: listBookmarkReducer,
  error: errorReducer,
  processing: processingReducer,
});

export type RootState = ReturnType<typeof rootReducer>

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useUser = () => useTypedSelector(state => state.user);
export const useError = () => useTypedSelector(state => state.error);
