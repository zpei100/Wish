import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import Nav from './nav';
import Signup from './signup';

//need to do: 
//a life cycle method to get most popular urls = based on user count;

//a button to sign up / login / logout, need to add email address

//a form to post url to database

//



class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Nav />
          <div className="container">
            <div className="row">
              <Route exact path="/signup" component={Signup}/>

            </div>
          </div>
        </div>
      </BrowserRouter>
      
    );
  }
}

export default App;
