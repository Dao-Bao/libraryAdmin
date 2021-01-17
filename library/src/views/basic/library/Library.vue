<template>
  <div class="library">
    <Title :title="title" />
  </div>
</template>

<script>
export default {
  name: 'Library',
  data () {
    return {
      title: '图书信息'
    }
  }
}
</script>

<style lang="scss" scoped>
.library {
  margin-top: 1%;
  margin-left: 1%;
}
</style>
