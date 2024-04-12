<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索标签"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>

  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length === 0">请选择标签</div>
  <van-row gutter="18" style="padding: 0 16px">
    <van-col v-for="tag in activeIds">
      <van-tag :show="show" closeable size="small" type="primary" @close="doClose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>

  <van-divider content-position="left">选择标签</van-divider>

  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />

  <!--  搜索用户-->
  <div style="padding: 16px">
    <van-button block type="primary" @click="doSearchUsersResult">搜索</van-button>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue';
import {useRouter} from "vue-router";
import myAxios from "../plugins/myAxios";
import {getCurrentUser} from "../services/user";

const router = useRouter();
const searchText = ref('');
const show = ref(true);
const close = () => {
  show.value = false;
};
// 已选择的标签
const activeIds = ref([]);
const activeIndex = ref(0);
// 标签关闭函数
const doClose = (tag) => {
  activeIds.value = activeIds.value.filter(item => {
    // 这里把匹配得上得置为 false
    return item !== tag;
  });
};
// 标签列表
let originTagList = reactive([
  {
    text: '性别',
    children: [
      {text: '男', id: '男'},
      {text: '女', id: '女'},
    ],
  },
  {
    text: '年级',
    children: [
      {text: '大一', id: '大一'},
      {text: '大二', id: '大二'},
      {text: '大三', id: '大三'},
      {text: '大四', id: '大四'},
    ],
  },
  {
    text: '编程学习方向',
    children: [
      {text: 'java', id: 'java'},
      {text: 'c++', id: 'c++'},
      {text: 'python', id: 'python'},
      {text: 'go', id: 'go'},
    ],
  },
  // {
  //   text: '游戏',
  //   children: [
  //     {text: '王者荣耀', id: '王者荣耀'},
  //     {text: '原神', id: '原神'},
  //     {text: '英雄联盟', id: '英雄联盟'},
  //     {text: '和平精英', id: '和平精英'},
  //     {text: 'QQ飞车', id: 'QQ飞车'},
  //     {text: '第五人格', id: '第五人格'},
  //   ],
  // },
]);
//标签列表
let tagList = ref(originTagList);
let planetCode = ref('');
/**
 *  搜索过滤
 * @param val
 */
const onSearch = (val) => {
  tagList.value = originTagList.map(parentTag =>{
    const tempChildren =  [...parentTag.children];
    const tempParentTag =  {...parentTag};
    tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value))
    return tempParentTag;
  })
};

//取消  清空
const onCancel = () => {
  searchText.value = '';
  tagList.value = originTagList;
};
/**
 * 跳转到搜索结果页面，根据标签搜索用户列表
 * @param val
 */
const doSearchUsersResult = () => {
  router.push({
    path:'/user/list',
    query:{
      tags:activeIds.value
    }
  });
};

onMounted(async () => {
  const currentUser = await getCurrentUser();
  planetCode.value = currentUser.planetCode;
  getTagsByCategory()
})
/**
 * 根据分组获取标签
 * @param val
 */
const getTagsByCategory = () => {
  // 上面的请求也可以这样做

  myAxios.get('/tag/category/list', {
    params: {
      category: planetCode.value
    },

  })
      .then(function (response) {
        console.log('/tag/category/list success', response);

        originTagList[2].children = response.data.map(item => ({
          text: item.tagName,
          id: item.tagName
        })); // 将请求到的数据的列表元素数组赋值给 originTagList 的第一个元素的 children 数组
        tagList.value = originTagList;


        console.log('源数据',originTagList);
      })
      .catch(function (error) {
        console.log('/tag/category/list', error);
      });


};
</script>

<style scoped>

</style>