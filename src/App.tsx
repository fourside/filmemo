import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Hub } from "@aws-amplify/core";
import { useHistory } from "react-router-dom";
import "./App.css";
import { getLoginUser } from "./amplify/Auth";
import { Routes } from "./components/Routes";
import { User, emptyUser } from "./model/User";
import { UserContext } from "./context/UserContext";
import { Header } from "./components/Header";
import { ErrorContext } from "./context/ErrorContext";
import { ErrorAlert } from "./components/ErrorAlert";
import { Props } from "./containers/App";

export const App: React.FC<Props> = (props) => {
  const [user, setUser] = useState<User>(emptyUser);
  const [error, setError] = useState("");
  const value = useMemo(() => ({ user, setUser}), [user, setUser]);
  const errorValue = useMemo(() => ({ error, setError}), [error, setError]);

  const history = useHistory();

  const setLoginUser = useCallback(async () => {
    try {
      const user = await getLoginUser();
      if (user.id) {
        setUser(user);
      } else {
        history.push("/signin");
      }
    } catch (err) {
      console.log(err);
    }
  }, [history]);

  useEffect(() => {
    Hub.listen("auth", (capsule) => {
      const { event } = capsule.payload;
      switch (event) {
        case "signIn":
          props.signedIn();
          history.push("/");
          break;
        case "signOut":
          props.clearUser();
          history.push("/signin");
          break;
      }
    });
    setLoginUser();
  }, [history, setLoginUser, props]);

  return (
    <UserContext.Provider value={value}>
      <ErrorContext.Provider value={errorValue}>
        <div className="App">
          <Header />
          <Routes />
          <ErrorAlert />
        </div>
      </ErrorContext.Provider>
    </UserContext.Provider>
  );
};
