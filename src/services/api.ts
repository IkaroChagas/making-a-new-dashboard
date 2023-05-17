import axios from 'axios'

const api = axios.create({
    baseURL: "https://json-server-jexi.onrender.com",
})

export default api