import React from 'react'
import './style.css'


type Props = {
    checked: boolean,
    onChange: () => void,
    title?: string,
    label?: string
}
const Toggle = (props: Props) => {

    return (
        <label className="switch" title={props.title}>
            <input name='toggle' type="checkbox" checked={props.checked} onChange={props.onChange} />
            <span className="slider"></span>
        </label>

    )
}
export default Toggle