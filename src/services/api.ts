import axios from 'axios'

const api = axios.create({
    baseURL: "https://site-pessoal-api.onrender.com/"
})

export default api