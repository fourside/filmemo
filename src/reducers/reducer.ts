import { combineReducers } from "@reduxjs/toolkit";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import {
  ACTIONS,
  ListBookmarkActionTypes,
  BookmarksState,
} from "../actions/types";
import { Bookmark } from "../model/Bookmark";
import { userReducer } from "../features/user/userSlice";
import { processingReducer } from "../features/processing/processlingSlice";
import { errorReducer } from "../features/error/errorSlice";
import { filmsReducer } from "../features/films/filmsSlice";
import { filmDetailsReducer } from "../features/filmDetails/filmDetailsSlice";
import { noteReducer } from "../features/note/noteSlice";

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
