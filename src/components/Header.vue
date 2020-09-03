<template>
  <header class="header">
    <router-link to="/" class="logo">
      Quizer
    </router-link>
    <router-link v-if="path === 'login'" class="header__link" to="/register">Зарегистрироваться</router-link>
    <router-link v-else-if="path === 'register'" class="header__link" to="/login">Войти</router-link>
    
    <v-menu v-else-if="user.isAuth" bottom left offset-y content-class="header__dropdown">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          dark
          text
          v-bind="attrs"
          v-on="on"
          :offset-y="true"
        >
          <div class="header__profile d-flex align-center">
            <h5 class="title-h5">{{user.name}}</h5>
            <v-icon  size="15px">$vuetify.icons.expandMore</v-icon>
          </div>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          @click="item.action"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <router-link v-else class="header__link" to="/login">Войти</router-link>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      path: null,
      items: [
        { 
          title: 'Профиль', 
          action: () => {
            if(this.path !== 'profile')
              this.$router.push(`/profile/${this.user.id}`)
          }
        },
        { 
          title: 'Выйти',
          action: () => {
            this.$store.dispatch('logout')
            this.$router.push('/login')
          }
        },
      ],
    }
  },
  computed: mapState(['user']),
  watch: {
    $route(to) {
      this.path = to.path.slice(1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .header{
    display: flex;
    justify-content: space-between;
    padding: 30px 45px;
    padding-bottom: 0;
    margin-bottom: 30px;
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
    &__profile{
      h5{
        margin-right: 4px;
      }
    }
    &__dropdown{
      .theme--light.v-sheet{
        background-color: $content-bg;
      }
      .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled){
        color: $text!important;
      }
    }
  }
</style>
