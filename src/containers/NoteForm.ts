import { connect, ConnectedProps } from "react-redux";
import { addNote, changeNoteRating, changeNoteWhen, changeNoteWhere, changeNoteText } from "../actions/action";
import { NoteForm as NoteFormComponent } from "../components/NoteForm";

const mapState = () => ({});
const mapDispatch = {
  addNote,
  changeNoteRating,
  changeNoteWhen,
  changeNoteWhere,
  changeNoteText,
};
const connector = connect(mapState, mapDispatch);

export type ContainerProps = ConnectedProps<typeof connector>;

export const NoteForm = connector(NoteFormComponent);
