module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  pluginOptions: {
    apollo: {
      enableMocks: true,
      enableEngine: true
    },
    i18n: {
      locale: 'es',
      fallbackLocale: 'es',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
