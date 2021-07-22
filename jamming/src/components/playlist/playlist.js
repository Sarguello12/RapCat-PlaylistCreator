import React from 'react';
import '../playlist/playlist.css';
import TrackList from '../tracklist/tracklist';

class PlayList extends React.Component {
    constructor(props) {
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event) {
      this.props.onNameChange(event.target.value);
    }

    render() {
        return(
            <div className="Playlist">
              <input defaultValue={"New Playlist"}
                     onChange={this.handleNameChange}/>
              <TrackList tracks={this.props.playListTracks} 
                         onRemove={this.props.onRemove}
                         isRemoval={true} />
              <button className="Playlist-save"
                      onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        )
    }
}

export default PlayList;    