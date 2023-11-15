import axios from "axios"

const baseUrl = "https://localhost:5001/holidays/HolidayProperties"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newHolidayProperty => {
    
    return axios.post(baseUrl, newHolidayProperty)
}

const remove = id => {
    
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (object) => {
    
    return axios.put(`${baseUrl}/${object.propertyId}`, object)
}

export default { getAll, create, remove, update }