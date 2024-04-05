import { createApp } from 'vue'
import App from './App.vue'
// 引入组件
import Vant from 'vant';
// 路由
// 引入路由
import routes from "./config/routers";
import * as VueRouter from 'vue-router';
import '../global.css'
import axios from 'axios'

// 全局设置 axios 发送请求带上cookie
axios.defaults.withCredentials = true

const app = createApp(App)

const router = VueRouter.createRouter({
    // 内部提供了 history 模式的实现。
    // history: VueRouter.createWebHashHistory(),
    // 想使用登录拦截跳转 需要使用下面的 history工具
    history: VueRouter.createWebHistory(),
    routes, // `routes: routes` 的缩写
});


app.use(Vant);
app.use(router);
// 挂载
app.mount('#app')
