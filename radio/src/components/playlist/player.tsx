import React from 'react'

type Props = {
    src?: string
}
const Player = (props: Props) => {
    return (<div>
        <audio autoPlay>
            <source src={props.src}></source>
        </audio>
    </div>)
}

export default Player