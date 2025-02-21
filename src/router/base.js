import LoginView from '@/layouts/LoginLayout'

/**
 * 基础路由
 * @type { *[] }
 */

export const routerMap = [
    {
        path: '/loginview',
        component: LoginView,
        redirect: '/login',
        children: [
            {
                path: '/login',
                name: 'login',
                component: () => import('@/views/Login/Login'),
                meta: { title: '登录' }
            },
        ]
    },
    {
        path: '/',
        component: LoginView,
        redirect: '/',
        children: [
            {
                path: '/',
                name: 'login',
                component: () => import('@/views/Login/Login'),
                meta: { title: '登录' }
            },
        ]
    },

]





export const asyncRouter = [

]