<template>
  <v-app>
    <Alert 
      :visible="alert.visible" 
      :title="alert.title" 
      :message="alert.message"
      :closeModal="closeModal"
    />
    <component :is="layout">
      <router-view/>
    </component>
  </v-app>
</template>

<script>
import MainLayout from '@/layouts/MainLayout'
import Alert from '@/components/Alert'
export default {
  name: 'App',
  data() {
    return {
      alert: {
        timeout: null,
        visible: false,
        title: '',
        message: ''
      }
    }
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || 'main') + '-layout'
    },
  },
  methods: {
    closeModal(){
      this.alert.visible = false
      clearTimeout(this.alert.timeout)
      this.alert.timeout = null
    }
  },
  mounted(){
    const path = new URL(location.href).pathname.slice(1)
    this.$store.commit('addPath', path)
    const token = window.localStorage.getItem('token')
    if(token){
      this.$store.dispatch('verify', token)
      .then(() => {
        this.$store.dispatch('redirect')
      })
      .catch((err) => {
        const {data: {message, status}} = err
        this.alert.title = status
        this.alert.message = message
        this.alert.visible = true
        this.alert.timeout = setTimeout(() => {
          this.closeModal()
        }, 4000)
      })
    }
    else{
      this.$store.dispatch('redirect')
    }
  },
  components: {
    MainLayout, Alert
  }
}
</script>

<style lang="scss">
  @import './styles/index.scss';
</style>