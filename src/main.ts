import { createApp } from 'vue'
import App from './App.vue'
// 引入组件
import Vant from 'vant';
// 路由
// 引入路由
import routes from "./config/routers";
import * as VueRouter from 'vue-router';



const app = createApp(App)

const router = VueRouter.createRouter({
    // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
});


app.use(Vant);
app.use(router);
// 挂载
app.mount('#app')
