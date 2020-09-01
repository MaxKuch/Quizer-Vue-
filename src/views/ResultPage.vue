<template>
  <div class="wrapper d-flex justify-center align-center">
    <div  class="content-container">
      <div v-if="loading" class="d-flex justify-center">
        <v-progress-circular
          indeterminate
          color="#0434B0"
        ></v-progress-circular>
      </div>
      <div v-else class="result">
        <h2 v-if="yourResult" class="title-h2 text-center">{{yourResult.title}}</h2>
        <p v-if="yourResult && yourResult.description" class="parag">
          {{yourResult.description}}
        </p>
        <div class="d-flex flex-column align-center">
          <v-btn text>
            <router-link class="parag result__link" to="/">
              Вернуться на главную
            </router-link>
          </v-btn>
          <div v-if="user.name" class="result__share">
            <Button>
              Поделиться результатом
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Button from '@/components/Button.vue'
import { quizesAPI } from '../utils/api'
export default {
  data(){
    return {
      results: [],
      loading: false
    }
  },
  mounted(){
    this.loading = true
    quizesAPI.getQuizResults(this.$route.params.id)
    .then(({data}) => {
      this.loading = false
      this.results = data
    })
  },
  computed: {
    ...mapState(['user']),
    yourResult(){
      const score = this.$route.params.score
      return this.results.filter(result => {
        if(score >= result.scoreRange.start && score <= result.scoreRange.end)
          return true
        else
          return false
      })[0]
    }
  },
  components: {
    Button
  }
}
</script>

<style lang="scss">
  .result{
    h2{
      margin-bottom: 40px;
    }
    &__link{
      text-transform: none;
      color: $accent;
    }
    &__share{
      margin-top: 20px;
    }
  }
</style>