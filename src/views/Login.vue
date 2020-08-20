<template>
  <div class="login-page">
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
        <Button :type="'submit'" :onClick="submit">
          Войти
        </Button>
      </div>
    </Form>
  </div>
</template>

<script>
import Form from '@/components/Form'
import Button from '@/components/Button'
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  mixins: [validationMixin],
  validations: {
    name: { required, minLength: minLength(2) },
    password: { required, minLength: minLength(8) },
  },
  data: () => ({
      name: '',
      password: '',
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
    submit () {
      this.$v.$touch()
      if(this.$v.$invalid)
        return
      const data = {
        name: this.name,
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

