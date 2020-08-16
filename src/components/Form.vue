<template>
  <div class="form-wrapper">
    <h3 class="title-h3">{{title}}</h3>
    <form @submit.prevent>
      <slot></slot>
    </form>
  </div>
</template>

<script>
export default {
  props:{
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
  .form-wrapper{
    width: 100%;
    max-width: 490px;
    background-color: $content-bg;
    padding: 30px 60px;
    border-radius: 40px;
    h3{
      text-align: center;
    }
  }
</style>