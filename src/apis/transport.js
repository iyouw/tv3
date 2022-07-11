import axios from 'axios'

const transport  = axios.create({
    baseURL:'http://localhost:8096/api',
    withCredentials: false,
    timeout: 1 * 1000 * 60 * 5 
})

transport.interceptors.response.use(res=>{
    const data = res.data
    if(data.code != 200){
        throw new Error(data.message)
    }
    return data.data
},
err=>{
    throw err
})

export default transport