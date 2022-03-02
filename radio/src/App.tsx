import React, { useEffect, useState } from 'react';
import './App.css';
import Clock from './components/clock/clock';
import LoadPlaylist from './components/playlist/load';
import Toggle from './atoms/toggle';
import Playlist from './components/playlist/playlist';
import Player from './components/playlist/player';
import { Radio } from './contract'
import IpfsDirectory from './components/ipfs/ipfsDirectory';
import {
  listFilesIpfs,
  readFile
} from './services/ipfsService';

function App() {

  const playerId = 'player-id'
  const [fileList, setFileList] = useState<File[]>([])
  const [currentSongId, setCurrentSongId] = useState<number>(0)
  const [darkMode, setDarkMode] = useState<boolean>(true)
  const [contract, setContract] = useState<any>(null)
  const [account, setAccount] = useState<any>(null)

  const _loadPlaylist = async () => {
    const input = document.querySelector('input[type=file]') as HTMLInputElement
    const array: File[] = []
    if (input && input.files) {
      for (let i = 0; i < input.files.length; ++i) {
        array.push(input.files[i]);
      }
      setFileList(array)
    }
  }

  const _initContract = async () => {
    await Radio.init()
    setContract(Radio.contract)
    console.log(Radio.contract)
    if (Radio.accounts.length > 0) {
      setAccount(Radio.accounts[0])
    }
  }

  const _onLoadDirectory = async (hash: string, path: string) => {
    const res = await listFilesIpfs(path)
    if (res && res.Entries) {
      let array: File[] = []
      for (let i = 0; i < res.Entries.length; ++i) {
        const file = await readFile(path, res.Entries[i].Name)
        if (file) {
          const fileBlob = new File([file], res.Entries[i].Name, { type: 'audio/mpeg' });
          array.push(fileBlob)
        }
      }
      setFileList(array)
    }
  }

  useEffect(() => {
    if (fileList.length > 0) {
      // _play(0)
    }
  }, [fileList])

  useEffect(() => {
    // _initContract()
  }, [])

  return (
    <div className={`App ${darkMode ? 'dark' : 'light'}`}>
      <div className='App-container'>
        <div className='App-header row'>
          <div className='column side load'>
            <LoadPlaylist loadPlayList={() => { _loadPlaylist() }} />
          </div>
          <div className='column middle clock'>
            <Clock />
          </div>
          <div className='column side toggle'>
            <Toggle checked={darkMode} title='Toggle dark mode' onChange={() => setDarkMode(!darkMode)} />
          </div>
        </div>
        <div className='App-body row'>
          <div className='column middle'>
            <IpfsDirectory
              path='/'
              entries={[]}
              onLoad={_onLoadDirectory} />

            <Playlist
              fileList={fileList}
              play={setCurrentSongId}
              currentSongIdx={currentSongId}
            />
            <Player
              playList={fileList}
              currentSongIdx={currentSongId}
              playerId={playerId}
              onIdxChange={setCurrentSongId}
            />
          </div>
        </div>

      </div >
    </div >
  );
}

export default App;
