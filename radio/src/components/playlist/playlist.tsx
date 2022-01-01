import React from "react"

type Props = {
    fileList: File[],
    currentSongIdx: number,
    play: (idx: number) => void,
    darkMode?: boolean
}
const Playlist = (props: Props) => {
    const _renderPlayList = () => {
        return (
            <div >
                <ul className={`list ${props.darkMode ? 'dark' : 'light'}`}>
                    {
                        props.fileList.map((file, idx) => {
                            return (
                                <li
                                    className={`list-song ${props.currentSongIdx === idx ? 'playing' : ''}`}
                                    key={idx}
                                    onClick={() => props.play(idx)}
                                    id={`list-song-${idx}`}
                                >
                                    {file.name}
                                </li>
                            )
                        })
                    }
                </ul >

            </div >
        )
    }
    return (<>{_renderPlayList()}</>)
}

export default Playlist