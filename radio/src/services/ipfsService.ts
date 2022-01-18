import axios from "axios"

export const addFileListToIpfs = async (fileList: File[], playListName: string = 'playlist') => {
    const formData = new FormData()
    for (let i = 0; i < fileList.length; ++i) {
        formData.append('file', fileList[i], `${playListName}%2f${fileList[i].name}`)
    }
    const config = {
        headers: {
            'content-type': 'multipart/form-data; application/json; application/octet-stream',
        },
        query: {
            'wrap-with-directory': true
        }
    }
    try {
        const res = await axios.post(`http://127.0.0.1:5001/api/v0/add`, formData, config)
        if (res.data) {
            return res.data
        }
        else return {}
    }
    catch (e) {
        console.error(e)
        return null
    }
}

export const listFilesIpfs = async (directory: string = '/') => {
    const config = {
        headers: {
            'content-type': 'multipart/form-data; application/json; application/octet-stream',
        }
    }
    try {
        const res = await axios.post(`http://127.0.0.1:5001/api/v0/files/ls?arg=${directory}&long=true`)
        if (res.data) {
            return res.data
        }
        else return {}
    }
    catch (e) {
        console.error(e)
        return null
    }
}

export const listFileIpfs = async (directory: string = '/') => {
    const config = {
        headers: {
            'content-type': 'multipart/form-data; application/json; application/octet-stream',
        },
        query: {
            'wrap-with-directory': true
        }
    }
    try {
        const res = await axios.post(`http://127.0.0.1:5001/api/v0/files/ls?arg=${directory}&long=true`, config)
        if (res.data) {
            return res.data
        }
        else return {}
    }
    catch (e) {
        console.error(e)
        return null
    }

}