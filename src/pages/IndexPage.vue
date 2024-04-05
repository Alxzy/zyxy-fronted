<template>
  <van-cell center title="密友模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode" size="24"/>
    </template>
  </van-cell>
  <user-card-list :user-list="userList"/>
  <van-empty v-if="!userList || userList.length < 1" description="啊哦，出错了！"/>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router'
import {onMounted, ref, watchEffect} from "vue";
import myAxios from '../plugins/myAxios.ts'
import qs from 'qs';
import UserCardList from "../components/UserCardList.vue";
import {showFailToast} from "vant";

const route = useRoute();
console.log(route.query)
const tags = route.query;
// 模式
const isMatchMode = ref<boolean>(false);
// loading骨架屏
const loading = ref(true);
const userList = ref([]);

/**
 * 加载数据
 */
const loadData = async () => {
  let userListData;
  loading.value = true;
  // 密友模式，根据标签匹配用户
  // vue的响应变量需要使用 value
  if (isMatchMode.value) {
    const num = 10;
    userListData = await myAxios.get('/user/match', {
      params: {
        num,
      },
    })
        .then(function (response) {
          console.log('/user/match succeed', response);
          return response?.data.records;
        })
        .catch(function (error) {
          console.error('/user/match error', error);
          showFailToast('请求失败');
        })
  } else {
    // 普通模式，直接分页查询用户
    userListData = await myAxios.get('/user/recommend', {
      params: {
        pageSize: 1,
        pageNum: 10,
      },
      // 序列化
      paramsSerializer: {
        serialize: params => qs.stringify(params, {indices: false}),
      }
    })
        .then(function (response) {
          console.log('/user/recommend success', response);
          console.log(response.data.records);
          return response.data.records;
        })
        .catch(function (error) {
          console.log('/user/recommend fail', error);
          showFailToast('请求失败');
        });
  }
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
  loading.value = false;
}

/**
 * 钩子函数
 * switch模式改变则重新获取数据
 */
watchEffect(() => {
  loadData();
})


</script>

<style scoped lang="css">


</style>