import React from "react";

import LoginPage from "../Components/Pages/LoginPage";
import GamePage from "../Components/Pages/GamePage";
import WinnerPage from "../Components/Pages/WinnerPage";
import { Error } from "../Components/Error";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from={"/"} to={"/login"} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/game" component={GamePage} />
        <Route exact path="/winner" component={WinnerPage} />
        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
