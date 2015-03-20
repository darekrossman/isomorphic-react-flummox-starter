import React from 'react/addons';
import { Link } from 'react-router';

let cx = React.addons.classSet;

const AppNav = React.createClass({

  getInitialState() {
    return {
      active: false
    };
  },

  render() {
    let classes = cx({
      'AppNav': true,
      'active': this.state.active
    })

    return (
      <div>
        <nav className={classes}>
          <ul onTouchTap={this.toggle}>
            {this.props.children}
          </ul>
        </nav>
      </div>
    );
  },

  toggle() {
    this.setState({
      active: !this.state.active
    })
  }

});

export default AppNav;