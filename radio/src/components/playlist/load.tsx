import React from 'react'
import './style.css'

type Props = {
    loadPlayList: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const LoadPlaylist = (props: Props) => {
    return (
        <div>
            <label className='file-upload'>
                <input
                    className='hidden-file'
                    type="file"
                    accept="audio/*"
                    name="inputfile"
                    id="inputfile"
                    multiple
                    onChange={(e) => { props.loadPlayList(e) }}
                />
                LOAD MUSIC
            </label>
        </div>
    )
}
export default LoadPlaylist