import React from 'react';
import './App.css';
import Clock from './components/clock/clock';
import Finder from './components/ipfs/finder';
import LoadPlaylist from './components/playlist/load';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Clock />
        <LoadPlaylist />
        <Finder />
      </header>
    </div>
  );
}

export default App;
