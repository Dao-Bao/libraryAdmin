<template>
  <div class="dept">
    <Title :title="title" />
  </div>
</template>

<script>
export default {
  name: 'dept',
  data () {
    return {
      title: '员工信息'
    }
  }
}
</script>

<style lang="scss" scoped>
.dept {
  margin-top: 1%;
  margin-left: 1%;
}
</style>
