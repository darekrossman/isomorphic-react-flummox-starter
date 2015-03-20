'use strict';

/**
 * Module dependencies
 */

var config = require('../../config');
var React = require('react');
var Router = require('react-router');
var routes = require('../../js/routes');
var DocumentTitle = require('react-document-title');
var Flux = require('../../js/Flux');
var resolveComponent = require('../../js/utils/resolve');
var WebAPIUtils = require('../../js/utils/WebAPIUtils')


// Pass our app config to the our API utils so it 
// knows which environment we're working in.
WebAPIUtils.use(config);


/**
 * Module definition
 */

module.exports = function(app) {

  // Set an app context
  var appContext = '';

  // Handle all get requests to any URL pattern
  app.get(/.*/, function *() {

    var appConfig,
        appString,
        title,
        router,
        flux; 

    // Create a new flux instance on every request
    flux = new Flux();

    // Stringify our app config so we can pass it to the client
    appConfig = JSON.stringify(config);

    // Create and run the app router against the request URL,
    // get the selected handler and router state objects.
    var { Handler, state } = yield new Promise((resolve, reject) => {
      router = Router.create({
        routes: routes,
        location: this.url
      });
      router.run((Handler, state) => resolve({ Handler, state }))
    });

    // Fetch our state data and populate our app stores. 
    try {
      yield resolveComponent(state.routes, 'routerWillRun', state, flux, config);
    } catch(err) {
      Handler = require('../../js/views/shared/NotFound.react')
    }

    // Render the HTML string for the component at the given route.
    // We render with our `flux` instance on the context so that
    // deeply-nested components can access it.
    appString = React.withContext(
      { flux },
      () => React.renderToString(<Handler config={config}/>)
    );

    // Figure out a page title
    title = DocumentTitle.rewind();

    var jsBundleSrc = '/dist/bundle' + (process.env.NODE_ENV === 'production' ? '.min.js' : '.js');

    // Render the client response template
    yield this.render('app', {
      appContext,
      title,
      appConfig,
      appString,
      jsBundleSrc,
      env: process.env,
    });

  });
}