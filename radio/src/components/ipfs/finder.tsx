import React from 'react'
import get from 'axios'
const Finder = () => {

    const _find = async () => {
        // const results = await get('http://127.0.0.1:5001/ipfs/QmWtjkAHtCPkefdYQHfHihiKnfjD2QY5MfJ7ukm5PiC6jB')
        //const results = await get('http://QmWtjkAHtCPkefdYQHfHihiKnfjD2QY5MfJ7ukm5PiC6jB.ipfs.localhost:8080/')

        //console.log(results)
    }
    return (
        <div><button onClick={() => { _find() }}>finder</button></div>
    )
}

export default Finder