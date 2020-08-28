<template>
  <div class="alert">
    <v-alert
      v-model="alert"
      prominent
      dismissible
      transition="slide-y-transition"
      type="error"
      color="red"
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
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    message: {
      type: String
    }
  },
  watch: { 
    visible(){
      if(this.alert !== this.visible){
        this.alert = this.visible
        console.log(this.alert)
        if(this.alert){
          this.timeout = setTimeout(() => {
            console.log('timeout')
            this.alert = false
          }, 4000)
        }
        else if(this.timeout){
          console.log('kdsjfgskdjfskdjfkosdf')
          clearTimeout(this.timeout)
          this.timeout = null
        }
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