<template>
  <div class="wrapper login-page">
    <Alert 
      :visible="alert.visible" 
      :title="alert.title" 
      :message="alert.message"
      :closeModal="closeModal"
    />
    <Form :title="'Зарегистрируйтесь'">
      <v-text-field
        v-model="$v.name.$model"
        :error-messages="nameErrors"
        label="Ваш ник"
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="$v.email.$model"
        :error-messages="emailErrors"
        label="Ваш E-mail"
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="$v.password.$model"
        :error-messages="passwordErrors"
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
        type="password"
        label="Пароль"
      ></v-text-field>
      <v-text-field
        v-model="$v.repeatPassword.$model"
        :error-messages="repeatPasswordErrors"
        @input="$v.repeatPassword.$touch()"
        @blur="$v.repeatPassword.$touch()"
        type="password"
        label="Повторите пароль"
      ></v-text-field>
      <div class="d-flex justify-center mt-5">
        <Button :disabled="buttonDisabled" :type="'submit'" :onClick="submit">
          Зарегистрироваться
        </Button>
      </div>
    </Form>
  </div>
</template>

<script>
import registrationValidation from '@/mixins/registrationValidation.js'
import Form from '@/components/Form'
import Button from '@/components/Button'
import Alert from '@/components/Alert'
import { validationMixin } from 'vuelidate'
import { required, sameAs, email, minLength } from 'vuelidate/lib/validators'
export default {
  data: () => ({
      alert: {
        timeout: null,
        visible: false,
        title: '',
        message: ''
      },
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
      buttonDisabled: false
  }),
  mixins: [validationMixin, registrationValidation],
  validations: {
    name: { required, minLength: minLength(2) },
    email: { required, minLength: minLength(5), email},
    password: { required, minLength: minLength(8) },
    repeatPassword: { required, sameAsPassword: sameAs('password') },
  },
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
        email: this.email,
        password: this.password
      }
      this.buttonDisabled = true
      try{
        await this.$store.dispatch('register', data)
        this.name = ''
        this.email = ''
        this.password = ''
        this.repeatPassword = ''
        this.$v.$reset()
        this.buttonDisabled = false
        this.$router.push('/')
      } catch(err){
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

