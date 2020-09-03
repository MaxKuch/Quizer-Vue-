<template>
  <div>
    <Alert 
      :visible="alert.visible" 
      :title="alert.title" 
      :message="alert.message"
      :closeModal="closeModal"
    />
    <div class="wrapper d-flex justify-center">
      <div class="content-container">
        <Loader v-if="loading"/>
        <QuizItem v-else
          v-for="quizItem in quizItems" 
          :key="quizItem.id"
          :id="quizItem.id"
          :title="quizItem.title"
          :author="quizItem.author"
          :description="quizItem.description"
          :likes="quizItem.likes"
        />
      </div>
    </div>
  </div>
</template>
<script>

import QuizItem from '@/components/QuizItem.vue'
import Alert from '@/components/Alert.vue'
import Loader from '@/components/Loader.vue'
import { quizesAPI } from '@/utils/api'
export default {
  data() {
    return {
      loading: false,
      quizItems: [],
      alert: {
        timeout: null,
        visible: false,
        title: '',
        message: ''
      }
    }
  },
  mounted(){
    this.loading = true
    quizesAPI.quizesList()
    .then(({data})=> {
      this.loading = false
      this.quizItems = data
    })
    .catch(err => {
      this.loading = false
      this.alert.title = status
      this.alert.message = message
      this.alert.visible = true
      this.alert.timeout = setTimeout(() => {
        this.closeModal()
      }, 4000)
    })
  },
  methods: {
    closeModal(){
      this.alert.visible = false
      clearTimeout(this.alert.timeout)
      this.alert.timeout = null
    }
  },
  components: {
    QuizItem, Alert, Loader
  }
}
</script>

<style lang="scss" scoped>
  .content-container{
    margin-top: 70px;
    align-self: flex-start;
  }
</style>