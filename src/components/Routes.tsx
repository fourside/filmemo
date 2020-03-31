import React from 'react';
import { Switch, Route } from "react-router-dom";
import SignInPage from "./SignInPage";
import UserPage from "./UserPage";

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={UserPage} />
      <Route exact path="/signin" component={SignInPage} />
      <Route path="*" component={SignInPage} />
    </Switch>
  );
};

