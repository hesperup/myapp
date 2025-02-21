<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible id="components-layout-demo-side">
      <template #trigger>
        <MenuFoldOutlined v-show="collapsed" />
        <MenuUnfoldOutlined v-show="!collapsed" />
      </template>
      <div class="logo">
        <!-- <img src="https://store.antdv.com/pro/preview/img/logo.59818776.png" /> -->
        <span>数据平台</span>
      </div>
      <s-menu></s-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0;display:flex;justify-content: space-between;"
        class="layout-header">
        <div class="trigger">
          <MenuFoldOutlined v-if="collapsed" @click="collapsed = !collapsed"
            :style="{ fontSize: '20px', cursor: 'pointer' }" />
          <MenuUnfoldOutlined @click="collapsed = !collapsed" :style="{ fontSize: '20px', cursor: 'pointer' }" v-else />
        </div>
        <div style="padding-right:30px;display:flex">
          <div style="padding-right:30px;">
            <a-dropdown>
              <a class="ant-dropdown-link" @click.prevent>
                {{ user }}
                <DownOutlined />
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item @click="showModal">
                    <a>修改密码</a>
                  </a-menu-item>
                  <a-menu-item @click="loginOut">
                    <a>退出</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
          <div>

          </div>
        </div>
      </a-layout-header>
      <a-layout-content :style="{ backgroundColor: '#fff' }">
        <s-tab></s-tab>
        <div :style="{ background: '#fff', minHeight: '360px' }">
          <router-view></router-view>
        </div>
      </a-layout-content>

      <a-modal v-model:visible="visible" :title="$t('public.editPwd')" @cancel="handleOk">
        <template #footer>
          <a-button key="back" @click="() => handleOk()">{{ $t('public.cancel') }}</a-button>
          <a-button key="submit" type="primary" :loading="onSubmitLoading" @click="onFinish">{{ $t('public.ok') }}
          </a-button>
        </template>
        <a-form :label-col="labelCol" :wrapper-col="{ span: 20 }" :rules="rulesRef" ref="formRef" :model="modelRef">
          <a-form-item :label="$t('public.password')" name="password">
            <a-input v-model:value="modelRef.password" :placeholder="$t('public.input')" autocomplete="off" />
          </a-form-item>
        </a-form>
      </a-modal>

    </a-layout>
  </a-layout>
</template>
<script setup>
import {
  onBeforeMount,
  reactive,
  ref
} from "vue";
import SMenu from "@/components/Menu/Menu";
import STab from "@/components/MultiTab/MultiTab";
import {
  useRouter
} from "vue-router";
import VueCookies from 'vue-cookies'
import {
  ACCESS_TOKEN
} from '@/store/mutation-types'
const router = useRouter();
const collapsed = ref(false)
const ifshow = ref(false)
const visible = ref(false);
const user = localStorage.userInfo ? JSON.parse(localStorage.userInfo).userRelName : ''
function loginOut() {
  VueCookies.remove(ACCESS_TOKEN)
  sessionStorage.clear()
  localStorage.clear()
  location.reload()
}

const showModal = () => {
  visible.value = true;
};

const handleOk = e => {
  modelRef.password = ''
  visible.value = false;
};
const modelRef = reactive({
  userId: localStorage.userInfo ? JSON.parse(localStorage.userInfo).userId : '',
  status: 1,
  password: ''
})
const formRef = ref()
// 表单验证
const rulesRef = reactive({
  password: [{
    required: true,
    message: '请输入'
  }],
});

// 修改密码
function onFinish() {
  
}

onBeforeMount(() => {
  // console.log(`the component is now mounted.`)
  if (!localStorage.userInfo) {
    VueCookies.remove(ACCESS_TOKEN)
    sessionStorage.clear()
    localStorage.clear()
    location.reload()
  }
})

</script>
<style scoped lang="less">
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;

  // overflow: hidden;
  // white-space: nowrap;
  // text-overflow: ellipsis;
  img {
    height: 32px;
  }

  span {
    color: #fff;
  }
}

.layout-header {
  border-bottom: 1px solid #f0f0f0;

  .trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 16px;
    width: 40px;
    height: 100%;
  }
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>