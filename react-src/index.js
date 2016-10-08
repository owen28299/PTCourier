import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';

require('./theme/index.scss');

const Header      = require('./components/header'),
      Home        = require('./components/home'),
      Client      = require('./components/client'),
      DashboardClient   = require('./components/clientdashboard'),
      Courier     = require('./components/courier'),
      NotFound    = require('./components/404'),
      Apply       = require('./components/apply'),
      Payment = require("./components/payment");

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Header}>
      <IndexRoute component={Home}></IndexRoute>
      <Route path="courier" component={Courier}></Route>
      <Route path="courier/apply/:id" component={Apply}></Route>
      <Route path="client" component={Client}></Route>
      <Route path="clientdash" component={DashboardClient}></Route>
      <Route path="*" component={NotFound}></Route>
      <Route path="payments" component={Payment}></Route>
    </Route>
  </Router>,
  document.getElementById('content')
);