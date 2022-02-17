import React, {
    useEffect,
    useState
} from 'react'
import { listFilesIpfs } from '../../services/ipfsService'

type Props = {
    path: string,
    entries: Entry[]
    onLoad: any
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
    const [directoryHash, setDirectoryHash] = useState<string>("")

    const _handleForwardDirectoryClick = async (entry: Entry) => {
        if (entry.Type === 0) {
            console.log(entry)
            props.onLoad(entry.Hash, `${path}/${entry.Name}`)
        } else {
            setDirectoryHash(entry.Hash)
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

    const _handleLoadDirectoryClick = async () => {
        console.log(directoryHash)
        console.log(path)
        props.onLoad(directoryHash, path)
    }

    const _listFiles = async () => {
        const res = await listFilesIpfs(path)
        if (res && res.Entries) {
            setEntries(res.Entries)
        }

    }

    useEffect(() => {
        _listFiles()
    }, [path])

    const _renderDirectories = (directories: Entry[]) => {

        return directories.map((entry, idx) => {
            return (
                <li
                    className={`list-item ${entry.Type === 1 ? 'file-item' : 'data-item'}`}
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
        <div className='list-container'>
            <div className='list-directory-header'>
                <div
                    className='list-directory-end left'
                >
                    <span onClick={() => _handleBackDirectoryClick()}>&#8617;</span>
                </div>
                <div
                    className='list-directory-current'
                >
                    &#x1F4C1;<i>{`${pathStack.length > 0 ? pathStack[pathStack.length - 1] : '/'}`}</i>
                </div>
                <div
                    className='list-directory-end right'
                    onClick={() => _handleLoadDirectoryClick()}
                >
                    Load
                </div>
            </div>
            <ul className='list'>
                {
                    _renderDirectories(entries)
                }
            </ul >
        </div>
    )
}
export default IpfsDirectory