<template>
  <div class="printing">
    <Title :title="title" />
  </div>
</template>

<script>
export default {
  name: 'Printing',
  data () {
    return {
      title: '客户信息'
    }
  }
}
</script>

<style lang="scss" scoped>
.printing {
  margin-top: 1%;
  margin-left: 1%;
}
</style>
