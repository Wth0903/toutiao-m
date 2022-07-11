<template>
  <div>
    <van-cell title="搜索历史">
      <template #default>
        <van-tag type="danger" class="btn">全部删除</van-tag>
        <van-tag type="success" class="btn">完成</van-tag>
        <van-icon name="delete"></van-icon>
      </template>
    </van-cell>

    <van-cell title="111">
      <template #default>
        <van-icon name="clear"></van-icon>
      </template>
    </van-cell>
    <van-cell title="111">
      <template #default>
        <van-icon name="clear"></van-icon>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
};
</script>

<style scoped lang="less">
.btn {
  margin-right: 10px;
}
</style>
