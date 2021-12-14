import React from 'react'
import get from 'axios'
const Finder = () => {

    const _find = async () => {
        const results = await get('https://ipfs.io/ipfs/QmWtjkAHtCPkefdYQHfHihiKnfjD2QY5MfJ7ukm5PiC6jB/')
        console.log(results)
    }
    return (
        <div><button onClick={() => { _find() }}>finder</button></div>
    )
}

export default Finder