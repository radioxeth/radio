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
  addFileListToIpfs,
  catCid,
  listFilesIpfs
} from './services/ipfsService';

function App() {

  const playerId = 'player-id'
  const [fileList, setFileList] = useState<File[]>([])
  const [currentSongId, setCurrentSongId] = useState<number>(0)
  const [darkMode, setDarkMode] = useState<boolean>(true)
  const [contract, setContract] = useState<any>(null)
  const [account, setAccount] = useState<any>(null)
  const [du, setDu] = useState<any>(null)

  const _loadPlaylist = async () => {
    const input = document.querySelector('input[type=file]') as HTMLInputElement
    const array: File[] = []
    if (input && input.files) {
      console.log(input.files)
      for (let i = 0; i < input.files.length; ++i) {
        array.push(input.files[i]);
      }
      setFileList(array)
    }
  }


  const _getMusic = (dataUrl: string, idx: number) => {
    console.log(dataUrl, idx)
    if (!dataUrl) return
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
    if (fileList.length === 0) return
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

      const file = await catCid(res.Entries[0].Hash, res.Entries[0].Name)
      const fileBlob = new File([file], res.Entries[0].Name, { type: 'audio/mpeg' });
      array.push(fileBlob)
      // _getMusic(file, 0)
      // for (let i = 0; i < res.Entries.length; ++i) {
      //   const file = await catCid(res.Entries[i].Hash, res.Entries[i].Name)
      //   const fileBlob = new File([file], res.Entries[i].Name);
      //   array.push(fileBlob)
      // }
      console.log(fileBlob)
      setFileList(array);
    }
  }

  // useEffect(() => { _play(0) }, [fileList])

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
              play={_play}
              currentSongIdx={currentSongId}
            />
            <Player
              playNext={() => _play(currentSongId + 1)}
              playPrev={() => _play(currentSongId - 1)}
              playerId={playerId}
              src={du}
            />
          </div>
        </div>

      </div >
    </div >
  );
}

export default App;
