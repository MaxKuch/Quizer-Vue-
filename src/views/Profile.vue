<template>
  <div class="wrapper d-flex justify-center align-center">
    <div class="content-container">
      <Loader v-if="loading"/>
      <div v-else-if="user" class="profile">
        <div class="profile__user d-flex align-center">
          <div class="flex-shrink-0">
            <Avatar size="80"/>
          </div>
          
          <div class="profile__user-info">
            <h5 class="title-h5">
              {{user.name}}
            </h5>
            <p class="parag">{{`Присоединился к нам `}}{{user.created | distanceToNow}}</p>
          </div>
        </div>
        <div class="profile__results-list">
          <h2 class="title-h2">Результаты тестов</h2>
          <div v-if="user.results.length"> 
            <div class="profile__result-item" v-for="result in user.results" :key="result.result.id">
              <h2 class="title-h2">
                <router-link :to="`/quiz/${result.quiz.id}`">{{result.quiz.title}}</router-link>
              </h2>
              <h4 class="title-h4">
                {{result.result.title}}
              </h4>
              <p v-if="result.result.description" class="parag">
                {{result.result.description}}
              </p>
            </div>
          </div>
          <h4 class="title-h4" v-else>Пройденных тестов пока нет</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import { userAPI } from '@/utils/api'
  import Loader from '@/components/Loader.vue'
  import Avatar from '@/components/Avatar.vue'
  export default {
    data: () => ({
      loading: false,
      isMe: false,
      user: null,
      results: [{
        title: 'Тест на гея',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis tempus a enim tellus id. Elementum fringilla id suspendisse id et. Odio semper in pulvinar elementum urna, sit. Ullamcorper eget laoreet vel tincidunt vitae mauris porttitor. '
      }]
    }),
    async mounted(){
      const userId = this.$route.params.id
      if(userId === this.$store.getters.getUserId){
        this.isMe = true
      }
      this.loading = true
      try{
        const {data: {data}} = await userAPI.getUserData(userId)
        this.loading = false
        data.user.results = _.orderBy(data.user.results, ['created'], ['desc'])
        this.user = data.user
        this.user
      } catch(err) {
        this.loading = false
      }
    },
    components: {
      Loader, Avatar
    }
  }
</script>

<style lang="scss">
  .profile{
    &__user{
      margin-bottom: 60px;
      &-avatar{
        max-width: 70px;
        max-height: 70px;
        border-radius: 50%;
        object-fit: cover;
      }
      &-info{
        margin-left: 20px;
        h5{
          text-transform: uppercase;
        }
        p{
          opacity: .5;
          font-size: 16px;
          margin: 0;
        }
      }
    }
    &__results-list{
      & > h2{
        margin-bottom: 20px;
      }
    }
    &__result-item{
      &:not(:last-child){
        margin-bottom: 30px;
      }
      h2{
        margin-bottom: 10px;
        font-size: 30px;
        a {
          color: $text;
        }
      }
      h4{
        margin-bottom: 5px;
      }
    }
  }
</style>