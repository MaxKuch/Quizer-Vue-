<template>
  <v-app>
    <component :is="layout">
      <router-view/>
    </component>
  </v-app>
</template>

<script>
import MainLayout from '@/layouts/MainLayout'
export default {
  name: 'App',
  computed: {
    layout() {
      return (this.$route.meta.layout || 'main') + '-layout'
    }
  },
  components: {
    MainLayout
  }
};
</script>

<style lang="scss">
  @import './styles/index.scss';
</style>