<template>
  <template v-if="user">
    <van-cell title="当前用户" :value="user?.username" />
    <van-cell title="修改信息" is-link to="/user/update" />
    <van-cell title="我创建的队伍" is-link to="/user/team/create" />
    <van-cell title="我加入的队伍" is-link to="/user/team/join" />
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