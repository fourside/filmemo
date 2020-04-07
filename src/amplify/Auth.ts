import Auth, { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import awsmobile from "../aws-exports";

Auth.configure(awsmobile);

export async function getLoginUser() {
  try {
    const session = await Auth.currentSession();
    const { email, sub } = session.getIdToken().payload;
    return {
      id: sub,
      name: email,
    };
  } catch (err) {
    if (err === "No current user") {
      return {
        id: "",
        name: "",
      };
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
