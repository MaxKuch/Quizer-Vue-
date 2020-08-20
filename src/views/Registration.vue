<template>
  <div class="login-page">
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
        <Button :type="'submit'" :onClick="submit">
          Зарегистрироваться
        </Button>
      </div>
    </Form>
  </div>
</template>

<script>
import Form from '@/components/Form'
import Button from '@/components/Button'
import { validationMixin } from 'vuelidate'
import { required, sameAs, email, minLength } from 'vuelidate/lib/validators'
export default {
  data: () => ({
      name: '',
      email: '',
      password: '',
      repeatPassword: ''
  }),
  mixins: [validationMixin],
  validations: {
    name: { required, minLength: minLength(2) },
    email: { required, minLength: minLength(5), email},
    password: { required, minLength: minLength(8) },
    repeatPassword: { required, sameAsPassword: sameAs('password') },
  },
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.minLength && errors.push(`Никнейм должен содержать хотя бы ${this.$v.name.$params.minLength.min} символа`)
      !this.$v.name.required && errors.push('Введите никнейм')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.minLength && errors.push(`E-mail должен содержать хотя бы ${this.$v.email.$params.minLength.min} символов`)
      !this.$v.email.required && errors.push('Введите E-mail')
      !this.$v.email.email && errors.push('E-mail должен иметь допустимый формат (name@mail.com)')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors.push(`Пароль должен содержать хотя бы ${this.$v.password.$params.minLength.min} символов`)
      !this.$v.password.required && errors.push('Введите пароль')
      return errors
    },
    repeatPasswordErrors () {
      const errors = []
      if (!this.$v.repeatPassword.$dirty) return errors
      !this.$v.repeatPassword.sameAsPassword && errors.push(`Пароли должны совпадать`)
      !this.$v.repeatPassword.required && errors.push('Повторите пароль')
      return errors
    },
  },
  methods: {
    submit () {
      this.$v.$touch()
      if(this.$v.$invalid)
        return
      const data = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      console.log(data)
    }
  },
  components:{
    Form, Button
  }
}
</script>

