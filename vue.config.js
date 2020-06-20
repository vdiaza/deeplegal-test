module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  pluginOptions: {
    apollo: {
      enableMocks: false,
      enableEngine: true,
      lintGQL: false,
    },
    i18n: {
      locale: 'es',
      fallbackLocale: 'es',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
