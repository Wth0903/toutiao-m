<template>
  <div class="home-container">
    <van-nav-bar fixed>
      <template #title>
        <van-button
          icon="search"
          block
          size="small"
          round
          class="search-btn"
          type="info"
          to="/search"
          >搜索
        </van-button>
      </template>
    </van-nav-bar>
    <!-- tab标签页 -->
    <van-tabs animated swipeable v-model="active" class="channel-tabs">
      <van-tab v-for="item in userChannels" :key="item.id" :title="item.name"
        ><ArticleList :channel="item"
      /></van-tab>
      <!-- <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
      <van-tab title="标签 4">内容 5</van-tab>
      <van-tab title="标签 4">内容 6</van-tab>
      <van-tab title="标签 4">内容 7</van-tab> -->
      <template #nav-right>
        <div class="placeholder"></div>
        <div slot="nav-right" class="hamburger-btn" @click="popupShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
      </template>
    </van-tabs>
    <!-- 频道弹出层 -->
    <van-popup
      closeable
      close-icon-position="top-left"
      position="bottom"
      v-model="popupShow"
      style="height: 90%"
    >
      <Channeledit
        @changeActive="changeActive"
        :active="active"
        :userChannels="userChannels"
      ></Channeledit>
    </van-popup>
  </div>
</template>

<script>
import Channeledit from "@/views/home/components/channel-edit";
import ArticleList from "@/views/home/components/article-list.vue";
import { getUserChannels } from "@/api/channel";
import { USERCHANNELKEY } from "@/constants";
import { getLocal } from "@/utils/storage";
export default {
  name: "HomePage",
  components: {
    ArticleList,
    Channeledit,
  },
  props: {},
  data() {
    return {
      active: 0,
      userChannels: [],
      popupShow: false,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.headerGetUserChannels();
  },
  mounted() {},
  methods: {
    //获取用户频道数据
    async headerGetUserChannels() {
      // const res = await getUserChannels();
      // console.log(res);
      // this.userChannels = res.data.data.channels;
      try {
        //获取用户token
        const token = this.$store.state.user?.token;
        // 获取本地存储频道数据
        let channels = getLocal(USERCHANNELKEY);
        if (token || !channels) {
          const res = await getUserChannels();
          channels = res.data.data.channels;
        }
        this.userChannels = channels;
      } catch (e) {
        this.$toast("获取频道失败");
      }
    },
    changeActive(index, type) {
      //拿到对应的索引号并显示对应的频道
      this.active = index;
      //并让弹出框关闭
      this.popupShow = type;
    },
  },
};
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  /deep/ .van-nav-bar__title {
    width: 80%;
    max-width: unset;
  }

  .van-nav-bar .van-icon {
    color: #fff;
  }
  .search-btn {
    background-color: #6fa8f5;
    border: none;
  }
}

/deep/ .channel-tabs {
  .van-tabs__wrap {
    position: fixed;
    top: 92px;
    z-index: 1;
    left: 0;
    right: 0;
    height: 82px;
  }
  .van-tab {
    border-right: 1px solid #edeff3;
    min-width: 200px;
    height: 80px;
    .van-tab__text {
      font-size: 27px;
      color: #777777;
    }
  }

  .van-tab--active .van-tab__text {
    color: #333 !important;
  }
  .van-tabs__line {
    width: 31px !important;
    height: 6px;
    background: rgba(50, 150, 250, 1);
    border-radius: 3px;
    bottom: 8px;
  }
  .van-tabs__nav {
    padding: 0;
  }
}

.hamburger-btn {
  position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 82px;
  background-color: #fff;
  opacity: 0.902;
  i.toutiao {
    font-size: 33px;
  }
}
.placeholder {
  flex-shrink: 0;
  width: 66px;
  height: 82px;
}
</style>
