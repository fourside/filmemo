import { combineReducers } from "redux";
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
  NoteState,
  AddNoteActionTypes,
  ChangeNoteFormActionTypes,
} from "../actions/types";
import { FilmDetailsState } from "../actions/action";
import { emptyUser } from "../model/User";
import { Film } from "../model/Film";
import { formatDate } from "../model/Note";

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

const initFilmsState = {
  processing: false,
  films: [] as Film[],
  page: 1,
  hasNext: false,
  nextLoading: false,
  error: "",
};
const filmsReducer = (state = initFilmsState, action: SearchFilmsActionTypes | SearchFilmsNextActionTypes) => {
  switch(action.type) {
    case ACTIONS.SEARCH_FILMS_REQUEST:
    case ACTIONS.SEARCH_FILMS_SUCCESS:
    case ACTIONS.SEARCH_FILMS_FAILURE:
    case ACTIONS.SEARCH_FILMS_NEXT_REQUEST:
    case ACTIONS.SEARCH_FILMS_NEXT_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    case ACTIONS.SEARCH_FILMS_NEXT_SUCCESS:
      const total = state.films.concat(action.payload.films);
      return {
        ...state,
        ...action.payload,
        films: total,
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
  processing: false,
  error: "",
};
type FilmDetailsActionTyeps = SearchFilmDetailsActionTypes
  | AddBookmarkActionTypes
  | RemoveBookmarkActionTypes
  | GetBookmarkActionTypes
  ;
const filmDetailsReducer = (state = initialFilmDetailsState, action: FilmDetailsActionTyeps) => {
  switch(action.type) {
    case ACTIONS.SEARCH_FILM_DETAILS_REQUEST:
    case ACTIONS.SEARCH_FILM_DETAILS_SUCCESS:
    case ACTIONS.SEARCH_FILM_DETAILS_FAILURE:
    case ACTIONS.ADD_BOOKMARK_REQUEST:
    case ACTIONS.ADD_BOOKMARK_SUCCESS:
    case ACTIONS.ADD_BOOKMARK_FAILURE:
    case ACTIONS.REMOVE_BOOKMARK_REQUEST:
    case ACTIONS.REMOVE_BOOKMARK_SUCCESS:
    case ACTIONS.REMOVE_BOOKMARK_FAILURE:
    case ACTIONS.GET_BOOKMARK_REQUEST:
    case ACTIONS.GET_BOOKMARK_SUCCESS:
    case ACTIONS.GET_BOOKMARK_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const initialNoteState: NoteState = {
  processing: false,
  note: {
    rating: 0,
    when: formatDate(),
    where: "",
    text: "",
    bookmarkId: "",
  },
  error: "",
};
type NoteActionTypes = AddNoteActionTypes | ChangeNoteFormActionTypes;
const noteReducer = (state = initialNoteState, action: NoteActionTypes) => {
  switch(action.type) {
    case ACTIONS.ADD_NOTE_REQUEST:
    case ACTIONS.ADD_NOTE_SUCCESS:
    case ACTIONS.ADD_NOTE_FAILURE:
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

export const rootReducer = combineReducers({
  user: userReducer,
  films: filmsReducer,
  title: titleReducer,
  filmDetails: filmDetailsReducer,
  note: noteReducer,
});

type RootState = ReturnType<typeof rootReducer>

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useUser = () => useTypedSelector(state => state.user);
export const useFilms = () => useTypedSelector(state => state.films);
export const useTitle = () => useTypedSelector(state => state.title);
export const useFilmDetails = () => useTypedSelector(state => state.filmDetails);
export const useNote = () => useTypedSelector(state => state.note);
