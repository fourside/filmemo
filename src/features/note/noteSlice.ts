import { createSlice, PayloadAction, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { Note, formatDate } from "../../model/Note";
import * as API from "../../amplify/API";
import { request, done } from "../processing/processlingSlice";
import { error, clearError } from "../error/errorSlice";

type NoteState = {
  id?: string;
  rating: number;
  when: string;
  where: string;
  text?: string;
  bookmarkId?: string;
};

const initialState: NoteState = {
  rating: 0,
  when: formatDate(),
  where: "",
  text: "",
  bookmarkId: "",
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    mutateSuccess(state, action: PayloadAction<Note>) {
      return { ...action.payload };
    },
    getSuccess(state, action: PayloadAction<Note>) {
      return { ...action.payload };
    },
  },
});

const {
  mutateSuccess,
  getSuccess,
} = noteSlice.actions;
export const getNote = getSuccess;

export const noteReducer = noteSlice.reducer;

type ThunkNoteAction = ThunkAction<Promise<void>, NoteState, undefined, Action<string>>;

export function mutateNote(noteParams: Note, bookmarkId: string, onSuccess: () => void): ThunkNoteAction {
  return async (dispatch) => {
    dispatch(request());
    dispatch(clearError());
    try {
      const paramsCopy = Object.assign({}, noteParams);
      delete paramsCopy.owner;
      let note: Required<Note>;
      if (!paramsCopy.text) {
        delete paramsCopy.text; // appsync raise an error by passing empty string
      }
      if (!paramsCopy.id) {
        note = await API.createNote({ ...paramsCopy, bookmarkId });
        await API.relateBookmark(bookmarkId, note.id);
      } else {
        note = await API.editNote(paramsCopy);
      }
      dispatch(mutateSuccess(note));
      onSuccess();
    } catch (err) {
      dispatch(error(err.message));
    } finally {
      dispatch(done());
    }
  };
}
