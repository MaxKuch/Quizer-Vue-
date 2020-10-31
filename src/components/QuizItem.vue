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
        <div @click="toggleCommentsVisibility" class="quiz-item__expand-comments">
          <v-icon size="20px">{{expandIcon}}</v-icon>
          <span>Комментарии</span>
        </div>
    </div>
    <div v-if="commentsVisibility" class="quiz-item__comments">
       <div v-if="$store.getters.getIsUserAuth" class="quiz-item__comments-input">
           <div class="d-flex align-end">
              <v-textarea
                v-model="$v.inputComment.$model"
                :error-messages="commentErrors"
                rows="1"
                auto-grow
                placeholder="Добавьте комментарий"
              ></v-textarea>
              <v-btn :disabled="buttonDisabled" @click="sendComment" small color="">Отправить</v-btn>
           </div>
        </div>
        <div class="quiz-item__comment-items">
          <CommentItem 
            v-for="comment in commentsState" 
            :comment="comment"
            :key="comment.id"
          />
        </div>
    </div>
  </section>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { maxLength } from 'vuelidate/lib/validators'
import _ from 'lodash'
import { mdiAccountCircle, mdiHeart, mdiHeartOutline, mdiUnfoldMoreHorizontal } from '@mdi/js'
import { quizesAPI } from '@/utils/api'
import Alert from '@/components/Alert'
import CommentItem from '@/components/CommentItem'

export default {
  mixins: [validationMixin],
  validations: {
    inputComment: {maxLength: maxLength(500)}
  },
  props: ['title', 'author', 'description', 'likes', 'likesAmount', 'comments', 'id'],
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
    },
    commentsVisibility: false,
    inputComment: '',
    buttonDisabled: true,
    commentsState: []
  }),
  mounted(){
    this.likesState.count = this.likesAmount
    const userId = this.$store.getters.getUserId
    this.commentsState = _.orderBy(this.comments, ['created'], ['desc'])
    if(userId){
      if (this.likes.some(like => like.user === userId))
        this.likesState.isLiked = true
    }
  },
  methods: {
    async like() {
      if(this.$store.getters.getIsUserAuth){
        const userId = this.$store.getters.getUserId
        const quizId = this.id
        if(!this.likesState.isLiked){
          this.likesState.count += 1
          this.likesState.isLiked = true
          try{
            await quizesAPI.like(userId, quizId)
          } catch(err) {
            console.error(err.response)
          }
        }
        else {
          this.likesState.isLiked = false
          this.likesState.count -= 1
          try{
            await quizesAPI.removeLike(userId, quizId)
          } catch(err) {
            console.error(err.response)
          }
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
    async sendComment() {
      const userId = this.$store.getters.getUserId
      const quizId = this.id
      const text = this.inputComment
      this.commentsState.unshift({
        id: Date.now(),
        created: new Date(),
        text,
        author: {
          id: userId,
          username: this.$store.getters.getUserName
        }
      })
      try {
        await quizesAPI.sendComment(userId, quizId, text)
        this.inputComment = ''
      }
      catch(err) {
        const {data: {message, status}} = err
        this.alert.title = status
        this.alert.message = message
        this.alert.visible = true
        this.alert.timeout = setTimeout(() => {
          this.closeModal()
        }, 4000)
      }
    },
    toggleCommentsVisibility(){
      this.commentsVisibility = !this.commentsVisibility
    },
    closeModal() {
      this.alert.visible = false
      clearTimeout(this.alert.timeout)
      this.alert.timeout = null
    }
  },
  computed: {
    commentErrors(){
      const errors = []
      console.log(this.$v.inputComment)
      !this.$v.inputComment.maxLength
      && errors.push(`Максимальная длина комментария - ${this.$v.inputComment.$params.maxLength.max} символов`)
      return errors
    },
    likesCount(){
      return this.likesState.count
    },
  },
  watch: {
    likesCount(){
      if(!this.likesState.isLiked){
        this.likesState.icon = mdiHeartOutline
      }
      else{
        this.likesState.icon = mdiHeart
      }
    },
    inputComment(){
      if(this.inputComment)
        this.buttonDisabled = false
      else
        this.buttonDisabled = true
    },
    commentErrors(){
      if(this.$v.inputComment.$invalid)
        this.buttonDisabled = true
    }
  },
  components: {
    Alert, CommentItem
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
    &-input{
      button{
        background-color: $accent!important;
        color: $text!important;
        margin-left: 10px;
        margin-bottom: 20px;
        &.theme--light.v-btn.v-btn--disabled{
          color: $inputLabelColor!important;
        }
      }
    }
  }
  
  &__comment-items{
    margin-top: 10px;
  }

  &__expand-comments{
    cursor: pointer;
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