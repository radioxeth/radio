import React, { useState } from 'react'
const Clock = () => {
    const getTime = () => {
        const date = new Date()
        const hour = date.getHours()
        const minute = date.getMinutes()
        return `${hour % 12 === 0 ? 12 : hour % 12}:${minute < 10 ? '0' + minute : minute} ${hour >= 12 ? 'PM' : 'AM'}`
    }
    const [time, setTime] = useState<string>(getTime())
    window.setInterval(() => { setTime(getTime()) }, 1000)
    return (
        <label className='time'>
            {time}
        </label>
    )
}

export default Clock