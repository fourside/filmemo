import { connect, ConnectedProps } from "react-redux";
import { signOut } from "../actions/action";
import { LoginUserMenu } from "../components/LoginUserMenu";

const mapState = () => ({});
const mapDispatch = {
  signOut,
};
const connector = connect(mapState, mapDispatch);

export type Props = ConnectedProps<typeof connector>;

export const LoginUserMenuContainer = connector(LoginUserMenu);
