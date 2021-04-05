<template>
  <div class="reservoir">
    <Title :title="title" />
  </div>
</template>

<script>
export default {
  name: 'reservoir',
  data () {
    return {
      title: '信息管理'
    }
  }
}
</script>

<style lang="scss" scoped>
.reservoir {
  margin-top: 1%;
  margin-left: 1%;
}
</style>
