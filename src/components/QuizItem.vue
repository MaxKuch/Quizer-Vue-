<template>
  <section class="quiz-item">
     <Alert 
      :visible="alert.visible" 
      :title="alert.title" 
      :message="alert.message"
      :closeModal="closeModal"
      :type="alert.type"
    />
    <div class="quiz-item__header d-flex flex-wrap">
      <h2 class="quiz-item__title title-h2">
        <router-link :to="`/quiz/${id}`">{{title}}</router-link>
        <div class="quiz-item__author">
          <v-icon size="18px">{{profileIcon}}</v-icon>
          <span>{{author}}</span>
        </div>
      </h2>
    </div>
    <p class="parag">{{description}}</p>
    <div class="d-flex">
      <div @click="like" class="quiz-item__likes">
        <v-icon size="16px">{{likesState.icon}}</v-icon>
        <span>{{likesState.count}}</span>
      </div>
      <div class="quiz-item__comments">
        <v-icon size="20px">{{expandIcon}}</v-icon>
        <span>Комментарии</span>
      </div>
    </div>
  </section>
</template>

<script>
import { mdiAccountCircle, mdiHeart, mdiHeartOutline, mdiUnfoldMoreHorizontal } from '@mdi/js'
import { quizesAPI } from '@/utils/api'
import Alert from '@/components/Alert'

export default {
  props: ['title', 'author', 'description', 'likes', 'id'],
  data: () => ({
    profileIcon: mdiAccountCircle,
    expandIcon: mdiUnfoldMoreHorizontal,
    likesState: {
      count: 0,
      isLiked: false,
      icon: mdiHeartOutline,
    },
    alert: {
      timeout: null,
      visible: false,
      title: '',
      message: '',
      type: null
    } 
  }),
  mounted(){
    this.likesState.count = this.likes.length
    const userId = this.$store.getters.getUserId
    if(userId){
      if (this.likes.some(like => like.user === userId))
        this.likesState.isLiked = true
    }
  },
  methods: {
    like() {
      if(this.$store.getters.getIsUserAuth){
        const userId = this.$store.getters.getUserId
        const quizId = this.id
        if(!this.likesState.isLiked){
          this.likesState.count += 1
          this.likesState.isLiked = true
          quizesAPI.like(userId, quizId)
          .catch(err => {
            console.error(err.response)
          })
        }
        else {
          this.likesState.isLiked = false
          this.likesState.count -= 1
          quizesAPI.removeLike(userId, quizId)
          .catch(err => {
            console.error(err.response)
          })
        }
      }
      else if(!this.alert.visible){
        this.alert.title = 'Внимание'
        this.alert.message = 'Только авторизованные пользователи могут оценивать тесты'
        this.alert.type = 'warning'
        this.alert.visible = true
        this.alert.timeout = setTimeout(() => {
          this.closeModal()
        }, 4000)
      }
    },
    closeModal(){
      this.alert.visible = false
      clearTimeout(this.alert.timeout)
      this.alert.timeout = null
    }
  },
  computed: {
    likesCount(){
      return this.likesState.count
    }
  },
  watch: {
    likesCount(){
      if(!this.likesState.isLiked){
        this.likesState.icon = mdiHeartOutline
      }
      else{
        this.likesState.icon = mdiHeart
      }
    }
  },
  components: {
    Alert
  }
}
</script>

<style lang="scss">
.quiz-item{
  font-family: Nunito;
  &:not(:last-child){
    margin-bottom: 50px;
  }
  &__header{
    > h2{
      text-decoration-line: underline;
      > span{
        margin-right: 10px;
      }
    }
  }
  &__title{
    a{
      color: $text;
    }
  }
  &__author{
    align-self: flex-end;
    display: inline-block;
    .theme--light.v-icon{
      color: $accent;
      margin-bottom: -5px;
      margin-right: 5px;
    }
    span{
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      letter-spacing: 0.04em;
      color: $text;
    }
  }

  p{
    margin-bottom: 5px;
  }
  
  &__likes{
    cursor: pointer;
    margin-right: 10px;
    .theme--light.v-icon{
      color: $accent;
      margin-right: 5px;
      padding-bottom: 2px;
    }
    span{
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      letter-spacing: 0.04em;
      color: $text;
    }
  }
  &__comments{
    .theme--light.v-icon{
      color: $accent;
      margin-right: 3px;
      padding-bottom: 2px;
    }
    span{
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      letter-spacing: 0.04em;
      color: #848485;
    }
  }
}
</style>