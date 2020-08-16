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
  height: 100%;
  background-color: $bg;
  display: flex;
  flex-direction: column;
  > div{
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
