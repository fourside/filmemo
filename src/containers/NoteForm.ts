import { connect, ConnectedProps } from "react-redux";
import { mutateNote } from "../actions/action";
import { NoteForm as NoteFormComponent } from "../components/NoteForm";
import { RootState } from "../reducers/reducer";

const mapState = (state: RootState) => {
  return {
    processing: state.processing,
    note: state.note.note,
  };
};
const mapDispatch = {
  mutateNote,
};
const connector = connect(mapState, mapDispatch);

export type ContainerProps = ConnectedProps<typeof connector>;

export const NoteForm = connector(NoteFormComponent);
