import axios from 'axios'

const transport  = axios.create({
    baseURL:'',
    withCredentials: true,
    timeout: 1 * 1000 * 60 * 5 
})

transport.interceptors.response.use(res=>{
    const data = res.data
    if(data.code != 200){
        Promise.reject(data.message)
    }
    return data.data
},
err=>{
    Promise.reject(err)
})

export default transport