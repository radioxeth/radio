import React from 'react';
import './App.css';
import Clock from './components/clock/clock';
import LoadPlaylist from './components/playlist/load';
import Player from './components/playlist/player';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Clock />
        <LoadPlaylist />
      </header>
    </div>
  );
}

export default App;
