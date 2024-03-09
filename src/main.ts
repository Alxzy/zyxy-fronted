import { createApp } from 'vue'
import App from './App.vue'
// 以下均为按需引入的步骤
// 1.引入组件
import {Button} from "vant";
import { NavBar } from 'vant';
// 2.引入组件样式
import 'vant/lib/index.css';

const app = createApp(App);
// 3.注解要使用的组件
app.use(Button);
app.use(NavBar);

// 挂载
app.mount('#app')
