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

export const getFilesStat = async (filePath: string) => {
    const config = {
        headers: {
            'content-type': 'multipart/form-data; application/json; application/octet-stream',
        }
    }
    try {
        console.log(filePath)
        const res = await axios.post(`http://127.0.0.1:5001/api/v0/files/stat?arg=${filePath}`, config)
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

export const getDirectory = async (directoryHash: string, playListName: string = 'playlist') => {
    const config = {
        headers: {
            'content-type': 'blob'
        }
    }
    try {
        const res = await axios.post(`http://127.0.0.1:5001/api/v0/get?arg=${directoryHash}&archive=false`, config)
        if (res.data) {
            return res
        }
        else return {}
    }
    catch (e) {
        console.error(e)
        return null
    }
}

export const listFilesIpfs = async (directory: string = '/') => {
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

export const catCid = async (hash: string, filename: string) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'audio/mpeg',
                'Content-Disposition': filename,
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive'
            }
        }
        const res = await axios.post(`http://127.0.0.1:5001/api/v0/get?arg=${hash}`, config)
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

export const readFile = async (filePath: string, filename: string) => {
    try {
        const url = `http://127.0.0.1:5001/api/v0/files/read?arg=${filePath}/${filename}`
        const results = await makeRequest('POST', url)
        return results
    }
    catch (e) {
        console.error(e)
        return null
    }
}

const makeRequest = async (method, url) => {
    return new Promise<ArrayBuffer>((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'arraybuffer'
        xhr.open(method, url);
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = () => {
            reject({
                status: xhr.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
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