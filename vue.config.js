module.exports = {
  css: {
    loaderOptions: {
      // `scss` syntax requires an semicolon at the end of a statement, while `sass` syntax requires none
      // in that case, we can target the `scss` syntax separately using the `scss` option
      scss: {
        prependData: `@import "~@/assets/_variables.scss";`
      },
    }
  }
}