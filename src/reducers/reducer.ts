import { combineReducers } from "@reduxjs/toolkit";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { userReducer } from "../features/user/userSlice";
import { processingReducer } from "../features/processing/processlingSlice";
import { errorReducer } from "../features/error/errorSlice";
import { filmsReducer } from "../features/films/filmsSlice";
import { filmDetailsReducer } from "../features/filmDetails/filmDetailsSlice";
import { noteReducer } from "../features/note/noteSlice";
import { listBookmarkReducer }  from "../features/bookmarks/listBookmarkSlice";

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
