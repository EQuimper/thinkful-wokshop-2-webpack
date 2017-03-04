import React from 'react';
import { Router, browserHistory, Route } from 'react-router';
import { render } from 'react-dom';
import './styles.css';

import App from './modules/app/App';
import Games from './modules/games/Games';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/games" component={Games} />
    </Route>
  </Router>
);

render(
  routes,
  document.getElementById('app')
);
