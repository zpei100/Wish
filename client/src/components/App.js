import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './style.css'

import Nav from './nav';
import Signup from './signup';
import Login from './login';
import Search from './search';
import Wishes from './wishes';

//need to do:
//a life cycle method to get most popular urls = based on user count;

//a button to sign up / login / logout, need to add email address

//a form to post url to database

//

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: '',
      validated: false
    };
  }

  updateCurrentUser(username) {
    this.setState({ currentUser: username, validated: username === '' ? false : true });
  }

  render() {



    return (
      <BrowserRouter>
        <div>
          <Nav
            validated={this.state.validated}
            currentUser={this.state.currentUser}
            handleLogout={this.updateCurrentUser.bind(this)}
          />
          <div className="container">
            <div className="">
              {this.state.validated ? (
                <span />
              ) : (
                <Route
                  exact
                  path="/signup"
                  component={() => {
                    return this.state.validated ? <div></div> :
                    <Signup className="my-3" handleSignup={this.updateCurrentUser.bind(this)} />
                  }}
                />
              )}

              <Route
                exact
                path="/login"
                component={() => {
                  return this.state.validated ? <div></div> :
                  <Login className="my-3" handleLogin={this.updateCurrentUser.bind(this)} />
                }}
              />
            </div>

            {this.state.validated ? (
              <div className="view">
                <Search className="m-auto" currentUser={this.state.currentUser} />
                <Wishes validated={this.state.validated} />
              </div>
            ) : (
              <div className="view">
                <p className="display-4 text-xs-center">Log in to see your wishes</p>
              </div>
            )}
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
