import React, { useState, useEffect, useMemo } from "react";
import { Hub } from "@aws-amplify/core";
import { useHistory } from "react-router-dom";
import "./App.css";
import { Routes } from "./components/Routes";
import { User, emptyUser } from "./model/User";
import { UserContext } from "./context/UserContext";
import { Header } from "./components/Header";
import { ErrorContext } from "./context/ErrorContext";
import { ErrorAlert } from "./components/ErrorAlert";
import { Props } from "./containers/App";

export const App: React.FC<Props> = (props) => {
  const [user] = useState<User>(emptyUser);
  const [error, setError] = useState("");
  const value = useMemo(() => ({ user }), [user]);
  const errorValue = useMemo(() => ({ error, setError}), [error, setError]);

  const history = useHistory();

  useEffect(() => {
    (async () => {
      const user = await props.signedIn();
      if (user && !user.id) {
        history.push("/signin");
      }
    })();
    // eslint-disable-next-line
  }, []);

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
  }, [history, props]);

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
