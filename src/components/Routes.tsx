import React, { Suspense, lazy } from 'react';
import { Switch, Route } from "react-router-dom";

const UserPage = lazy(() => import("./UserPage"));
const SignInPage = lazy(() => import("./SignInPage"));
const FilmPage = lazy(() => import("./FilmPage"));

export const Routes: React.FC = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Switch>
        <Route exact path="/" component={UserPage} />
        <Route exact path="/signin" component={SignInPage} />
        <Route exact path="/films/:imdbID" component={FilmPage} />
        <Route path="*" component={SignInPage} />
      </Switch>
    </Suspense>
  );
};

