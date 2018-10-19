import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: ''
    };
  }

  handleUsernameInput(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordInput(e) {
    this.setState({ password: e.target.value });
  }

  handleEmailInput(e) {
    this.setState({ email: e.target.value });
  }

  handleSubmit(e) {
    //need to validate password and email, possible a second password field
    e.preventDefault();
    const { username, password, email } = this.state;
    axios.post('/signup', { username, password, email });
    this.setState({username: '', password: '', email: ''})
  }

  render() {
    return (
      <div className="col-sm-6">
        <form className="form-group" onSubmit={this.handleSubmit.bind(this)}>
          <label for="username">Login Username</label>
          <input
            className="form-control"
            type="text"
            name="username"
            placeholder=" Enter Username"
            value={this.state.username}
            onChange={this.handleUsernameInput.bind(this)}
          />

          <label for="password">Login Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={this.handlePasswordInput.bind(this)}
          />

          <label for="email">Email Address</label>
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={this.handleEmailInput.bind(this)}
          />

          <button className="btn btn-warning my-3">Signup !</button>
        </form>
      </div>
    );
  }
}

export default Signup;
