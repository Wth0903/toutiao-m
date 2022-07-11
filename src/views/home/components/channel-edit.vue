<template>
  <div class="channel-edit">
    <van-cell title="编辑频道" style="text-align: center"></van-cell>
    <van-cell title="我的频道">
      <template $defaule>
        <van-button
          round
          size="mini"
          type="danger"
          plain
          class="edit-btn"
          @click="isEdit = !isEdit"
          >{{ isEdit ? "完成" : "编辑" }}</van-button
        >
      </template>
    </van-cell>
    <!-- 我的频道宫格 -->
    <van-grid :gutter="10" class="my-channel">
      <van-grid-item
        class="channel-item"
        v-for="(value, index) in userChannels"
        :key="value.id"
        @click="onMyChannelClick(value, index)"
      >
        <template #icon v-if="isEdit && index !== 0">
          <van-icon name="clear"></van-icon>
        </template>
        <template #text>
          <span class="text" :class="{ active: active === index }">{{
            value.name
          }}</span>
        </template>
      </van-grid-item>
    </van-grid>

    <!-- 推荐频道宫格 -->
    <van-cell title="推荐频道"> </van-cell>
    <van-grid :gutter="8" direction="horizontal" class="tuijian-channel">
      <van-grid-item
        class="channel-item"
        v-for="value in recommendChannels"
        :key="value.id"
        icon="plus"
        @click="addChannel(value)"
      >
        <template #text>
          <span class="text">{{ value.name }}</span>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { Notify } from "vant";
import { setLocal } from "@/utils/storage";
import { USERCHANNELKEY } from "@/constants";
import { differenceBy } from "lodash";
import {
  fetchAllChannels,
  fetchAddchannel,
  deleteUserChannel,
} from "@/api/channel";
import { mapState } from "vuex";
export default {
  name: "ChannelEdit",
  components: {},
  props: {
    userChannels: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      allChannels: [],
      isEdit: false,
    };
  },
  computed: {
    recommendChannels() {
      return differenceBy(this.allChannels, this.userChannels, "id");
      //   return this.allChannels.filter((item) => {
      //     return !this.userChannels.some((userItem)=>userItem.id===item.id);
      //   });
    },
    ...mapState(["user"]),
  },
  watch: {},
  created() {
    this.getAllChannels();
  },

  mounted() {},
  methods: {
    async deleteChannel(channel) {
      try {
        if (this.user) {
          await deleteUserChannel(channel.id);
        } else {
          setLocal(USERCHANNELKEY, this.userChannels);
        }
        this.$toast("删除成功");
      } catch (e) {
        this.$toast("删除失败");
      }
    },
    onMyChannelClick(channel, index) {
      if (this.isEdit) {
        if (index === 0)
          return Notify({ type: "danger", message: "推荐模块不能删除" });
        //处于编辑状态
        // index小于等于active时，需要让active - 1，不然会报错
        if (index <= this.active) {
          this.$emit("changeActive", this.active - 1, true);
        }
        this.userChannels.splice(index, 1);
        this.deleteChannel(channel);
      } else {
        // 非编辑状态
        // 通知父组件切换频道 传过去对应的索引号index
        this.$emit("changeActive", index, false);
      }
    },
    async addChannel(item) {
      this.userChannels.push(item);
      if (this.user) {
        try {
          await fetchAddchannel({
            id: item.id,
            seq: this.userChannels.length,
          });
          this.$toast("添加频道成功");
        } catch (e) {
          this.$toast("添加失败");
        }
      } else {
        setLocal(USERCHANNELKEY, this.userChannels);
      }
    },
    async getAllChannels() {
      const res = await fetchAllChannels();
      // console.log(res.data.data.channels);
      this.allChannels = res.data.data.channels;
    },
  },
};
</script>

<style scoped lang="less">
.edit-btn {
  width: 105px;
}
.channel-item {
  font-size: 21px;
  color: #222;
  margin-top: 0;
  .active {
    color: red;
  }
}
/deep/ .channel-item .van-grid-item__content {
  background-color: #f4f5f6;
}
/deep/ .tuijian-channel {
  .van-icon-plus {
    font-size: 30px;
    margin-right: 2px;
  }
}
.my-channel {
  /deep/ .van-icon-clear {
    position: absolute;
    font-size: 34px;
    top: -17px;
    right: -17px;
    color: #cacaca;
  }
}
.channel-item {
  /deep/ .van-grid-item__icon-wrapper {
    position: unset;
  }
}
</style>
