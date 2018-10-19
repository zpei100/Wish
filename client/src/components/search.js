import React, { Component } from 'react';
import axios from 'axios';

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: ''
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/search', {
      url: this.state.url,
      username: this.props.currentUser
    });

    this.setState({url: ''})
  }

  handleInputChange(e) {
    this.setState({
      url: e.target.value
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label for="search">Enter the URL for your amazon wish!</label>
        <input className="url" type="url" value={this.state.url} placeholder="Enter URL" onChange={this.handleInputChange.bind(this)}></input>
      </form> 
    );
  }
}

export default Search;