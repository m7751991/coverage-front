import axios from 'axios';
import { ElLoading } from 'element-plus'
import { ElMessage } from 'element-plus'

let loadingObj=null

const Service=axios.create({
    timeout:8000,
    baseURL:"http://localhost:3199/",
    headers:{
        "Content-type":"application/json;charset=utf-8"
    }
    
})
//请求拦截-增加loading，对请求进行统一的处理
Service.interceptors.request.use(config=>{
    loadingObj=ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })

      return config
})

//响应拦截--对返回值做统一处理
Service.interceptors.response.use(response=>{
    loadingObj.close()
    return response.data
},err=>{
    loadingObj.close()
    ElMessage({
        message:"服务器错误",
        type:"error",
        duration:2000

    })
})

//post请求
export const post=(url,data,config)=>{
    return Service({
        ...config,
        url,
        method:"post",
        data:data
    })
}


//get请求
export const get=(url,data,config)=>{
    return Service({
        ...config,
        url,
        method:"get",
        data:data

    })
}