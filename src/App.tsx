import React, { useState, useEffect, useMemo } from 'react';
import { Hub } from "@aws-amplify/core";
import { useHistory } from "react-router-dom";
import './App.css';
import { getLoginUser } from "./amplify/Auth";
import { Routes } from "./components/Routes";
import { User, emptyUser } from "./model/User";
import { UserContext } from "./context/UserContext";
import { Header } from "./components/Header";

export const App: React.FC = () => {
  const [user, setUser] = useState<User>(emptyUser);
  const value = useMemo(() => ({ user, setUser}), [user, setUser]);

  const history = useHistory();

  const setLoginUser = async () => {
    try {
      const user = await getLoginUser();
      if (user.id) {
        setUser(user);
      }
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
    <UserContext.Provider value={value}>
      <div className="App">
        <Header />
        <Routes />
      </div>
    </UserContext.Provider>
  );
};
