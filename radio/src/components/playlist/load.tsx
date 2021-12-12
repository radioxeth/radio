import React, {
    useState
} from 'react'
import './style.css'
const LoadPlaylist = () => {
    const [fileList, setFileList] = useState<File[]>([])
    const [listId, setlistId] = useState<string>('')
    const [currentSongId, setCurrentSongId] = useState<number>(0)

    const _listId = (idx: number) => {
        return `list-${idx}`
    }

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
        const player = document.getElementById('player')
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
        setlistId(_listId(idx))

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



    const _renderPlayList = () => {
        return (
            <div>
                <ul className={'list'}>
                    {
                        fileList.map((file, idx) => {
                            const id = _listId(idx)
                            return (
                                <li
                                    className={`list-song ${listId === id ? 'playing' : ''}`}
                                    key={idx}
                                    onClick={() => _play(idx)}
                                    id={id}
                                >
                                    {file.name}
                                </li>
                            )
                        })
                    }
                </ul >

            </div>
        )
    }

    const _renderPlayer = () => {
        return (
            <div className='player-container' >
                <div className='prev control' onClick={() => { _play(currentSongId - 1) }}>{'<<'}</div>
                <div className='player' id='player' />
                <div className='next control' onClick={() => { _play(currentSongId + 1) }}>{'>>'}</div>
            </div >
        )
    }
    document.body.onkeyup = function (e) {
        if (e.code === '32') {
            console.log('play/pause')
        }
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

            {_renderPlayList()}
            {fileList.length > 0 && _renderPlayer()}
        </div>
    )
}
export default LoadPlaylist