<template>
  <div class="title">
    <i class="el-icon-document"></i>
    <span>{{title}}</span>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: {
    title: String
  }
}
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  margin-bottom: 20px;
}
</style>
