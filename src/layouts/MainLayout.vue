<template>
  <div class="main">
    <Header/>
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from '@/components/Header'
  export default {
    name: "main",
    components: {
      Header
    }
  }
</script>

<style lang="scss">
.main{
  min-height: 100%;
  background-color: $bg;
  display: flex;
  flex-direction: column;
  .wrapper{
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
