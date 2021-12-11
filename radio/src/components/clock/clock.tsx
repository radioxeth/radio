import React, { useState } from 'react'

const Clock = () => {
    const [time, setTime] = useState<string>(new Date().toLocaleTimeString())
    window.setInterval(() => { setTime(new Date().toLocaleTimeString()) }, 1000)
    return (
        <div>
            {time}
        </div>
    )
}

export default Clock