<template>
  <div>
    <a-menu mode="inline" theme="dark" v-model:selectedKeys="selectedKeys">
      <template v-for="item in menuTree" :key="item.path">
        <template v-if="!item.children">
          <a-menu-item :key="item.path" v-if="!item.hide">
            <template #icon>
              <PieChartOutlined />
            </template>
            <router-link :to="{ path: item.path }">{{ $t(item.name) }}</router-link>
          </a-menu-item>
        </template>
        <template v-else-if="item.hide">
          <a-menu-item :key="item.path">
            <template #icon>
              <PieChartOutlined />
            </template>
            <router-link :to="{ path: item.path }"> {{ $t(item.name) }} </router-link>
          </a-menu-item>
        </template>
        <template v-else>
          <child-menu :menu-info="item" :key="item.path" />
        </template>
      </template>
    </a-menu>
  </div>
</template>
<script setup>
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
locale.value = localStorage.locale;
console.log(locale.value)
</script>
<script>

import {
  defineComponent
} from "vue";

import { useAppStore } from "@/store"

const ChildMenu = {
  name: "ChildMenu",
  props: {
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  template: `
    <a-sub-menu :key="menuInfo.path" v-bind="$attrs">
      <template #title>
        <span>
         <component :is="$antIcons[menuInfo.icon]" /><span>{{ $t( menuInfo.name) }}</span>
        </span>
      </template>
      <template v-for="item in menuInfo.children" :key="item.path">
        <template v-if="!item.children">
          <a-menu-item :key="item.path" v-if="!item.hide">
                 <router-link :to="{path:item.path}"> {{ $t(item.name) }}</router-link>
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :menu-info="item" :key="item.path" />
        </template>
      </template>
    </a-sub-menu>
  `,
};
export default defineComponent({
  components: {
    "child-menu": ChildMenu,
  },
  data() {
    const store = useAppStore()
    const menuTree = store.addRouters;
    return {
      menuTree,
      collapsed: true,
      selectedKeys: [this.$route.path],
    };
  },
  watch: {
    $route: function (n, o) {
      this.$nextTick(() => {
        this.selectedKeys = [n.path];
      });
    },
  },
  mounted() {
    console.log("start")
    console.log(this.menuTree)
  },
  computed: {
  },
});
</script>