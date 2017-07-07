import React, { Component } from 'react';

export default class NewPlaylist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            playlistName: '',
            hasBeenEditied: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const playlistName = event.target.value;
        const hasBeenEditied = true;
        this.setState({ playlistName, hasBeenEditied });
    }

    render() {
        const nameLength = this.state.playlistName.length;
        const handleSubmit = this.props.handlePlaylistSubmit;

        return (
            <div className="well">
                <form className="form-horizontal"
                    onSubmit={event => {
                        handleSubmit(event, this.state.playlistName);
                        this.setState({ playlistName: '', hasBeenEditied: false });
                    }}>
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
                                    ((nameLength === 0 || nameLength > 16) && this.state.hasBeenEditied)
                                        ? (nameLength === 0)
                                            ? <div className="alert alert-warning">Please enter a name</div>
                                            : <div className="alert alert-warning">Name must be less than or equal to 16 characters</div>
                                        : null
                                }
                                <button
                                    type="submit"
                                    className={
                                        (nameLength === 0 || nameLength > 16)
                                            ? "btn disabled btn-success"
                                            : "btn btn-success"
                                    }
                                >Create Playlist</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}
