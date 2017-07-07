import React, { Component } from 'react';
import axios from 'axios';
import Songs from '../components/Songs';

export default class SingleAlbum extends Component {

  constructor() {
    super();
    this.state = {
      album: {}
    };
    this.setAlbumState = this.setAlbumState.bind(this);
  }

  componentDidMount() {
    const albumId = this.props.match.params.albumId;
    this.setAlbumState(albumId);
  }

  componentWillReceiveProps(newProps) {
    const albumId = newProps.match.params.albumId;
    if (this.state.album.id !== albumId) {
      this.setAlbumState(albumId);
    }
  }

  setAlbumState(albumId) {
    axios.get(`/api/albums/${albumId}`)
      .then(res => res.data)
      .then(album => this.setState({
        album
      }));
  }

  render() {
    const album = this.state.album;

    return (
      <div className="album">
        <div>
          <h3>{album.name}</h3>
          <img src={album.imageUrl} className="img-thumbnail" />
        </div>
        <Songs songs={album.songs} />
      </div>
    );
  }
}
