import React from 'react'
import './style.css'
type Props = {
    playNext: () => void
    playPrev: () => void
    playerId: string
    src: any
}
const Player = (props: Props) => {

    return (
        <div className='player-container' >
            <div className='player row' id={props.playerId} >
                <audio
                    controls
                    autoPlay
                    src={props.src}>
                    Your browser does not support the
                    <code>audio</code> element.
                </audio>
            </div>
            <div className='player row direct'>
                <div className='prev control' onClick={props.playPrev}><b>{'<<'}</b></div>
                <div className='next control' onClick={props.playNext}><b>{'>>'}</b></div>
            </div>

        </div>
    )
}

export default Player