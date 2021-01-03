<template>
  <fragment>
    <template v-for="item in menuList">
      <el-submenu v-if="item.children" :index="item.path" :key="item.path" style="width:200px">
        <template slot="title">
          <!-- <svg-icon :icon-class="item.icon" style="width:15px;height:15px;text-align:center;" /> -->
          <span style="font-size: 15px;font-weight: 600;margin-left:10px;" slot="title">{{ item.name }}</span>
        </template>
        <menu-item :menu-list="item.children"></menu-item>
      </el-submenu>
      <el-menu-item @click="selectMenu(item)" v-else :index="item.path" :key="item.path">
        <!-- <svg-icon :icon-class="item.icon" style="width:15px;height:15px;text-align:center;" /> -->
        <span style="margin-left:10px;" slot="title">{{ item.name }}</span>
      </el-menu-item>
    </template>
  </fragment>
</template>

<script>
import MenuItem from './MenuItem.vue'
export default {
  name: 'MenuItem',
  props: ['menuList'],
  components: {
    MenuItem
  },
  methods: {
    selectMenu (item) {
      this.$router.push({ path: item.path })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
