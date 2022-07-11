<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(item, index) in list"
      :key="index"
      icon="search"
      @click="hancleClick(item)"
    >
      <template #title>
        <div v-html="highLight(item)"></div>
      </template>
    </van-cell>
    <!-- <van-cell icon="search" title="搜索建议"></van-cell>
    <van-cell icon="search" title="搜索建议"></van-cell>
    <van-cell icon="search" title="搜索建议"></van-cell>
    <van-cell icon="search" title="搜索建议"></van-cell> -->
  </div>
</template>

<script>
import { getSearchSuggestions } from "@/api/search";
import { debounce } from "lodash";
export default {
  name: "SearchSuggestion",
  props: {
    searchText: {
      type: String,
    },
  },
  data() {
    return {
      list: [],
    };
  },
  computed: {},
  watch: {
    searchText: {
      handler: debounce(function (value) {
        this.getSuggestions(value);
      }, 500),
      immediate: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    async getSuggestions(q) {
      const res = await getSearchSuggestions(q);
      this.list = res.data.data.options;
      //   this.list = res.data.data.options.map((item) => {
      //     const reg = new RegExp(this.searchText, "gi");
      //     return item.replace(
      //       reg,
      //       `<span style = "color:red">${this.searchText}</span>`
      //     );
      //   });
    },
    highLight(item) {
      const reg = new RegExp(this.searchText, "gi");
      return item.replace(
        reg,
        `<span style = "color:red">${this.searchText}</span>`
      );
    },
    hancleClick(value) {
      console.log(value);
      this.$emit("onSearch", value);
    },
  },
};
</script>

<style scoped lang="less"></style>
