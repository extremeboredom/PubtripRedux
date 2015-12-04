import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import LandingPage from './containers/LandingPage';
import CreateTrip from './containers/CreateTrip';
import PubsPage from './containers/PubsPage';
import PubPage from './containers/PubPage';
import TripPage from './containers/TripPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage} />
    <Route path="/trip/create" component={CreateTrip} />
    <Route path="/trips/:tripId" component={TripPage} />
    <Route path="pubs" component={PubsPage} />
    <Route path="pubs/:pubId" component={PubPage} />
  </Route>
);
