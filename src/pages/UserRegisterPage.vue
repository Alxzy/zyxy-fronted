<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="username"
          name="username"
          label="昵称"
          placeholder="请输入昵称"
          :rules="[{ required: true, message: '请输入昵称' }]"
      />
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请输入账号' }]"
      />
      <van-field
          v-model="phone"
          name="phone"
          label="电话号码"
          placeholder="请输入电话号码"
          :rules="[{ required: true, message: '请输入电话号码' }]"
      />

      <van-field
          v-model="email"
          name="email"
          label="邮箱"
          placeholder="请输入邮箱"
          :rules="[{ required: true, message: '请输入邮箱' }]"
      />
      <van-field name="radio" label="性别">
        <template #input>
          <van-radio-group v-model="gender" direction="horizontal">
            <van-radio name="0">男</van-radio>
            <van-radio name="1">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field name="group" label="分组">
        <template #input>
          <van-radio-group v-model="planetCode" direction="horizontal">
            <van-radio v-for="category in categoryList" :key="category" :name="category">{{ category }}</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field name="checkboxGroup" label="标签">
        <template #input>
          <van-button round v-if="activeIds.length === 0" type="success" @click="getTagsByCategory">选择你的标签</van-button>
        </template>
      </van-field>
      <van-row gutter="16" v-if="activeIds.length > 0">
        <van-col v-for="tag in activeIds" style="padding: 8px">
          <van-tag :show="true" closeable size="medium" type="primary" @close="doClose(tag)">
            {{ tag }}
          </van-tag>
        </van-col>
      </van-row>
      <van-field
          v-model="url"
          name="avatarUrl"
          label="头像"
          placeholder="请输入头像地址"
          :rules="[{ required: false, message: '请输入头像地址' }]"
      />


      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请输入密码' }]"
      />
      <van-field
          v-model="checkPassword"
          type="password"
          name="checkPassword"
          label="确认密码"
          placeholder="请输入确认密码"
          :rules="[{ required: true, message: '请输入确认密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        注册
      </van-button>
    </div>
  </van-form>
  <van-dialog v-model:show="showTagList" title="标签" show-cancel-button @confirm="showCheckTag" @cancel="">
    <form action="/public">
      <van-search
          v-model="searchText"
          show-action
          placeholder="请输入需要搜索的标签"
          @search="onSearch"
          @cancel="onCancel"
      />
    </form>
    <van-divider content-position="left">已选标签</van-divider>
    <div v-if="activeIds.length === 0">请选择标签</div>
    <van-row gutter="16">
      <van-col v-for="tag in activeIds" style="padding: 8px">
        <van-tag :show="true" closeable size="medium" type="primary" @close="doClose(tag)">
          {{ tag }}
        </van-tag>
      </van-col>
    </van-row>

    <van-divider content-position="left">选择标签</van-divider>
    <van-divider content-position="left"/>
    <van-tree-select
        v-model:active-id="activeIds"
        v-model:main-active-index="activeIndex"
        :items="tagList"
    />
  </van-dialog>

</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onBeforeUnmount, onMounted, reactive, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";

const route = useRoute();
const router = useRouter();

const userAccount = ref('');
const username = ref('');
const userPassword = ref('');
const checkPassword = ref('');
let planetCode = ref('');
const phone = ref('');
const email = ref('');
const show = ref(false);
const isShowRegister = ref(true);

let showTagList = ref(false);
const url = ref('');
const gender = ref('0');
const searchText = ref('');
// 这里使用 reactive 使得每次请求得到的数据能够及时更新到视图中!! 踩坑 记录 todo
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
    text: '星球',
    children: [
      {text: '编程学习', id: '编程学习'},
      {text: '打游戏', id: '打游戏'},

    ],
  },
]);

let tagList = ref(originTagList);
const categoryList = ref([]);
// 挂载前获取数据
onMounted(async () => {
  // 上面的请求也可以这样做
  const categoryListData = await myAxios.get('/tag/get/category', {
    params: {},

  })
      .then(function (response) {
        console.log('/tag/get/category success', response);
        console.log(response);
        return response.data;
      })
      .catch(function (error) {
        console.log('/tag/get/category fail', error);
      });
  console.log(categoryListData);
  if (categoryListData) {
    categoryList.value = categoryListData;
  }
})


const onSearch = (val) => {
  tagList.value = originTagList.map(parentTag => {
    const tempChildren = parentTag.children.filter(item => item.text.includes(searchText.value));
    return {...parentTag, children: tempChildren};
  });

};
const onCancel = () => {
  searchText.value = '';
  tagList.value = originTagList;

};

//已选中的标签
let activeIds = ref([]);
const activeIndex = ref(0);


const showCheckTag = () => {
  console.log('activeIds', activeIds.value);
  // console.log(planetCode.value);
}


//移除标签
const doClose = (tag) => {
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag;
  })
}

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
        // todo 每个星球多个分组
        originTagList[2].children = response.data.map(item => ({
          text: item.tagName,
          id: item.tagName
        })); // 将请求到的数据的列表元素数组赋值给 originTagList 的第一个元素的 children 数组
        tagList.value = originTagList;
        activeIds = ref([planetCode.value]);
        originTagList[2].text = planetCode.value;
        showTagList.value = true;
        console.log('源数据',originTagList);
        console.log(planetCode.value)
      })
      .catch(function (error) {
        console.log('/tag/category/list', error);
      });


};

/**
 * 注册用户
 */
const onSubmit = async () => {

  const tags = JSON.stringify(activeIds.value)
  console.log(tags)
  console.log('url', url);
  const res = await myAxios.post('/user/register', {
    username: username.value,
    userAccount: userAccount.value,
    tags: tags,
    avatarUrl: url.value,
    planetCode:planetCode.value,
    phone: phone.value,
    gender: gender.value,
    email: email.value,
    checkPassword: checkPassword.value,
    userPassword: userPassword.value,
  })
  console.log('用户注册', res);
  if (res.code === 0 && res.data) {
    localStorage.setItem("token", res.data);
    showSuccessToast("注册成功");
    await router.replace('/user/login')
  } else {
    showFailToast('注册失败' + (res.description ? `，${res.description}` : ''))
    // await router.replace('/user/register')
  }
};
</script>

<style scoped>

</style>