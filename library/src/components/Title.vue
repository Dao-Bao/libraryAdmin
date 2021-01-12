<template>
  <div class="title">
    <i class="el-icon-document"></i>{{title}}
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
  font-size: 13px;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #FFF;
}
</style>
