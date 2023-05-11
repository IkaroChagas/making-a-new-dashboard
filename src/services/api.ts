import axios from 'axios'
const apiUrl = import.meta.env.VITER_API_URL;

const api = axios.create({
    baseURL: apiUrl,
})

export default api