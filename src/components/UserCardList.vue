<template>
  <van-card
      class="user"
      v-for="user in props.userList"
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
</template>

<script setup lang="ts">
import {UserType} from '../models/user'
import {defineProps, withDefaults} from "vue";
// 定义接口
interface UserCardListProps{
  userList:  UserType[];
}

// 设置属性
const props = withDefaults(defineProps<UserCardListProps>(),{
    userList: [] as UserType[],
});

</script>

<style scoped>

</style>