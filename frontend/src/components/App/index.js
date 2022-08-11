import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//
import DashboardPage from "@/pages/Dashboard";
import ErrorPage from "@/pages/Error";
import Navbar from "@/components/Navbar";
import Overlay from "@/components/Overlay";

const App = () => {
  return (
    <Router>
      <Overlay />
      <Navbar />
      <Switch>
        <Route exact path="/">
          <DashboardPage />
        </Route>
        <Route path="*">
          <ErrorPage title="404" message="Page not found" />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
