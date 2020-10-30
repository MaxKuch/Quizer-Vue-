export default {
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
      !this.$v.password.minLength 
      && errors.push(`Пароль должен содержать хотя бы ${this.$v.password.$params.minLength.min} символов`)
      !this.$v.password.required 
      && errors.push('Введите пароль')
      return errors
    }
  }
}