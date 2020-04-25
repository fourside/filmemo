import { connect, ConnectedProps } from "react-redux";
import { changeNoteRating, changeNoteWhen, changeNoteWhere, changeNoteText, mutateNote } from "../actions/action";
import { NoteForm as NoteFormComponent } from "../components/NoteForm";
import { RootState } from "../reducers/reducer";

const mapState = (state: RootState) => {
  return {
    processing: state.processing,
    note: state.note.note,
    valid: state.note.valid,
  };
};
const mapDispatch = {
  mutateNote,
  changeNoteRating,
  changeNoteWhen,
  changeNoteWhere,
  changeNoteText,
};
const connector = connect(mapState, mapDispatch);

export type ContainerProps = ConnectedProps<typeof connector>;

export const NoteForm = connector(NoteFormComponent);
