import VueCookies from 'vue-cookies'
import {
    ACCESS_TOKEN
} from '@/store/mutation-types'

import { defineStore } from 'pinia'
const useUserStroe = defineStore('user', {
    state: () => ({
        token: '',
        roles: [],

    }),
    actions: {
        Login(userInfo) {
            return new Promise((reslove, reject) => {

                    const result = {code:200,data:{}};
                    if (result.code == 200) {
                        localStorage.userInfo = JSON.stringify(res.data)
                        VueCookies.set(ACCESS_TOKEN, result.data.token, 10 * 24 * 60 * 60 * 1000)
                        reslove(res)
                        return
                    }

                    reject(result)
                })
        },
        SET_ACCESS_TOKEN(token) {
            this.token = token
        },
        SET_ROLES(roles) {
            this.roles = roles
        },

        Logout() {
            return new Promise((reslove, reject) => {
                VueCookies.remove(ACCESS_TOKEN)
                sessionStorage.clear()
                localStorage.clear()
                location.reload()
            })
        }
    }
});


export default useUserStroe