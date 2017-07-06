import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class AllArtists extends Component {

  constructor() {
    super();
    this.state = {
      artists: [],
      filterText: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios.get('/api/artists')
      .then(res => res.data)
      .then(artists => this.setState({ artists }));
  }

  handleChange(event) {
    const filterText = event.target.value;
    this.setState({ filterText });
  }

  render() {

    const artists = this.state.artists;

    return (
      <div>
        <form className="form-group" style={{ marginTop: '20px' }} onChange={this.handleChange}>
          <input
            className="form-control"
            placeholder="Enter artist name"
          />
        </form>
        <h3>Artists</h3>
        <div className="list-group">
          {
            artists.map(artist => {
              return artist.name.match(this.state.filterText)
              ? (<div className="list-group-item" key={artist.id}>
                  <Link to={`/artists/${artist.id}`}>{artist.name}</Link>
                </div>
              )
              : null;
            })
          }
        </div>
      </div>
    );
  }
}
