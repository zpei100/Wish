import React, { Component } from 'react';
import axios from 'axios';

const style = {width: '18rem'}


class Wishes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  componentDidMount() {
    axios.get('/wishes').then(({data : items}) => {
      console.log(items)
      this.setState({items})
    })
  }



  render() {
    if (this.state.items.length === 0) return <h1>Loading your wishes...</h1>
    return (
      <div>
        {this.state.items.map(({details, image, price, title, url}) => 
          <div className="card" style={style}>
            <img className="card-img-top" src={image}/>
            <ul className="card-body">
              <li className="list-group-item card-title">{title}</li>
              <li className="list-group-item"><a href={url}>Link to the site</a></li>
              <li className="list-group-item">Price is: {price}</li>
              <li className="list-group-item card-text">Descriptions: {details}</li>
            </ul>
          </div>
        )} 
      </div>
    );
  }
}

export default Wishes;