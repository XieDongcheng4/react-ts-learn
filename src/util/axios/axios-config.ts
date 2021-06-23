import axios from 'axios'

const service = axios.create({
    baseURL: '',
    timeout: 2500
})
service.interceptors.request.use(config => {
    return config;
}, error => {
    return Promise.reject(error)
})


service.interceptors.response.use(res => {
    return res.data.result
}, error => {
    return Promise.reject(error)
})
export default service
