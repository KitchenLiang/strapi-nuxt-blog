<template>
  <div id="app">
    <app-header/>
    <div class="main">


        <nuxt/>

    </div>
    <app-footer/>
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader'
import AppFooter from '~/components/AppFooter'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },
  data() {
    return {
    }
  },
  computed: {

  },
  methods: {

  },
}
</script>

<style lang="scss" scoped>

</style>
