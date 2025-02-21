import { init } from "@neutralinojs/lib"

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from "./locales"; // 引入
import Antd from './utils/antd_lazy'
import 'ant-design-vue/dist/antd.css';
import OverallMethod from "./core/overall";  //自定义封装全局方法



const app = createApp(App)

app.use(store).use(router).use(Antd).use(i18n).use(OverallMethod).mount('#app')


init(); // Add this function call
