import React, {
    useState
} from 'react'
import axios from 'axios'
const Finder = () => {
    const keyup = (event: any) => {
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault()
            // Trigger the button element with a click
            _find()
        }
    }

    const [path, setPath] = useState<string>('')
    const _handlePath = (value: string) => {
        if (value && value.length === 0) return

        if (value[0] !== '/') {
            value = '/' + value
        }
        setPath(value)
    }

    const _find = async () => {
        // This one works!!
        // const results = await get('https://bafybeicwmmb4fb2jixdb3heutczp2pvn5ht3dcvv4yzgtu7iadvd4luhly.ipfs.dweb.link/')


        const results = await axios.post(`http://127.0.0.1:5001/api/v0/files/ls?arg=${path}`)
        console.log(results)
    }
    return (
        <div>
            <input onKeyUp={(e) => { keyup(e) }} id='path-input' type='text' onChange={(e) => { _handlePath(e.target.value) }} />
            <button id='load-btn' disabled={path.length <= 0} onClick={() => { _find() }}>Load Playlist</button>
        </div>
    )
}

export default Finder