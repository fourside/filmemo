import React, { Suspense, lazy } from 'react';
import { Switch, Route } from "react-router-dom";
import { Loading } from "./Loading";

const UserPage = lazy(() => import("./UserPage"));
const SignInPage = lazy(() => import("./SignInPage"));
const FilmPage = lazy(() => import("./FilmPage"));
const StockPage = lazy(() => import("./StockPage"));

export const Routes: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path="/" component={UserPage} />
        <Route exact path="/signin" component={SignInPage} />
        <Route exact path="/films/:imdbID" component={FilmPage} />
        <Route exact path="/stock" component={StockPage} />
        <Route path="*" component={SignInPage} />
      </Switch>
    </Suspense>
  );
};

