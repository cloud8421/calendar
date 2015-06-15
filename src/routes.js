import React from "react";
import {Route, DefaultRoute} from "react-router";
import Main from './components/main';
import MonthContainer from './components/month-container';

let Routes = (
  <Route name="main" path="/" handler={Main}>
    <Route name="month" path=":year/:month" handler={MonthContainer} />
    <DefaultRoute handler={MonthContainer} />
  </Route>
)

export default Routes;
