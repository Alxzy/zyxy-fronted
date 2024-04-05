<template>
  <van-form @submit="onSubmit">


    <van-field
        v-if="editUser.editKey !='gender' && editUser.editKey !='tags' && editUser.editKey !='avatar' && editUser.editKey !='profile'"
        v-model="editUser.currentValue"
        :name="editUser.editKey"
        :label="editUser.editName"
        :placeholder="`请输入${editUser.editName}`"
    />
    <van-cell-group>
      <van-field
          v-if="editUser.editKey =='profile'"
          v-model="editUser.currentValue"
          label="自我介绍"
          type="textarea"
          autosize
          rows="3"
          placeholder="请输入自我介绍"
      />
    </van-cell-group>
    <!--   修改性别 -->
    <van-radio-group style="padding: 10px; margin: 10px;" v-if="editUser.editKey =='gender'"
                     v-model="editUser.currentValue" direction="horizontal">
      <van-radio name="0">男</van-radio>
      <van-radio name="1">女</van-radio>
    </van-radio-group>

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
import {showFailToast, showSuccessToast} from "vant";
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

  if (!currentUser) {
    showFailToast('用户未登录')
    return;
  }
  // 将 editKey、currentValue 提交给后端
  const res = await myAxios.put(
      '/user/update', {
        'id': currentUser.id,
        [editUser.value.editKey]: editUser.value.currentValue,
      }).then(function (response) {
    return response;
  })
      .catch(function (error) {
        console.log('/tag/get/category fail', error);

      });
    console.log(res);
  if (res?.code === 0) {
    showSuccessToast('操作成功');
  } else {
    showFailToast('操作失败' + (res.description ? `，${res.description}` : ''));
  }
};
</script>

<style scoped>

</style>