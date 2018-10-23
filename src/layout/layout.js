import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../pages/home";
import About from "../pages/about";

const Layout = props => {
  return (
    <div>
      <h1>Visitor Application</h1>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>
        <Route path="*">
          <h1>404 Not Found</h1>
        </Route>
      </Switch>
    </div>
  );
};

export default Layout;
