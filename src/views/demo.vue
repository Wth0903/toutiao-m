<template>
  <div>
    我是demo
    <hr />
    <h4>{{ count }}</h4>
    <hr />
    {{ $store.state.userinfo.name }}
    <van-button @click="change">const++</van-button>
    <van-button @click="changeName">修改name</van-button>
    <van-field v-model.number="num"></van-field>
    <van-button @click="count">加</van-button>
  </div>
</template>

<script>
import { mapState } from "vuex";
// store中定义数据
// 组建中获取数据
export default {
  computed: {
    ...mapState(["const"]),
  },
  data() {
    return {
      num: 0,
    };
  },
  methods: {
    change() {
      this.$store.commit("changeCount");
    },
    changeName() {
      this.$store.commit("changeName");
    },
    count() {
      this.$store.commit("changeCount2", this.num);
    },
  },
};
</script>

<style></style>
