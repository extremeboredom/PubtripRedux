import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import LandingPage from './containers/LandingPage';
import CreateTrip from './containers/CreateTrip'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage} />
    <Route path="/trip/create" component={CreateTrip} />
  </Route>
);
