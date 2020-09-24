import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Hub } from "@aws-amplify/core";
import "./App.css";
import { Routes } from "./components/Routes";
import { Header } from "./components/Header";
import { ErrorAlert } from "./components/ErrorAlert";
import { clearUser, signedIn } from "./features/user/userSlice";
import { useUser } from "./reducers/reducer";

export const App: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useUser();

  useEffect(() => {
    dispatch(signedIn());
    if (location.pathname !== "/signin" && user.authed === "unauthed") {
      history.push("/signin");
    } else if (location.pathname === "/signin" && user.authed === "authed") {
      history.push("/");
    }
  }, [dispatch, user.authed, history, location.pathname]);

  useEffect(() => {
    Hub.listen("auth", (capsule) => {
      const { event } = capsule.payload;
      switch (event) {
        case "signOut":
          dispatch(clearUser());
          history.push("/signin");
          break;
      }
    });
  }, [dispatch, history]);

  return (
    <div className="App">
      <Header />
      <Routes />
      <ErrorAlert />
    </div>
  );
};
