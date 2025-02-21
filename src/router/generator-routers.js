// eslint-disable-next-line

// 前端路由表
const constantRouterComponents = {
  // 基础页面 layout 必须引入
  BasicLayouts: () => import('@/layouts/BasicLayout'),
}

export const renderAsyncRouter = () => {
  return new Promise( reslove => { 
      const treeList = [];
      const renderRouter = treeMap(treeList)
      renderRouter.push({
        hide: true,
        name: '404',
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/Exception/404')
      },)
      reslove(renderRouter)
    })
  }

const treeMap = (menuTree) => {
  return menuTree.map(v => {
    const meta = v.meta || {
      title: v.name,
      hide: v.hide || false
    }
    const currentRouter = {
      path: v.path,
      name: v.name,
      component: (constantRouterComponents[v.component]),
      icon: v.icon || null,
      hide: v.hide || false,
      meta
    }
    // 重定向
    v.redirect && (currentRouter.redirect = v.redirect)
    if (v.children && v.children.length > 0) {
      currentRouter.children = treeMap(v.children)
    }
    console.log(currentRouter)
    return currentRouter
  })
}