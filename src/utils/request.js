import axios from 'axios'
import {
  ACCESS_TOKEN
} from '@/store/mutation-types'
import {
  notification
} from 'ant-design-vue'
import VueCookies from 'vue-cookies'

const request = axios.create({
  baseURL: import.meta.env.VITE__APP_API_BASE_URL,
  timeout: 6000,
})
request.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8'
request.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'
//请求错误处理
const errorHandler = (error) => {
  // alert(0)
  const {
    response,
    msg
  } = error;
  notification.error({
    message: `提示`,
    description: msg || 'Error',
  });


}

//请求头同意处理
request.interceptors.request.use(config => {
  const token = VueCookies.get(ACCESS_TOKEN)
  if (token) {
    config.headers['LinkToken'] = token
  }
  return config
}, errorHandler)
//请求返回数据格式同意处理
request.interceptors.response.use(

  async (response) => {
    const res = response.data;
    const {
      code,
      token,
      msg
    } = res;

    // 自定义状态码验证
    //105 手机号重复返回的状态码
    //103身份证号码重复
    //104 邮箱重复
    //106登录名重复
    //10权限不足
    //3 无效token
    //"code":108,"msg":"角色键值重复"
    if (code !== 200 && code !== 105 && code !== 103 && code !== 104 && code !== 106 && code !== 10 && code !== 108) {
      console.log(response)
      notification.error({
        message: `提示`,
        duration: 2,
        description: msg || 'Error',
      });
      if (code == 3) {
        VueCookies.remove(ACCESS_TOKEN)
        sessionStorage.clear()
        localStorage.clear()
        location.reload()
      }


      return Promise.reject({
        response,
        message: msg,
      });
    }
    // 重置刷新token
    if (token) {
      await setToken(token);
    }

    return response.data;
  },
  /* error => {} */ // 已在 export default catch
);
export default request