import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './style.css';
import axios from 'axios';

import Nav from './nav';
import Signup from './signup';
import Login from './login';
import Search from './search';
import Wishes from './wishes';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: '',
      validated: false,
      items: []
    };
  }

  updateCurrentUser(username) {
    if (username !== '') {
      axios.get('/wishes').then(({data}) => {
        this.setState({items: data, currentUser: username, validated: true})
      })
    } else this.setState({username, items:[], validated: false})
  }

  updateItemList (url) {
    axios.post('/search', {
      url,
      username: this.state.currentUser
    }).then(() => {
      axios.get('/wishes').then(({data}) => {
        this.setState({items: data});
        console.log('the new items list: ', data)
      }).catch(() => console.log('getting wishes happened, but there is an error'))
    })
  }
  
  handleDeleteWish (url) {
    axios.post('/deleteWish', {url}).then((data) => {
      this.updateItemList(url)
    })
  }

  initialUpdate (items) {
    this.setState({items})
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
                <Search className="m-auto" currentUser={this.state.currentUser} handleSearch={this.updateItemList.bind(this)} />

                
                  <Wishes initialUpdate={this.initialUpdate.bind(this)} items={this.state.items} validated={this.state.validated} deleteWish={this.handleDeleteWish.bind(this)} />
                

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
