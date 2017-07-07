import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = (props) => {
  console.log(props.playlists);
  return (
    <sidebar>
      <img src="juke.svg" className="logo" />
      <section>
        <h4 className="menu-item">
          <Link to="/albums">ALBUMS</Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to="/artists">ARTISTS</Link>
        </h4>
      </section>
      <hr />
      <section>
        <h4 className="text-muted">PLAYLISTS</h4>
        <hr />
        <ul className="list-unstyled">
          {
            props.playlists.map(list => {
              return (
                <li key={list.id} className="playlist-item menu-item">
                  <Link to="FILL_ME_IN">{list.name}</Link>
                </li>
              );
            })
          }
        </ul>
        <h4>
          <Link className="btn btn-primary btn-block" to="/new-playlist">
            <span className="glyphicon glyphicon-plus" /> PLAYLIST
          </Link>
        </h4>
      </section>
    </sidebar>
  );
};

export default Sidebar;
