import React, { useState, useEffect } from 'react';
import { Hub } from "@aws-amplify/core";
import { useHistory } from "react-router-dom";
import './App.css';
import { currentSession } from "./amplify/Auth";
import { Routes } from "./components/Routes";

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
  const history = useHistory();

  const setLoginUser = async () => {
    try {
      const session = await currentSession();
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
          history.push("/");
          break;
        case "signOut":
          setUser(emptyUser);
          history.push("/signin");
          break;
      }
    });
    setLoginUser();
  }, [history]);

  return (
    <div className="App">
      <Routes />
    </div>
  );
};
