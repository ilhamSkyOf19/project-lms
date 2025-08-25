import axios from 'axios';


const AXIOS = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "",
    timeout: 3000,
    withCredentials: true
})


export default AXIOS;