import React, { useState, useEffect, useMemo } from "react";
import { Hub } from "@aws-amplify/core";
import { useHistory } from "react-router-dom";
import "./App.css";
import { Routes } from "./components/Routes";
import { Header } from "./components/Header";
import { ErrorContext } from "./context/ErrorContext";
import { ErrorAlert } from "./components/ErrorAlert";
import { Props } from "./containers/App";

export const App: React.FC<Props> = (props) => {
  const [error, setError] = useState("");
  const errorValue = useMemo(() => ({ error, setError}), [error, setError]);

  const history = useHistory();
  const { signedIn, clearUser } = props;

  useEffect(() => {
    (async () => {
      const user = await signedIn();
      if (user && !user.id) {
        history.push("/signin");
      }
    })();
  }, [history, signedIn]);

  useEffect(() => {
    Hub.listen("auth", (capsule) => {
      const { event } = capsule.payload;
      switch (event) {
        case "signIn":
          signedIn();
          history.push("/");
          break;
        case "signOut":
          clearUser();
          history.push("/signin");
          break;
      }
    });
  }, [history, signedIn, clearUser]);

  return (
    <ErrorContext.Provider value={errorValue}>
      <div className="App">
        <Header />
        <Routes />
        <ErrorAlert />
      </div>
    </ErrorContext.Provider>
  );
};
