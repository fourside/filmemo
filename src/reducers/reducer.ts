import { combineReducers } from "@reduxjs/toolkit";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import {
  ACTIONS,
  MutateNoteActionTypes,
  ListBookmarkActionTypes,
  NoteState,
  BookmarksState,
  GetNoteActionTypes,
} from "../actions/types";
import { formatDate } from "../model/Note";
import { Bookmark } from "../model/Bookmark";
import { userReducer } from "../features/user/userSlice";
import { processingReducer } from "../features/processing/processlingSlice";
import { errorReducer } from "../features/error/errorSlice";
import { filmsReducer } from "../features/films/filmsSlice";
import { filmDetailsReducer } from "../features/filmDetails/filmDetailsSlice";

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
