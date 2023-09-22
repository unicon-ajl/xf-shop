// 对axios的二次封装    请求方式
import axios from 'axios'

import { Toast,Notify } from 'vant'

import router from '../router/index'


let http = axios.create({
    // npm run serve       NODE_ENV : 'development'   开发环境
    // npm run build       NODE_ENV : 'production'    生产环境
    baseURL: process.env.NODE_ENV == 'production' ? 'http://backend-api-01.newbee.ltd/api/v1' : '/api/v1'
})

// 添加请求拦截器
http.interceptors.request.use(config => {

    // 请求之前，去取令牌
    config.headers.token = localStorage.getItem("xftoken")
    return config
}, error => {
    // 请求失败，返回一个失败的promise
    return Promise.reject(error);
})

// 添加响应拦截器
http.interceptors.response.use((response) => {
    // 响应数据
    let data = response.data;
    if (data.resultCode != 200) {
        // 登录失败：用户已存在，登陆失败（密码错误时），请输入正确的手机号
        // 注册失败：请输入正确的手机号
        // 添加购物车，添加的商品在购物车中已存在
        // Notify({ type: 'danger', message: data.message });
        Toast.fail(data.message);
    }
    if(data.resultCode === 416){
        // 说明没有登录，要从商品详情页放到登陆页面，query传参做一个判断，登录之后还要返回商品详情页
        router.push("/login?needback=1")
    }
    return response.data
}, error => {
    // 响应失败，给出提示并返回一个失败的promise
    Notify({ type: 'danger', message: '系统繁忙' });
    return Promise.reject(error);
})


export default http