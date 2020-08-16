<template>
  <header class="header">
    <span class="logo">
      Quizer
    </span>
    <router-link class="header__link" to="/register">Зарегистрироваться</router-link>
  </header>
</template>

<script>
export default {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .header{
    display: flex;
    justify-content: space-between;
    padding: 30px 45px;
    padding-bottom: 0;
    &__link{
      font-family: Nunito, sans-serif;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 25px;
      letter-spacing: 0.13em;
      text-decoration: none;
      color: $text;
    }
  }
</style>
