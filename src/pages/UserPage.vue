<template>
  <template v-if="user">
    <van-cell title="当前用户" :value="user?.username" />
    <van-cell icon="user-o" title="修改信息" is-link to="/user/update" />
    <van-cell icon="friends-o" title="我创建的队伍" is-link to="/user/team/create" />
    <van-cell icon="friends-o" title="我加入的队伍" is-link to="/user/team/join" />
    <van-cell icon="smile-comment-o" title="我收到的邀请" is-link to="/message"/>
    <div style="padding: 16px">
      <van-button type="danger" block style="margin-top: 30px" @click="toLogin">退出</van-button>
    </div>

  </template>



</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showConfirmDialog, showFailToast, showNotify, showSuccessToast} from "vant";
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

const toLogin = () => {
  showConfirmDialog({
    title: '退出',
    message:
        '确定要退出登录吗？',
  }).then(async () => {
    const res = await myAxios.post('/user/logout');
    if (res.code === 0){
      showSuccessToast({message: '退出成功', type: 'success', duration: 500, });
      router.replace('/user/login');
    }else {
      showNotify({message: res.description, type: 'danger', duration: 500, });
    }
  }).catch((err) => {});

}
</script>

<style scoped>

</style>