import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Nav extends Component {
  render() {
    return (
      <div className="navbar-expand-sm navbar navbar-primary bg-light">
        <Link to="/signup" ><button className="btn btn-primary mx-2">Sign up</button></Link>
        <Link to="/login"><button className="btn btn-primary">Log in</button></Link>
      </div>
    );
  }
}

export default Nav;
