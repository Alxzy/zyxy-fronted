<template>
  <van-radio-group style="margin-top: 10px;" v-model="checked" v-for="team in myTeamList">
    <van-cell-group v-if="team.hasJoinNum !== team.peopleNum" inset>
      <van-cell :title="team.name" :value= "`队伍人数:  `+ team.hasJoinNum + `/` + team.peopleNum" clickable @click="checked=team.id">
        <template #right-icon>
          <van-radio :name="team.id"/>
        </template>
      </van-cell>
    </van-cell-group>
  </van-radio-group>
  <div style="margin-top: 20px;">
    <van-button round block type="primary" :disabled="checked === 0" @click="doInvite">
      邀请
    </van-button>
  </div>
</template>

<script  setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import myAxios from "../plugins/myAxios";
import {onMounted, ref} from "vue";
import {showFailToast, showNotify, showSuccessToast} from "vant";

const route = useRoute();
const router = useRouter();
const userId = route.query.userId;
const myTeamList = ref([]);
const checked = ref(0);

onMounted(() => {
  loadCircle();
})
/**
 * 加载队伍信息
 */
const loadCircle = async () => {
  const res = await myAxios.get('/team/list/my/create');
  if (res.code === 0) {
    myTeamList.value = res.data.records;
  } else {
    showFailToast('加载队伍失败');
    showNotify({message: res.description, type: 'danger'});
  }
}
/**
 * 邀请
 */
const doInvite = async () => {
  const res = await myAxios.post('/invitation/invite',{
    userId: userId,
    teamId: checked.value
  });
  if (res.code === 0){
    showSuccessToast("邀请成功");
    router.push('/')
  }else {
    showFailToast('邀请失败' + (res.description ? `，${res.description}` : ''));
  }
}
</script>

<style scoped>

</style>