<template>
  <van-nav-bar
      :title="title"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>

  <div id="content">

    <router-view />
  </div>


  <van-tabbar route @change="onChange">
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/user" icon="search" name="user" dot>个人</van-tabbar-item>
    <van-tabbar-item to="/team" icon="friends-o" name="team" badge="5">队伍</van-tabbar-item>
    <van-tabbar-item to="/message" icon="setting-o" name="message" badge="20">消息</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">


import { ref } from 'vue';
import {useRoute, useRouter} from "vue-router";
import routes from "../config/routers.ts";
const DEFAULT_TITLE = '只因寻友';
const title = ref(DEFAULT_TITLE);

const router = useRouter();

/**
 * 根据路由切换标题
 */
router.beforeEach((to, from) => {
  const toPath = to.path;
  const route = routes.find((route) => {
    return toPath == route.path;
  })
  title.value = route?.title ?? DEFAULT_TITLE;
})





const onClickLeft = () => {
  router.back();
};
const onClickRight = () =>{// 搜索页
  router.push('/search');
} ;
// 默认在主页
const active = ref('index');
</script>

<style scoped>
#content {
  padding-bottom: 75px;
}
</style>