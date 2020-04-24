import { connect, ConnectedProps } from "react-redux";
import { App } from "../App";
import { clearUser, signedIn } from "../actions/action";

const mapState = () => ({});
const mapDispatch = {
  signedIn,
  clearUser,
};
const connector = connect(mapState, mapDispatch);

export type Props = ConnectedProps<typeof connector>;

export const AppContainer = connector(App);
