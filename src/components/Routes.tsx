import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Loading } from "./Loading";

const UserPage = lazy(() => import("../containers/UserPage"));
const SignInPage = lazy(() => import("../containers/SignInPage"));
const FilmPage = lazy(() => import("../containers/FilmPage"));
const BookmarkListPage = lazy(() => import("../containers/BookmarkListPage"));

export const Routes: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path="/" component={UserPage} />
        <Route exact path="/title/:searchTitle" component={UserPage} />
        <Route exact path="/signin" component={SignInPage} />
        <Route exact path="/films/:imdbID" component={FilmPage} />
        <Route exact path="/bookmarks" component={BookmarkListPage} />
        <Route path="*">
          <Redirect to="/signin" />
        </Route>
      </Switch>
    </Suspense>
  );
};

