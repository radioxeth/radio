import React from 'react'
import './style.css'
type Props = {
    playNext: () => void
    playPrev: () => void
    playerId: string
}
const Player = (props: Props) => {
    return (
        <div className='player-container' >
            <div className='prev control' onClick={props.playPrev}>{'<<'}</div>
            <div className='player' id={props.playerId} />
            <div className='next control' onClick={props.playNext}>{'>>'}</div>
        </div >
    )
}

export default Player