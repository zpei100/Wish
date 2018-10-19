import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

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
    console.log('user exists? ', this.state.validated)
    return (
      <BrowserRouter>
        <div>
          <Nav
            validated={this.state.validated}
            currentUser={this.state.currentUser}
            handleLogout={this.updateCurrentUser.bind(this)}
          />
          <div className="container">
            <div className="row">
              {this.state.validated ? (
                <span />
              ) : (
                <Route
                  exact
                  path="/signup"
                  component={() => (
                    <Signup handleSignup={this.updateCurrentUser.bind(this)} />
                  )}
                />
              )}

              <Route
                exact
                path="/login"
                component={() => (
                  <Login handleLogin={this.updateCurrentUser.bind(this)} />
                )}
              />
              <Route exact path="/search" component={Search} />
            </div>

            {this.state.validated ? (
              <div>
                <Search currentUser={this.state.currentUser} />
                <Wishes />
              </div>
            ) : (
              <h4>Log in to see your wishes</h4>
            )}
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
