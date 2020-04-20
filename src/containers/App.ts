import { connect, ConnectedProps } from "react-redux";
import { User } from "../model/User";
import { App } from "../App";
import { clearUser, signedIn } from "../actions/action";

const mapState = (user: User) => ({
  user
});
const mapDispatch = {
  signedIn,
  clearUser,
};
const connector = connect(mapState, mapDispatch);

export type Props = ConnectedProps<typeof connector>;

export const AppContainer = connector(App);
