import { Flux } from 'flummox';

// Actions imports
import AppActions           from './actions/AppActions';

// Stores imports
import AppStore             from './stores/AppStore';

class FluxApp extends Flux {

  constructor() {
    super();

    // register actions with our flux instance
    this.createActions('app', AppActions);
    
    // register stores with our flux instance
    this.createStore('app', AppStore, this);
  } 
 
}

export default FluxApp;