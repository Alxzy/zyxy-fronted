<template>
  <van-form @submit="onSubmit">


    <van-field
        v-model="editUser.currentValue"
        :name="editUser.editName"
        :label="editUser.editKey"
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

// 接收参数并初始化
const editUser = ref({
  editKey: route.query.editKey,
  editName: route.query.editName,
  currentValue: route.query.currentValue,
});

const onSubmit = (values) => {
  // todo 将 editKey、currentValue 提交给后端
  console.log('onSubmit=', values);
};
</script>

<style scoped>

</style>