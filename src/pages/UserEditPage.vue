<template>
  <van-form @submit="onSubmit">


    <van-field
        v-model="editUser.currentValue"
        :name="editUser.editName"
        :label="editUser.editName"
        :placeholder="`请输入${editUser.editName}`"
        :rules="[{ required: true, message: '请填写密码' }]"
    />

    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router'

const route = useRoute();
import {ref} from 'vue';
import myAxios from "../plugins/myAxios";
import {showFailToast} from "vant";
import {getCurrentUser} from "../services/user";

// 接收参数并初始化
const editUser = ref({
  editKey: route.query.editKey,
  editName: route.query.editName,
  currentValue: route.query.currentValue,
});

const onSubmit = async () => {
  //获取用户信息
  const currentUser = await getCurrentUser();

  if (!currentUser){
    showFailToast('用户未登录')
    return;
  }
  // 将 editKey、currentValue 提交给后端
  const res = await myAxios.put(
      '/user/update', {
        'id': currentUser.id,
        [editUser.value.editKey]: editUser.value.currentValue,
      });
  console.log(res,' 请求响应');

};
</script>

<style scoped>

</style>