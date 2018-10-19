import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Nav extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log('the button should be disabled? ', this.props.validated)
    return (
      <div className="navbar-expand-sm navbar navbar-primary bg-light">
        <Link to="/signup" ><button className={`btn btn-primary mx-2 ${this.props.validated ? 'disabled' : ''}`}>Sign up</button></Link>
        <Link to="/login"><button className={`btn btn-primary mx-2 ${this.props.validated ? 'disabled' : ''}`}>Log in</button></Link>
        <button className="btn btn-warning mx-2" onClick={() => this.props.handleLogout('')}>Log out</button>
        {(this.props.currentUser === '') ? <h4>You need to log in</h4> : <h4>You are logged in as  {this.props.currentUser}</h4>}
      </div>
    );
  }
}

export default Nav;
