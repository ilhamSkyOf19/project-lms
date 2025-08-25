import axios from 'axios';


const AXIOS = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "",
    timeout: 3000
})


export default AXIOS;