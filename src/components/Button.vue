<template>
  <v-btn rounded class="main-btn" :disabled="disabled" dark :type="type" @click="onClick">
      <slot></slot>
  </v-btn>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    }, 
    onClick: {
      type: [Function],
      default: () => {}
    }
  }
}
</script>

<style lang="scss">
 .main-btn{
    background-color: $accent!important;
    padding: 10px 60px!important;
    border-radius: 32px;
    font-family: Nunito, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 25px;
    color: $text;
    &:focus{
      outline: none;
    }
  }
</style>