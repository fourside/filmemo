import React from 'react';
import { signInGoogle } from "../amplify/Auth";

const SignInPage: React.FC = () => {
  return (
    <>
      <h2>Sign in</h2>
      <button onClick={signInGoogle}>Open Google</button>
    </>
  );
};

export default SignInPage;
