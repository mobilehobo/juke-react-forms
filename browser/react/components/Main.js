import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import StatefulAlbums from './StatefulAlbums';
import SingleAlbum from './SingleAlbum';
import AllArtists from './AllArtists';
import SingleArtist from './SingleArtist';
import Sidebar from './Sidebar';
import Player from './Player';
import NewPlaylist from './NewPlaylist';
import SinglePlaylist from './SinglePlaylist';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: []
    };
    this.handlePlaylistSubmit = this.handlePlaylistSubmit.bind(this);
    this.handlePlaylistSongSubmit = this.handlePlaylistSongSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('/api/playlists')
      .then(res => res.data)
      .then(playlists => {
        this.setState({ playlists });
      })
      .catch(err => console.error(err));
  }

  handlePlaylistSubmit(event, name) {
    event.preventDefault();
    axios.post('/api/playlists', { name })
      .then(res => res.data)
      .then(playlist => {
        const playlists = this.state.playlists;
        playlists.push(playlist);
        this.setState({ playlists });
      })
      .catch(err => console.error(err));
  }

  handlePlaylistSongSubmit(event, playlistId, songId) {
    event.preventDefault();
    axios.post(`/api/playlists/${playlistId}/songs`, { id: songId })
      .then(res => res.data)
      .then(() => {
        const playlists = this.state.playlists;
        this.setState({ playlists });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <Router>
        <div id="main" className="container-fluid">
          <div className="col-xs-2">
            <Sidebar playlists={this.state.playlists} />
          </div>
          <div className="col-xs-10">
            <Switch>
              <Route exact path="/albums" component={StatefulAlbums} />
              <Route path="/albums/:albumId" component={SingleAlbum} />
              <Route exact path="/artists" component={AllArtists} />
              <Route path="/artists/:artistId" component={SingleArtist} />
              <Route path="/new-playlist" render={() => <NewPlaylist handlePlaylistSubmit={this.handlePlaylistSubmit} />} />
              <Route path="/playlists/:playlistId" render={({ match }) => {
                return <SinglePlaylist params={match.params} handlePlaylistSongSubmit={this.handlePlaylistSongSubmit} />;
              }
              } />
              <Route component={StatefulAlbums} />
            </Switch>
          </div>
          <Player />
        </div>
      </Router>
    );
  }
}
