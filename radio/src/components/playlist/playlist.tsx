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
            <div className='mb-100'>
                <ul className={`list ${props.darkMode ? 'dark' : 'light'}`}>
                    {
                        props.fileList.map((file, idx) => {
                            return (
                                <li
                                    className={`list-item ${props.currentSongIdx === idx ? 'playing' : ''}`}
                                    key={idx}
                                    onClick={() => props.play(idx)}
                                    id={`list-item-${idx}`}
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