import React from 'react';
import '../app/app.css';
import SearchBar from '../searchbar/searchbar';
import SearchResults from '../searchresult/searchresult';
import PlayList from '../playlist/playlist';
import Spotify from '../../util/spotify';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchResults: [],
            playListName: 'first playlist',
            playListTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlayListName = this.updatePlayListName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playListTracks;
    if(tracks.find(savedTrack => savedTrack.id === track.id)) {
        return;
    }

    tracks.push(track);
    this.setState({playListTracks: tracks});
  }

  removeTrack(track) {
    let tracks = this.state.playListTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);

    this.setState({playListTracks: tracks});
  }

  updatePlayListName(name) {
    this.setState({playListName: name});
  }

  savePlaylist() {
    alert ('MEOW MEOW that shit is MUY FUEGO!!!')
    const trackUris = this.state.playListTracks.map(track => track.uri);
    Spotify.savePlayList(this.state.playListName, trackUris).then(() => {
      this.setState({
        playListName: 'New Playlist',
        playListTracks: []
      })
    })
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults})
    });
  }


  render() {
    return (
      <div>
        <h1>Rap<span className="highlight">CAT</span> Radio</h1>
          <div className="App">
            <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
                           onAdd={this.addTrack}/>
            <PlayList playListName={this.state.playListName}
                      playListTracks={this.state.playListTracks}
                      onRemove={this.removeTrack} 
                      onNameChange={this.updatePlayListName} 
                      onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    )
  }
};

export default App;
