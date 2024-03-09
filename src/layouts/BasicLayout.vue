<template>
  <van-nav-bar
      title="标题"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>

  <div id="content">
<!--    <template v-if="active === 'index'">-->
<!--      <Index/>-->
<!--    </template>-->
<!--    <template v-if="active === 'team'">-->
<!--      <Team/>-->
<!--    </template>-->
<!--    路由-->
    <router-view />
  </div>


  <van-tabbar v-model="active" @change="onChange">
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/user" icon="search" name="user" dot>个人</van-tabbar-item>
    <van-tabbar-item to="/team" icon="friends-o" name="team" badge="5">队伍</van-tabbar-item>
    <van-tabbar-item to="/message" icon="setting-o" name="message" badge="20">消息</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>

import { ref } from 'vue';
import { showToast } from 'vant';
import {useRouter} from "vue-router";

const router = useRouter();

const onClickLeft = () => {
  router.back();
};
const onClickRight = () =>{// 搜索页
  router.push('/search');
} ;
// 默认在主页
const active = ref('index');
const onChange = (index) => showToast(`标签 ${index}`);
</script>

<style scoped>

</style>