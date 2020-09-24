import Auth, { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import awsmobile from "../aws-exports";
import { emptyUser, User } from "../model/User";

Auth.configure(awsmobile);

export async function getLoginUser(): Promise<User> {
  try {
    const session = await Auth.currentSession();
    const payload = session.getIdToken().payload;
    const { email, sub } = payload;
    const owner = payload["cognito:username"] as string;
    return {
      id: sub as string,
      name: email as string,
      owner,
      authed: "authed",
    };
  } catch (err) {
    if (err === "No current user") {
      return {
        ...emptyUser,
        authed: "unauthed",
      };
    }
    console.log(err);
    throw new Error(err); // may be buggie...
  }

}

export async function signInGoogle() {
  return await Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google });
}

export async function signOut()  {
  await Auth.signOut();
}
