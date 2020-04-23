import { connect, ConnectedProps } from "react-redux";
import { addNote } from "../actions/action";
import { NoteForm as NoteFormComponent } from "../components/NoteForm";

const mapState = () => ({});
const mapDispatch = {
  addNote,
};
const connector = connect(mapState, mapDispatch);

export type ContainerProps = ConnectedProps<typeof connector>;

export const NoteForm = connector(NoteFormComponent);
