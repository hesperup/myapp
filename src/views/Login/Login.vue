<template>
  <div class="user-layout">
    <div class="lang">
      <img src="../../assets/image/c.png" v-if="changeLang" @click="change('zh')" />
      <img src="../../assets/image/en.png" v-else @click="change('en')" />
    </div>

    <div class="main">
      <h1 class="title">{{ $t("login.title") }}</h1>
      <a-form :wrapper-col="{ span: 24 }" :rules="rules" ref="formRef" :model="modelRef">
        <a-form-item label="" name="userName">
          <a-input v-model:value="modelRef.userName" @keyup.enter="onSubmit"
            :placeholder="$t('login.form-item-username')">
            <template #prefix>
              <user-outlined /></template>
          </a-input>
        </a-form-item>
        <a-form-item label="" name="passWord">
          <a-input-password v-model:value="modelRef.passWord" @keyup.enter="onSubmit"
            :placeholder="$t('login.form-item-password')">
            <template #prefix>
              <unlock-outlined /></template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button style="border-color: #326894; background: #326894" type="primary" class="submit" @click="onSubmit"
            :loading="submitLoading">
            {{ $t("login.btn-submit") }}
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import {
  useI18n
} from "vue-i18n";
import {
  onMounted,
  ref
} from "vue";
import {
  useUserStore
} from "@/store";
import {
  useRouter
} from "vue-router";
const store = useUserStore();
const {
  locale, t
} = useI18n();

const router = useRouter();
const modelRef = ref({
  userName: "",
  passWord: "",
});
const formRef = ref()
const changeLang = ref(false)
const rules = ref({})

const loading = ref();

function change(type) {
  if (type == 'en') {
    changeLang.value = true
  } else {
    changeLang.value = false

  }
  locale.value = type;
  localStorage.locale = type;

}
const onSubmit = () => {
        loading.value = true;
        
};
onMounted(() => {
  locale.value = 'zh';
  localStorage.locale = 'zh';
  rules.value = {
    userName: [{
      required: true,
      message: t('login.form-item-username'),
    },],
    passWord: [{
      required: true,
      message: t('login.form-item-password'),
    },],
  };

})
//  return { change }
</script>
<style lang="less" scoped>
.main {
  flex: none;
  width: 320px;
  padding: 36px;
  margin: 0 auto;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.2);

  .title {
    font-size: 28px;
    margin-top: 0;
    margin-bottom: 30px;
    text-align: center;
    color: #ffffff;
  }

  .submit {
    width: 100%;
  }
}

.user-layout {
  display: flex;
  width: 100%;
  height: 100vh;
  min-height: 500px;
  overflow: auto;
  background-color: #195388;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
  align-items: center;

  .lang {
    cursor: pointer;

    div {
      color: #ddd;
    }

    display: flex;
    position: absolute;
    top: 30px;
    right: 50px;
    color: #ffffff;
    font-size: 16px;
  }
}
</style>