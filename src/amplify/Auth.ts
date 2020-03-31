import Auth, { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import awsmobile from "../aws-exports";

Auth.configure(awsmobile);

export async function currentSession() {
  return await Auth.currentSession();
}

export async function signInGoogle() {
  return await Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google });
}

export async function signOut()  {
  await Auth.signOut();
}
