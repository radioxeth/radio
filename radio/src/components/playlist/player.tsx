import React, { useEffect, useState } from 'react'
import './style.css'
type Props = {
    playerId: string
    currentSongIdx: number
    onIdxChange: any
    playList: File[]
}
const Player = (props: Props) => {
    const [player, setPlayer] = useState<HTMLAudioElement>(document.createElement('audio'))
    const [isPaused, setIsPaused] = useState<boolean>(true)

    const _getMusic = (dataUrl: string, idx: number) => {
        if (!dataUrl) return
        const playerElement = document.getElementById(props.playerId)
        if (playerElement && props.playList.length > 0) {
            if (!player.paused) {
                player.pause()
            }
            if (playerElement.children) {
                for (let i = 0; i < playerElement.children.length; ++i) {
                    playerElement.removeChild(playerElement.children[i])
                }
            }

            const source = document.createElement("source")
            source.src = dataUrl
            const soundFile = document.createElement("audio")
            soundFile.preload = "auto"
            soundFile.controls = false
            soundFile.volume = 1
            soundFile.onpause = (ev: Event) => {
                setIsPaused(true)
            }
            soundFile.onplay = (ev: Event) => {
                setIsPaused(false)
            }
            if (idx >= props.playList.length) idx = 0
            if (idx < 0) idx = props.playList.length - 1
            soundFile.appendChild(source)
            player.appendChild(soundFile)
            soundFile.load()
            soundFile.play()
            setPlayer(soundFile)
        }
    }


    const _readFile = (event: any, idx: number) => {
        _getMusic(event.target.result, idx)
    }

    const _changeTrack = (idx: number) => {
        const reader = new FileReader()
        reader.addEventListener('load', (e) => _readFile(e, idx))
        reader.readAsDataURL(props.playList[idx])
    }
    const _playPauseTrack = () => {
        if (player.childElementCount === 0) {
            _changeTrack(props.currentSongIdx)
        } else if (player.paused) {
            player.play()
        }
        else {
            player.pause()
        }

    }

    useEffect(() => {
        if (props.playList.length > 0 && props.currentSongIdx >= 0 && props.currentSongIdx < props.playList.length) {
            _changeTrack(props.currentSongIdx)
        }
    }, [props.currentSongIdx])

    useEffect(() => {
        setIsPaused(!player.paused)
    }, [player.pause])

    const decrementIdx = (idx) => {
        idx--
        if (idx < 0) idx = props.playList.length - 1
        return idx
    }
    const incrementIdx = (idx) => {
        idx++
        if (idx >= props.playList.length) idx = 0
        return idx
    }

    return (
        <div className='player-container' >
            <div className='player row direct'>
                <div className='prev control'
                    onClick={() => props.onIdxChange(decrementIdx(props.currentSongIdx))}>
                    &#9669;&#9669;
                </div>
                <div className='play-pause control' onClick={() => {
                    _playPauseTrack()
                }}
                >
                    {isPaused ? (<span>&#9655;</span>) : (<span>&#9553;</span>)}
                </div>
                <div className='next control'
                    onClick={() => props.onIdxChange(incrementIdx(props.currentSongIdx))}>
                    &#9659;&#9659;
                </div>
            </div>
            <div id={props.playerId} style={{ visibility: 'hidden' }}></div>
        </div>
    )
}

export default Player