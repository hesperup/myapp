import axios from 'axios'
import {
    message,
    notification
} from 'ant-design-vue'

const localRequest = axios.create({
    baseURL: import.meta.env.VITE__APP_API_LOCAL_URL,
    timeout: 6000,
})

localRequest.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8'
localRequest.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'
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


//请求返回数据格式同意处理
localRequest.interceptors.response.use(

    async (response) => {
        const res = response.data;
        const {
            code,
            msg
        } = res;
        if (code !== 200) {
            // console.log(response)
            // notification.error({
            //     message: `提示`,
            //     description: msg || 'Error',
            // });
            return Promise.reject({
                response,
                message: msg,
            });
        }
        return response.data;
    },
    /* error => {} */ // 已在 export default catch
);
export default localRequest