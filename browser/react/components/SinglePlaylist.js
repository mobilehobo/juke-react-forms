import React, { Component } from 'react';
import axios from 'axios';

import Songs from './Songs';
import AddSongForm from './AddSongForm';

export default class SinglePlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: {}
    };
    this.setPlaylistState = this.setPlaylistState.bind(this);
  }

  componentDidMount() {
    const playlistId = this.props.params.playlistId;
    this.setPlaylistState(playlistId);
  }

  componentWillReceiveProps(newProps) {
    const playlistId = newProps.params.playlistId;
    if (this.state.playlist.id !== playlistId)
    {
      this.setPlaylistState(playlistId);
    }
  }

  setPlaylistState(playlistId) {
    axios.get(`/api/playlists/${playlistId}`)
      .then(res => res.data)
      .then(playlist => this.setState({ playlist }));
  }

  render() {
    const playlist = this.state.playlist;
    return (

      <div>
        <h3>{playlist.name}</h3>
        <Songs songs={playlist.songs} /> {/** Hooray for reusability! */}
        {playlist.songs && !playlist.songs.length && <small>No songs.</small>}
        <hr />
        <AddSongForm playlistId={playlist.id} handlePlaylistSongSubmit={this.props.handlePlaylistSongSubmit} />
      </div>
    );
  }
}
