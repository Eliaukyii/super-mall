import axios from 'axios'

export function request(config) {
   //创建axios实例
    const instance = axios.create({
        baseURL:"http://152.136.185.210:7878/api/hy66",
        timeout:5000
    })

    //拦截器
    instance.interceptors.request.use(config=>{
        return config
    },err=>{
        console.log(err);
    })
     instance.interceptors.response
    //发送真正的网络请求
    return instance(config)
  }