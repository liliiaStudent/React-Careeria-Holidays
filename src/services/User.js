import axios from "axios";

const baseUrl = "https://localhost:5001/holidays/Users"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newUser => {
    return axios.post(baseUrl, newUser)
}
//eslint-disable-next-line
const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (object) => {
    return axios.put(`${baseUrl}/${object.userId}`, object)
}

export default {getAll, create, remove, update}