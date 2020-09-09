<template>
  <div id="app">
    <app-header/>
    <div class="main">
      <div class="wrap">
        <div class="content">
          <nuxt/>
        </div>
      </div>
    </div>
    <app-footer/>
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader'
import AppFooter from '~/components/AppFooter'
import { mapState } from 'vuex'
export default {
  name: 'Page',
  components: {
    AppHeader,
    AppFooter
  },
  computed: {

  },
  methods: {
    _closeMenu () {
      this.$store.commit('UPDATE_MENU_STATUS', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  justify-content: space-between;
  margin-top: $container-margin;

  .content {
    width: 100%;
  }
}
</style>
