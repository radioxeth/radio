import React, { useEffect, useState } from 'react';
import './App.css';
import Clock from './components/clock/clock';
import LoadPlaylist from './components/playlist/load';
import Toggle from './atoms/toggle';
import Playlist from './components/playlist/playlist';
import Player from './components/playlist/player';

function App() {

  const playerId = 'player-id'
  const [fileList, setFileList] = useState<File[]>([])
  const [currentSongId, setCurrentSongId] = useState<number>(0)
  const [darkMode, setDarkMode] = useState<boolean>(true)

  const _loadPlaylist = () => {
    const input = document.querySelector('input[type=file]') as HTMLInputElement
    const array = []
    if (input && input.files) {
      for (let i = 0; i < input.files.length; ++i) {
        array.push(input.files[i]);
      }
      setFileList(array)
    }
  }

  const _getMusic = (dataUrl: string, idx: number) => {
    const player = document.getElementById(playerId)
    if (player) {
      if (player.children) {
        for (let i = 0; i < player.children.length; ++i) {
          player.removeChild(player.children[i])
        }
      }
      const source = document.createElement("source")
      source.src = dataUrl

      const soundFile = document.createElement("audio")
      soundFile.preload = "auto"
      soundFile.controls = true
      soundFile.volume = 1
      idx++;
      if (idx > fileList.length) idx = 0
      soundFile.onended = () => _play(idx)
      soundFile.appendChild(source)
      player.appendChild(soundFile)

      soundFile.load()
      soundFile.play()
    }
  }

  const _readFile = (event: any, idx: number) => {
    _getMusic(event.target.result, idx)
  }

  const _changeFile = (idx: number) => {
    const reader = new FileReader()
    reader.addEventListener('load', (e) => _readFile(e, idx))
    reader.readAsDataURL(fileList[idx])
  }

  const _play = (idx: number) => {
    try {
      if (idx < 0) {
        idx = fileList.length - 1
      } else if (idx > fileList.length - 1) {
        idx = 0
      }
      setCurrentSongId(idx)
      _changeFile(idx)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => { _play(0) }, [fileList])

  return (
    <div className={`App ${darkMode ? 'dark' : 'light'}`}>
      <div className='App-container'>
        <div className='App-header row'>
          <div className='column side load'>
            <LoadPlaylist
              loadPlayList={() => { _loadPlaylist() }}
            />
          </div>
          <div className='column middle clock'>
            <Clock />
          </div>
          <div className='column side toggle'>
            <Toggle checked={darkMode} label={`${darkMode ? 'Dark' : 'Light'}`} title='Toggle dark mode' onChange={() => setDarkMode(!darkMode)} />
          </div>
        </div>
        <div className='App-body row'>
          <div className='column middle'>
            <Playlist
              fileList={fileList}
              play={_play}
              currentSongIdx={currentSongId}
              darkMode={darkMode}
            />
            {fileList.length > 0 &&
              <Player
                playNext={() => _play(currentSongId + 1)}
                playPrev={() => _play(currentSongId - 1)}
                playerId={playerId}
              />
            }

          </div>
        </div>

      </div >
    </div >
  );
}

export default App;
