import { connect, ConnectedProps } from "react-redux";
import { signIn } from "../actions/action";
import SignInPage from "../components/SignInPage";

const mapState = () => ({});
const mapDispatch = {
  signIn,
};
const connector = connect(mapState, mapDispatch);

export type Props = ConnectedProps<typeof connector>;

export default connector(SignInPage);
