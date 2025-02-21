/**
 * 向后端请求用户的菜单，动态生成路由
 */
import { routerMap } from '@/router/base'
import { renderAsyncRouter } from '@/router/generator-routers'
import { defineStore } from 'pinia'
const useAppStore = defineStore('app', {
    state: () => ({
        name: "",
        routers: [],
        addRouters: []
    }),
    actions: {
        
    }
});


export default useAppStore