import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      email: ''
    };
  }

  handleUsernameInput(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordInput(e) {
    this.setState({ password: e.target.value });
  }

  handleConfirmPasswordInput(e) {
    this.setState({ confirmPassword: e.target.value});
  }

  handleEmailInput(e) {
    this.setState({ email: e.target.value });
  }
  
  handleSubmit(e) {
    e.preventDefault();
    const { username, password, confirmPassword, email } = this.state;

    if (confirmPassword !== password) {
      this.setState({password: '', confirmPassword: ''})
      return alert('Your passwords do not match! Try again.')
    }

    this.setState({username: '', password: '', email: '', confirmPassword: ''});

    axios.post('/signup', { username, password, email }).then((success) => {
      this.props.handleSignup(username);
    }).catch((failed) => {
      alert('Something went wrong with your login!')
    })
  }

  render() {
    return (
      <div className="col-sm-6 m-auto">
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

          <label for="password">Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Enter Password"
            value={this.state.password}
            onChange={this.handlePasswordInput.bind(this)}
          />

          <label for="password">Confirm Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Enter Same Password"
            value={this.state.confirmPassword}
            onChange={this.handleConfirmPasswordInput.bind(this)}
          />

          <label for="email">Email Address</label>
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Enter Email"
            value={this.state.email}
            onChange={this.handleEmailInput.bind(this)}
          />

          <button className="btn btn-warning my-3">Signup !</button>
        </form>
      </div>
    );
  }
}

export default Signup;
