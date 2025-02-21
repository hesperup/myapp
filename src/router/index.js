import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import {
  routerMap
} from './base'

const router = createRouter({
  mode: 'hash',
  history: createWebHashHistory(),
  routes: routerMap
})


export default router