<template>
  <van-card
      class="user"
      v-for="user in userList"
      :tag="`标记`"
      :title="user.username"
      :thumb="user.avatarUrl"
      :desc="user.profile"

  >


    <template #tags>
      <van-tag plain v-for="tag in user.tags" style="margin-right: 8px; margin-top: 8px" type="primary">
        {{ tag }}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini">关注</van-button>
      <van-button size="mini">联系我</van-button>
    </template>
  </van-card>

  <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空" />
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router'
import {onMounted, ref} from "vue";
import myAxios from '../plugins/myAxios.ts'
import {Toast} from "vant";
import qs from 'qs';

const route = useRoute();
console.log(route.query)
const tags = route.query;


const userList = ref([]);
// 挂载前获取数据
onMounted(async () => {
  // 上面的请求也可以这样做
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagsList: tags.tags
    },
    // 序列化
    paramsSerializer: {
      serialize: params => qs.stringify(params, {indices: false}),
    }
  })
      .then(function (response) {
        console.log('/user/search/tags success', response);
        console.log(response);
        return response.data;
      })
      .catch(function (error) {
        console.log('/user/search/tags fail', error);
      });
  console.log(userListData);
  if(userListData){
    userListData.forEach(user =>{
      if (user.tags){
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
})

// 模拟用户数据
// const mockUser = ref({
//   id: 100,
//   username: "cxk",
//   userAccount: "iiiiiiiiikun",
//   avatarUrl: "https://pic.rmb.bdstatic.com/bjh/0c7357538cdd115435fa3c563da5c64a.jpeg",
//   gender: "男",
//   phone: "21312412312",
//   email: "312321@sd.com",
//   planetCode: "1231",
//   profile: "大家好，我是练习时长两年半的个人练习生蔡徐坤，喜欢唱跳rap篮球",
//   tags: ["java", "python", "emo", "steam", "lol", "社畜", "打工人", "二次元"],
//   createTime: new Date()
// });
</script>

<style scoped lang="css">


</style>