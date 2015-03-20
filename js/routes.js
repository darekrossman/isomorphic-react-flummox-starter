var React  = require('react');
var { Route, NotFoundRoute } = require('react-router');

// Route Views
var App = require('./views/App.react');
var NotFound = require('./views/shared/NotFound.react'); 

var routes = (
  <Route name="app" path="/" handler={App}>

    // add some routes

    <NotFoundRoute handler={NotFound} />
  </Route>
);

module.exports = routes;