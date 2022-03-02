import React from "react"

type Props = {
    fileList: File[],
    currentSongIdx: number,
    play: (idx: number) => void
}
const Playlist = (props: Props) => {
    const _renderPlayList = () => {
        return (
            <div className='list-container'>
                <div className='list-playlist'>
                    <ul className='list'>
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
                    </ul>
                </div>
            </div>
        )
    }
    return (<>{_renderPlayList()}</>)
}

export default Playlist