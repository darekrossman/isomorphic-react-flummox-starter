// App Imports
import React    from 'react';
import Router   from 'react-router';
import Flux     from './Flux'; 
import routes   from './routes' 

// Utilities & Helpers
import tapEventPlugin from 'react-tap-event-plugin';
import resolve        from './utils/resolve';
import WebAPIUtils from './utils/WebAPIUtils';

// Adds onTouchTap
// https://github.com/zilverline/react-tap-event-plugin
tapEventPlugin();


//////////////////
var config = window.__CONFIG__;

/**
 * Creates a new Flux instance
 * @type {Flux}
 */
let flux = new Flux(); 

/**
 * Runs the router against the current URL or request path
 * and renders the appropriate views (defined in routes.js).
 *
 * Each time the route changes, the target view handler's
 * static `routerWillRun` method will be called. This is
 * an opportunity to load any external data into state
 * before the view is rendered.  
 */
Router.run(routes, Router.HistoryLocation, function (Handler, state) {
  async function run() {
    WebAPIUtils.use(config)
    await resolve(state.routes, 'routerWillRun', state, flux, config);
    React.withContext(
      { flux },
      () => React.render(<Handler config={config}/>, document.getElementById('app'))
    );
  }
  run().catch(error => {
    throw error;
  });
}); 