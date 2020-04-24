import { connect, ConnectedProps } from "react-redux";
import { addNote, changeNoteRating, changeNoteWhen, changeNoteWhere, changeNoteText, editNote } from "../actions/action";
import { NoteForm as NoteFormComponent } from "../components/NoteForm";
import { RootState } from "../reducers/reducer";

const mapState = (state: RootState) => {
  return {
    noteForm: state.note,
  };
};
const mapDispatch = {
  addNote,
  editNote,
  changeNoteRating,
  changeNoteWhen,
  changeNoteWhere,
  changeNoteText,
};
const connector = connect(mapState, mapDispatch);

export type ContainerProps = ConnectedProps<typeof connector>;

export const NoteForm = connector(NoteFormComponent);
