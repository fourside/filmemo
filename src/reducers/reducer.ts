import { combineReducers, Action } from "redux";
import { useSelector, TypedUseSelectorHook } from "react-redux";
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
  EditNoteActionTypes,
  ChangeNoteFormActionTypes,
  ListBookmarkActionTypes,
  ErrorAction,
  ErrorNextAction,
  FilmsState,
  FilmDetailsState,
  NoteState,
  BookmarksState,
} from "../actions/types";
import { emptyUser } from "../model/User";
import { Film } from "../model/Film";
import { formatDate } from "../model/Note";
import { Bookmark } from "../model/Bookmark";

const userReducer = (state = emptyUser, action: UserActionTypes) => {
  switch(action.type) {
    case ACTIONS.SIGN_IN_REQUEST:
      return state;
    case ACTIONS.SIGN_IN_SUCCESS:
      return action.payload;
    case ACTIONS.SIGN_OUT_REQUEST:
    case ACTIONS.SIGNED_OUT:
      return action.payload;
    default:
      return state;
  }
};

const initFilmsState: FilmsState = {
  films: new Array<Film>(),
  page: 1,
  hasNext: false,
  nextLoading: false,
  error: "",
};
const filmsReducer = (state = initFilmsState, action: SearchFilmsActionTypes | SearchFilmsNextActionTypes) => {
  switch(action.type) {
    case ACTIONS.ERROR:
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

const titleReducer = (state = "", action: SearchTitleInputActionTypes) => {
  switch(action.type) {
    case ACTIONS.SEARCH_TITLE_INPUT:
      return action.payload.title;
    default:
      return state;
  }
};

const initialFilmDetailsState: FilmDetailsState = {
  film: undefined,
  bookmark: undefined,
  error: "",
};
type FilmDetailsActionTyeps = SearchFilmDetailsActionTypes
  | AddBookmarkActionTypes
  | RemoveBookmarkActionTypes
  | GetBookmarkActionTypes
  ;
const filmDetailsReducer = (state = initialFilmDetailsState, action: FilmDetailsActionTyeps) => {
  switch(action.type) {
    case ACTIONS.ERROR:
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
  },
  error: "",
};
type NoteActionTypes = AddNoteActionTypes | EditNoteActionTypes | ChangeNoteFormActionTypes;
const noteReducer = (state = initialNoteState, action: NoteActionTypes) => {
  switch(action.type) {
    case ACTIONS.ERROR:
    case ACTIONS.ADD_NOTE:
    case ACTIONS.EDIT_NOTE:
      return {
        ...state,
        ...action.payload,
      };
    case ACTIONS.CHANGE_NOTE_RATING:
    case ACTIONS.CHANGE_NOTE_WHEN:
    case ACTIONS.CHANGE_NOTE_WHERE:
    case ACTIONS.CHANGE_NOTE_TEXT:
      return {
        ...state,
        note: {
          ...state.note,
          ...action.payload.note,
        },
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
    case ACTIONS.ERROR:
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
  title: titleReducer,
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
