<template>
  <section class="quiz-item">
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
      <div class="quiz-item__likes">
        <v-icon size="16px">{{heartIcon}}</v-icon>
        <span>{{likes}}</span>
      </div>
      <div class="quiz-item__comments">
        <v-icon size="20px">{{expandIcon}}</v-icon>
        <span>Комментарии</span>
      </div>
    </div>
  </section>
</template>

<script>
import { mdiAccountCircle, mdiHeartOutline, mdiUnfoldMoreHorizontal } from '@mdi/js'
export default {
  props: ['title', 'author', 'description', 'likes', 'id'],
  data: () => ({
      profileIcon: mdiAccountCircle,
      heartIcon: mdiHeartOutline,
      expandIcon: mdiUnfoldMoreHorizontal
  }),
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