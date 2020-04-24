import React, { useEffect } from "react";
import { Hub } from "@aws-amplify/core";
import { useHistory } from "react-router-dom";
import "./App.css";
import { Routes } from "./components/Routes";
import { Header } from "./components/Header";
import { ErrorAlert } from "./components/ErrorAlert";
import { Props } from "./containers/App";

export const App: React.FC<Props> = (props) => {
  const history = useHistory();
  const { signedIn, clearUser } = props;

  useEffect(() => {
    (async () => {
      const user = await signedIn();
      if (user && !user.id) {
        history.push("/signin");
      }
    })();
  }, [signedIn, history]);

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
    <div className="App">
      <Header />
      <Routes />
      <ErrorAlert />
    </div>
  );
};
