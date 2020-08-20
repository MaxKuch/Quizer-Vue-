<template>
  <div class="d-flex justify-center">
    <div class="content-container">
      <QuizItem 
        v-for="(quizItem, idx) in quizItems" 
        :key="idx"
        :title="quizItem.title"
        :author="quizItem.author"
        :description="quizItem.description"
        :likes="quizItem.likes"
      />
    </div>
  </div>
</template>

<script>
import QuizItem from '@/components/QuizItem.vue'
export default {
  data() {
    return {
      quizItems: [{
        title: 'Кто ты из BTS',
        author: 'Jongook',
        description: 'Определи кто ты из легендарной корейской boys-band BTS',
        likes: 4749
      },
      {
        title: 'Какого бы жанра был фильм, снятый по твоей жизни',
        author: 'James',
        description: 'Представь, что о твоей жизни сняли бы фильм. Какого жанра он бы был?',
        likes: 2134
      },
      {
        title: 'Тест на гея',
        author: 'Lana',
        description: 'Проверь, есть ли у тебя склонность заглядываться на сочные мужские багеты',
        likes: 1098
      }]
    }
  },
  components: {
    QuizItem
  }
}
</script>

<style lang="scss" scoped>
  .content-container{
    margin-top: 70px;
    align-self: flex-start;
  }
</style>