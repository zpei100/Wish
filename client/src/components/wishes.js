import React, { Component } from 'react';
import axios from 'axios';

class Wishes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wishPoint: 0
    };
  }

  handleWishPointUpdate(e) {
    this.setState({ wishPoint: e.target.value });
  }

  handleWishPointSubmit(e, url, price) {
    e.preventDefault();
    let wishPoint = this.state.wishPoint;
    this.setState({ wishPoint: 0 });
    if (wishPoint <= 0) alert('Please be realistic -_-');
    else if (wishPoint >= price) alert('Consider donating your extra money :)');
    else axios.post('/wishPoint', { wishPoint, url }).then(console.log);
  }

  componentDidMount() {
    axios.get('/wishes').then(({ data: items }) => {
      this.props.initialUpdate(items);
    });
  }

  render() {
    if (this.props.items.length === 0)
      return (
        <span className="view align-text-center display">
          Loading your wishes...
        </span>
      );

    return (
      <div>
        {this.props.items.map(({ details, image, price, title, url }) => (
          <div className="row col-sm-12 container border border-danger my-3">
            <div className="col-sm-4">
              <img className="img-fit my-auto" src={image} />
            </div>
            <div className="col-sm-8">
              <ul className="list-group">
                <li className="list-group-item card-title">{title}</li>
                <li className="list-group-item">
                  <a href={url}>Link to the site</a>
                </li>
                <li className="list-group-item">Price is: {price}</li>
                <form
                  className="form-group"
                  onSubmit={e =>
                    this.handleWishPointSubmit.bind(this)(e, url, price)
                  }
                >
                  <label for="wishPoint">But I wish it is ...</label>
                  <input
                    className="form-control"
                    type="text"
                    name="wishPoint"
                    value={this.state.wishPoint}
                    onChange={this.handleWishPointUpdate.bind(this)}
                  />
                </form>
                <li className="list-group-item card-text">
                  Descriptions: {details}
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Wishes;
