<template>
  <template v-for="team in teamList">
    <van-card
        :thumb="team.createAvatarUrl"
        :desc="team.description"
        :title="`${team.name}`"
    >
      <template #tags>
        <div style="margin-top: 5px;">
          <van-tag plain type="danger">{{ teamStatusEnum[team.status] }}</van-tag>
        </div>
      </template>
      <template #footer>
        <van-button type="primary" plain size="small" @click="doAgree(team.id)">同意</van-button>
        <van-button type="danger" plain size="small" @click="doIgnore(team.id)">忽略</van-button>
      </template>
      <template #bottom>
        <div>
          {{ '队伍房主: ' + team.createUsername }}
        </div>
        <div>
          {{ `队伍人数: ${team.hasJoinNum}/${team.peopleNum}` }}
        </div>
        <div v-if="team.expireTime">
          {{ '过期时间: ' + team.expireTime }}
        </div>
        <div>
          {{ '创建时间: ' + team.createTime }}
        </div>
      </template>
    </van-card>
  </template>
  <van-empty image="search" v-if="teamList === null || teamList.length < 1" description="结果为空"/>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, Ref, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {teamStatusEnum} from "../constants/team.ts";
import {showFailToast, showNotify, showSuccessToast} from "vant";
import {TeamType} from "../models/team";
import {getCurrentUser} from "../services/user";

const router = useRouter();
const teamList: Ref<TeamType[]> = ref([])

onMounted(async () => {
  loadTeam();

})
/**
 * 加载收到的邀请
 */
const loadTeam = async () => {
  const res = await myAxios.get(`/invitation/my`);
  if (res.code === 0) {
    teamList.value = res.data
  }
}

/**
 * 同意
 */
const doAgree = async (teamId) => {
  const res = await myAxios.post(`/invitation/accept/${teamId}`);
  if (res.code === 0) {
    showSuccessToast('加入成功');
    location.reload();
  } else {
    showFailToast('加入失败');
    showNotify({message: res.description, type: 'danger'});
  }
}
/**
 * 忽略
 */
const doIgnore = async (teamId) => {
  const res = await myAxios.post(`/invitation/ignore/${teamId}`);
  if (res.code === 0) {
    showSuccessToast("已拒绝~");
    location.reload();
  } else {
    showFailToast("拒绝失败");
    showNotify({message: res.description, type: 'danger'});
  }
}

</script>

<style scoped>
:deep(.van-image__img) {
  height: 120px;
}
</style>