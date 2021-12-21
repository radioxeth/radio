import React, {
    useState
} from 'react'
import Player from './player'
import Playlist from './playlist'
import './style.css'

const LoadPlaylist = () => {
    const playerId = 'player'
    const [fileList, setFileList] = useState<File[]>([])
    const [currentSongId, setCurrentSongId] = useState<number>(0)

    const _loadPlaylist = (e: any) => {
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
            if (idx >= fileList.length) idx = 0
            soundFile.onended = () => _play(idx)
            soundFile.appendChild(source)
            player.appendChild(soundFile)

            soundFile.load()
            soundFile.play()

        }
    }

    const _play = (idx: number) => {
        setCurrentSongId(idx)

        function readFile(event: any) {
            _getMusic(event.target.result, idx)
        }

        function changeFile() {
            const reader = new FileReader()
            reader.addEventListener('load', readFile)
            reader.readAsDataURL(fileList[idx])
        }

        changeFile()
    }

    return (
        <div>
            <label className='file-upload'>
                <input
                    type="file"
                    accept="audio/mp3"
                    name="inputfile"
                    id="inputfile"
                    multiple
                    onChange={(e) => { _loadPlaylist(e) }}
                />
                Upload Music
            </label>

            <Playlist
                fileList={fileList}
                play={_play}
                currentSongIdx={currentSongId}
            />
            {
                fileList.length > 0 &&
                <Player
                    playNext={() => _play(currentSongId + 1)}
                    playPrev={() => _play(currentSongId - 1)}
                    playerId={playerId}
                />
            }
        </div>
    )
}
export default LoadPlaylist