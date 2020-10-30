export default {
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
    }
  }
}