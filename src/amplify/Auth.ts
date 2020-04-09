import Auth, { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import awsmobile from "../aws-exports";
import { emptyUser } from "../model/User";

Auth.configure(awsmobile);

export async function getLoginUser() {
  try {
    const session = await Auth.currentSession();
    const payload = session.getIdToken().payload;
    const { email, sub } = payload;
    const owner = payload["cognito:username"];
    return {
      id: sub,
      name: email,
      owner,
    };
  } catch (err) {
    if (err === "No current user") {
      return emptyUser;
    }
    throw new Error(err); // may be buggie...
  }

}

export async function signInGoogle() {
  return await Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google });
}

export async function signOut()  {
  await Auth.signOut();
}
