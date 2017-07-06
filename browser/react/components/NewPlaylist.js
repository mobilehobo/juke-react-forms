import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NewPlaylist extends Component {

    constructor() {
        super();
        this.state = {
            playlistName: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const playlistName = event.target.value;
        this.setState({ playlistName });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.playlistName);
        this.setState({ playlistName: '' });
    }

    render() {
        return (
            <div className="well">
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>New Playlist</legend>
                        <div className="form-group">
                            <label className="col-xs-2 control-label">Name</label>
                            <div className="col-xs-10">
                                <input
                                    className="form-control"
                                    type="text"
                                    value={this.state.playlistName}
                                    onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-xs-10 col-xs-offset-2">
                                {
                                    (this.state.playlistName.length === 0 || this.state.playlistName.length > 16)
                                    ? <button type="submit" className="btn disabled btn-success">Create Playlist</button>
                                    : <button type="submit" className="btn btn-success">Create Playlist</button>
                                }
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}
