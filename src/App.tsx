import React, { useState, useEffect } from 'react';
import Amplify, { Hub } from "@aws-amplify/core";
import Auth, { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import awsmobile from "./aws-exports";
import './App.css';

Amplify.configure(awsmobile);

type User = {
  id: string;
  name: string;
}
const emptyUser = {
  id: "",
  name: "",
};
export const App: React.FC = () => {
  const [user, setUser] = useState<User>(emptyUser);

  const setLoginUser = async () => {
    try {
      const session = await Auth.currentSession();
      const { email, sub } = session.getIdToken().payload;
      setUser({
        id: sub,
        name: email,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    Hub.listen("auth", (capsule) => {
      const { event } = capsule.payload;
      switch (event) {
        case "signIn":
          setLoginUser();
          break;
        case "signOut":
          setUser(emptyUser);
          break;
      }
    });
    setLoginUser();
  }, []);

  const signInGoogle = async () => {
    await Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google });
  };

  const signOut = async () => {
    await Auth.signOut();
  };

  return (
    <div className="App">
      {!user.id && (
        <button onClick={signInGoogle}>Open Google</button>
      )}
      {user.id && (
        <button onClick={signOut}>Sign Out {user.name}</button>
      )}
    </div>
  );
};

