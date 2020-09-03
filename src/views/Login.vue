<template>
  <div class="wrapper login-page">
    <Alert 
      :visible="alert.visible" 
      :title="alert.title" 
      :message="alert.message"
      :closeModal="closeModal"
    />
    <Form :title="'Войдите'">
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
import Form from '@/components/Form'
import Button from '@/components/Button'
import Alert from '@/components/Alert'
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  mixins: [validationMixin],
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
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.minLength && errors.push(`Никнейм должен содержать хотя бы ${this.$v.name.$params.minLength.min} символа`)
      !this.$v.name.required && errors.push('Введите никнейм')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors.push(`Пароль должен содержать хотя бы ${this.$v.password.$params.minLength.min} символов`)
      !this.$v.password.required && errors.push('Введите пароль')
      return errors
    },
  },
  methods: {
    closeModal(){
      this.alert.visible = false
      clearTimeout(this.alert.timeout)
      this.alert.timeout = null
    },
    submit () {
      this.$v.$touch()
      if(this.$v.$invalid)
        return
      const data = {
        username: this.name,
        password: this.password
      }
      this.buttonDisabled = true
      this.$store.dispatch('login', data)
      .then(() => {
        this.name = ''
        this.password = ''
        this.$v.$reset()
        this.buttonDisabled = false
        this.$router.push('/')
      })
      .catch((err) => {
        const {data: {message, status}} = err
        this.alert.title = status
        this.alert.message = message
        this.alert.visible = true
        this.alert.timeout = setTimeout(() => {
          this.closeModal()
        }, 4000)
        this.buttonDisabled = false
      })
    }
  },
  components:{
    Form, Button, Alert
  }
}
</script>

