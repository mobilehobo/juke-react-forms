import React, { Component } from 'react';
import axios from 'axios';

export default class AddSongForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      songId: 1,
      songs: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios.get('/api/songs')
      .then(res => res.data)
      .then(songs => {
        this.setState({ songs });
      })
      .catch(err => console.error(err));
  }

  handleChange(event) {
    const songId = +event.target.value;
    this.setState({ songId });
  }

  render() {
    const playlistId = this.props.playlistId;
    const songId = this.state.songId;
    const handleSubmit = this.props.handlePlaylistSongSubmit;
    return (
      <div className="well">
        <form className="form-horizontal" noValidate name="songSelect"
          onSubmit={event => {
            handleSubmit(event, playlistId, songId);
          }}>
          <fieldset>
            <legend>Add to Playlist</legend>
            <div className="form-group">
              <label htmlFor="song" className="col-xs-2 control-label">Song</label>
              <div className="col-xs-10">
                <select className="form-control" name="song" onChange={this.handleChange}>
                  {
                    this.state.songs.map(song => {
                      return (<option key={song.id} value={song.id}>{song.name}</option>);
                    })
                  }
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button type="submit" className="btn btn-success">Add Song</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}
