import React, { Component } from 'react';
import axios from 'axios';

class Wishes extends Component {
  componentDidMount() {
    axios.get('/wishes').then(({data : items}) => {
      this.props.initialUpdate(items);
    })
  }

  render() {
    if (this.props.items.length === 0) return <span className="view align-text-center display">Loading your wishes...</span>

    return (
      <div>
        {this.props.items.map(({details, image, price, title, url}) => 
          <div className="row col-sm-12 container border border-danger my-3">
            <div className="col-sm-4"><img className="img-fit my-auto" src={image}/></div>
            <div  className="col-sm-8">
              <ul className="list-group">
                <li className="list-group-item card-title">{title}</li>
                <li className="list-group-item"><a href={url}>Link to the site</a></li>
                <li className="list-group-item">Price is: {price}</li>
                <li className="list-group-item card-text">Descriptions: {details}</li>
              </ul>
            </div>
          </div>
        )} 
      </div>
    );
  }
}

export default Wishes;