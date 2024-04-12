<template>
  <van-card
      class="user"
      v-for="user in props.userList"
      :title="user.username"
      :thumb="user.avatarUrl===null?defaultAvatar:user.avatarUrl"
      :desc="user.profile"

  >


    <template #tags>
      <van-tag plain v-for="tag in user.tags" style="margin-right: 8px; margin-top: 8px" type="primary">
        {{ tag }}
      </van-tag>
    </template>
    <template #footer>
<!--      <van-button size="mini">关注</van-button>-->
<!--      <van-button size="mini">联系我</van-button>-->
      <van-button type="primary" plain size="small"
                  @click="toCircleInvite(user.id)">邀请
      </van-button>
    </template>
  </van-card>
</template>

<script setup lang="ts">
import {UserType} from '../models/user'
import {defineProps, onMounted, ref, withDefaults} from "vue";
import {getCurrentUser} from "../services/user";
import defaultAvatar from "../assets/ikun.webp"
import myAxios from "../plugins/myAxios";
import {useRouter} from "vue-router";
const currentUser = ref();
const currentUserId = ref(0);
const router = useRouter();
// 定义接口
interface UserCardListProps{
  userList:  UserType[];
}

// 设置属性
const props = withDefaults(defineProps<UserCardListProps>(),{
    userList: [] as UserType[],
});

onMounted(async () => {
  const currentUser = await getCurrentUser();
  currentUserId.value = currentUser.id;
})
// 邀请 则跳转页面
const toCircleInvite = (userId) => {
  router.push({
    path: '/team/invite',
    query: {
      userId: userId
    }
  })
}
</script>

<style scoped>
:deep(.van-image__img) {
  height: 110px;
}
</style>