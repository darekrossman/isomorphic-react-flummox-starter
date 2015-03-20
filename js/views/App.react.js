import React from 'react';
import { RouteHandler, State, Link }  from 'react-router';
import FluxComponent from 'flummox/component';
import AppNav from './shared/AppNav.react';

const App = React.createClass({

  mixins: [ State ],

  contextTypes: {
    flux: React.PropTypes.object.isRequired,
  },

  componentDidUpdate() {
    let currentPath = this.getPath();
    if (this.state.currentPath !== currentPath)
      this.setState({currentPath: currentPath});
  },

  render() {

    return (

      <div>
        <AppNav ref="AppNav">
          <li><Link to="app">Home</Link></li>
        </AppNav>

        <div className="flex">

          <button onTouchTap={this.toggleAppNav}>Navigation</button>

          <h1>Hello!</h1>

          {/* <RouteHandler config={this.props.config}/> */}
        </div>
      </div>

    );
  },

  toggleAppNav() {
    setTimeout(() => {
      this.refs.AppNav.toggle();
    }, 150);
  }

})

export default App;