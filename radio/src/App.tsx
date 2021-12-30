import React from 'react';
import './App.css';
import Clock from './components/clock/clock';
import Finder from './components/ipfs/finder';
import LoadPlaylist from './components/playlist/load';

function App() {
  return (
    <div className="App">
      <div className="App-container">
        <div className='App-header'>
          <Clock />
        </div>
        <LoadPlaylist />
      </div>
    </div>
  );
}

export default App;
