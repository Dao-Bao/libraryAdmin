<template>
  <div class="MenuBar">
    <el-menu :default-active="$route.path" class="menu-bar" unique-opened background-color="rgba(84,92,100,0.3)" text-color="#fff"
      active-text-color="#ffd04b">
      <menu-item v-if="menuList" :menuList="menuList"></menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MenuItem from './MenuItem'
export default {
  name: 'MenuBar',
  components: {
    MenuItem
  },
  computed: {
    ...mapState({
      menuList: state => state.loginStore.menuData
    })
  }
}
</script>

<style lang="scss" scoped>
.MenuBar {
  height: 100%;
}
</style>
