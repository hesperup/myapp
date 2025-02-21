// 按钮权限
export function getRoleButton(type){
  if(localStorage.routes){
  const routesAll= JSON.parse(localStorage.routes)
  const all=[]
  let role=[]
  routesAll.forEach(item => {
    if (item.children) {
      item.children.forEach(t => {
        all.push(t)
      });
    } else {
      all.push(item)
    }
  });
  console.log(all)

  all.forEach(e => {
    if (e.component == type) {
      role= e.roles
    }
  })
  console.log(role)
return role
}

}