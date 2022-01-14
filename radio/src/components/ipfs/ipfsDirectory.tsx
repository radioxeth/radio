import React, {
    useState
} from 'react'
import { listFilesIpfs } from '../../services/ipfsService'

type Props = {
    path: string,
    prevPath: string | null,
    darkMode: boolean,
    entries: Entry[]
}
type Entry = {
    Name: string,
    Type: number,
    Size: number,
    Hash: string
}
const IpfsDirectory = (props: Props) => {
    const data = { "Entries": [{ "Name": "Distro Radio 0.1.0", "Type": 0, "Size": 0, "Hash": "" }, { "Name": "Vacuum", "Type": 0, "Size": 0, "Hash": "" }, { "Name": "helloWorld", "Type": 0, "Size": 0, "Hash": "" }, { "Name": "minted Vacuum metadata", "Type": 0, "Size": 0, "Hash": "" }] }
    const [path, setPath] = useState<string>(props.path)
    const [prevPath, setPrevPath] = useState<string | null>(props.prevPath)
    const _handleDirectoryClick = async (entry: Entry) => {
        const res = await listFilesIpfs(`${props.path}${entry.Name}`)
        console.log(res)
    }
    return (
        <div className='mt-20'>
            <ul className={`list ${props.darkMode ? 'dark' : 'light'} mt-100`}>
                {
                    data.Entries.map((entry, idx) => {
                        return (
                            <li
                                className='list-item'
                                key={idx}
                                onClick={() => _handleDirectoryClick(entry)}
                                id={`list - item - ${idx}`}
                            >
                                {entry.Name}
                            </li>
                        )
                    })
                }
            </ul >
        </div>
    )
}
export default IpfsDirectory