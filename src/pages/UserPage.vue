<template>
  <template v-if="user">
    <van-cell title="昵称" is-link to="/user/edit" :value="user.username" @click="toEdit('username','昵称',user.username)"/>
    <van-cell title="账号" :value="user.userAccount"/>
    <van-cell title="头像" is-link to="/user/edit" @click="toEdit('avatarUrl','头像',user.avatarUrl)">
      <img style="height: 60px" :src="user.avatarUrl"/>
    </van-cell>
    <van-cell title="性别" is-link to="/user/edit" :value="user.gender" @click="toEdit('gender','性别',user.gender)"/>
    <van-cell title="电话" is-link to="/user/edit" :value="user.phone" @click="toEdit('phone','电话',user.phone)"/>
    <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" @click="toEdit('email','邮箱',user.email)"/>
    <van-cell title="星球编号" :value="user.planetCode"/>
    <van-cell title="注册时间" :value="user.createTime"/>
  </template>


</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user";

const router = useRouter();
const user = ref()

onMounted(async () => {
  //获取用户信息
  const res = await getCurrentUser();
  if (res){
    user.value = res;
    // showSuccessToast('获取用户信息成功');
  } else {
    showFailToast('获取用户信息失败')
  }
})

// const user = {
//   id: 100,
//   username: "cxk",
//   userAccount: "iiiiiiiiikun",
//   avatarUrl: "https://pic.rmb.bdstatic.com/bjh/0c7357538cdd115435fa3c563da5c64a.jpeg",
//   gender: "男",
//   phone: "21312412312",
//   email: "312321@sd.com",
//   planetCode:"1231",
//   createTime:new Date()
// }
// 创建方法跳转到用户信息修改页面跨页面传输数据
const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  });
}
</script>

<style scoped>

</style>