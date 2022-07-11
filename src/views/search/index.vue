<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isShowResults = false"
      />
    </form>
    <!-- 搜索结果 -->
    <SearchResult v-if="isShowResults"></SearchResult>
    <!-- 搜索建议 -->
    <SearchSuggestion
      :searchText="searchText"
      v-else-if="searchText"
      @onSearch="onSearch"
    ></SearchSuggestion>
    <!-- 搜索历史 -->
    <Aarchhistory v-else></Aarchhistory>
  </div>
</template>

<script>
import Aarchhistory from "@/components/earch-history";
import SearchSuggestion from "@/components/search-suggestion";
import SearchResult from "@/components/search-result";
export default {
  name: "SearchPage",
  components: { Aarchhistory, SearchSuggestion, SearchResult },
  props: {},
  data() {
    return {
      searchText: "",
      isShowResults: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    //默认界面为搜索历史
    //输入框有内容则显示搜索建议
    //按下回车时显示搜索结果
    onSearch(value) {
      this.searchText = value;
      this.isShowResults = true;
    },
    onCancel() {
      console.log("触发了取消事件");
    },
  },
};
</script>

<style scoped></style>
