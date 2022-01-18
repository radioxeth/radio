import React, {
    useEffect,
    useState
} from 'react'
import { listFilesIpfs } from '../../services/ipfsService'

type Props = {
    path: string,
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
    const [pathStack, setPathStack] = useState<string[]>([])
    const [path, setPath] = useState<string>(props.path)
    const [entries, setEntries] = useState<Entry[]>([])
    const _handleForwardDirectoryClick = async (entry: Entry) => {
        if (entry.Type === 0) {

        } else {
            pathStack.push(entry.Name)
            setPathStack(pathStack)
            setPath(`/${pathStack.join('/')}`)
        }


    }

    const _handleBackDirectoryClick = async () => {
        console.log(path)
        if (pathStack.length > 0) {
            pathStack.pop()
            setPathStack(pathStack)
            setPath(`/${pathStack.join('/')}`)
        }
    }

    const _listFiles = async () => {
        console.log(path)
        const res = await listFilesIpfs(path)
        setEntries(res.Entries)
    }

    useEffect(() => {
        _listFiles()
    }, [path])

    const _renderDirectories = (directories: Entry[]) => {

        return directories.map((entry, idx) => {
            return (
                <li
                    className='list-item'
                    key={idx}
                    onClick={() => _handleForwardDirectoryClick(entry)}
                    id={`list-item-${idx}`}
                >
                    {entry.Name}
                </li>
            )
        })
    }

    return (
        <div className={`${props.darkMode ? 'dark' : 'light'}`} >
            <div className='list-container mt-100'>
                <div
                    className='list-directory'
                    onClick={() => _handleBackDirectoryClick()}
                >
                    {`/${pathStack.join('/')}<--`}
                </div>
                <ul className={`list ${props.darkMode ? 'dark' : 'light'}`}>
                    {
                        _renderDirectories(entries)
                    }
                </ul >
            </div>

        </div >
    )
}
export default IpfsDirectory