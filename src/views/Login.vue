<template>
  <div class="wrapper login-page">
    <Alert 
      :visible="alert.visible" 
      :title="alert.title" 
      :message="alert.message"
      :closeModal="closeModal"
    />
    <Form :title="'Войти'">
      <v-text-field
        v-model="$v.name.$model"
        :error-messages="nameErrors"
        label="Ваш ник"
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="$v.password.$model"
        :error-messages="passwordErrors"
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
        type="password"
        label="Пароль"
      ></v-text-field>
      <div class="d-flex justify-center mt-5">
        <Button :disabled="buttonDisabled" :type="'submit'" :onClick="submit">
          Войти
        </Button>
      </div>
    </Form>
  </div>
</template>

<script>
import loginValidation from '@/mixins/loginValidation.js'
import Form from '@/components/Form'
import Button from '@/components/Button'
import Alert from '@/components/Alert'
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  mixins: [validationMixin, loginValidation],
  validations: {
    name: { required, minLength: minLength(2) },
    password: { required, minLength: minLength(8) },
  },
  data: () => ({
    alert: {
      timeout: null,
      visible: false,
      title: '',
      message: ''
    },
    name: '',
    password: '',
    buttonDisabled: false
  }),
  methods: {
    closeModal(){
      this.alert.visible = false
      clearTimeout(this.alert.timeout)
      this.alert.timeout = null
    },
    async submit () {
      this.$v.$touch()
      if(this.$v.$invalid)
        return
      const data = {
        username: this.name,
        password: this.password
      }
      this.buttonDisabled = true
      try {
        await this.$store.dispatch('login', data)
        this.name = ''
        this.password = ''
        this.$v.$reset()
        this.buttonDisabled = false
        this.$router.push('/')
      }catch(err){
        const {data: {message, status}} = err
        this.alert.title = status
        this.alert.message = message
        this.alert.visible = true
        this.alert.timeout = setTimeout(() => {
          this.closeModal()
        }, 4000)
        this.buttonDisabled = false
      }
    }
  },
  components:{
    Form, Button, Alert
  }
}
</script>

