import axios from 'axios'

const Url = "https://localhost:5001/holidays/Authentication"


const authenticate = (userForAuth) => {
    const request = axios.post(Url, userForAuth)
    return request.then(response => response)
}

export default { authenticate }