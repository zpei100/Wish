import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleUsernameInput(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordInput(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    this.setState({username: '', password: ''})
    axios.post('/login', { username, password }).then(({data}) => {
      if (data === true)
      this.props.handleLogin(username);
    }).catch(() => {
      alert('Wrong login credentials');
    })
  }

  render() {
    console.log('props for login: ', this.props)
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
            value={this.state.password}
            onChange={this.handlePasswordInput.bind(this)}
          />

          <button className="btn btn-warning my-3">Login !</button>
        </form>
      </div>
    );
  }
}

export default Login;
