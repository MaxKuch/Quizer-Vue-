<template>
  <div class="alert">
    <v-alert
      v-model="alert"
      prominent
      dismissible
      transition="slide-y-transition"
      :type="this.type"
      :color="this.color"
    >
      <v-row>
        <v-col class="grow">
          <h4>{{title}}</h4>
          {{message}}
        </v-col>
      </v-row>
    </v-alert>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeout: null,
      alert: false
    }
  },
  props: {
    type: {
      type: String,
      default: 'error'
    },
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    message: {
      type: String
    },
    closeModal: {
      type: Function
    }
  },
  computed: {
    color(){
      if(this.type === 'error')
        return 'red'
      if(this.type === 'warning')
        return 'orange'
    }
  },
  watch: { 
    visible(){
      if(this.alert !== this.visible){
        this.alert = this.visible
      } 
    },
    alert(){
      if(!this.alert){
        this.closeModal()
      }
    }
  }
}
</script>

<style lang="scss">
  .alert{
    width: 500px;
    position: absolute;
    top: 100px;
    right: 45px;
    h4{
      text-transform: uppercase
    }
  }
</style>