<template>
  <div class="layout-container" route>
    <router-view></router-view>
    <van-tabbar class="layout-tabbar" v-model="active">
      <van-tabbar-item icon="home-o" to="home">
        <template #icon>
          <Toutiaoicon icon="shouye"></Toutiaoicon>
        </template>
        首页
      </van-tabbar-item>
      <van-tabbar-item icon="search" to="qa">
        <template #icon>
          <Toutiaoicon icon="wenda"></Toutiaoicon>
        </template>
        问答</van-tabbar-item
      >
      <van-tabbar-item icon="friends-o" to="video">
        <template #icon>
          <Toutiaoicon icon="shipin"></Toutiaoicon>
        </template>
        视频</van-tabbar-item
      >
      <van-tabbar-item icon="setting-o" to="my">
        <template #icon>
          <Toutiaoicon icon="wode"></Toutiaoicon>
        </template>
        我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import Toutiaoicon from "../../components/Toutiaoicon.vue";
export default {
  components: { Toutiaoicon },
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style scoped lang="less">
.layout-container {
  .layout-tabbar {
    i.toutiao {
      font-size: 40px;
    }
    span.text {
      font-size: 20px;
    }
  }
}
</style>
