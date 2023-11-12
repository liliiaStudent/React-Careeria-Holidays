import axios from "axios";

const baseUrl = "https://localhost:5001/holidays/Reservations"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newReservation => {
    return axios.post(baseUrl, newReservation)
}
//eslint-disable-next-line
const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (object) => {
    return axios.put(`${baseUrl}/${object.reservationId}`, object)
}

export default {getAll, create, remove, update}