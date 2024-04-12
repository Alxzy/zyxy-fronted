//自定义实例默认值
import axios from "axios";
import {preprocessCSS} from "vite";

const isDev = process.env.NODE_ENV === 'development';
console.log(process.env.NODE_ENV);
const myAxios = axios.create({
    baseURL:isDev? 'http://localhost:9090/api':'https://zyxy-back.ai-haitham-gsim.icu/api',
    withCredentials: true, //表示跨域请求时是否需要使用凭证
});
// 可以带上 cookie
myAxios.defaults.withCredentials = true;
// 拦截器
// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log("请求发送了",config);
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    console.log("请求接收到了",response.data);
    // 未登录跳转到登录页面
    if(response?.data?.code === 40100){
        const redirectUrl = window.location.href;
        window.location.href = `/user/login?redirect=${redirectUrl}`;
    }
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default myAxios;