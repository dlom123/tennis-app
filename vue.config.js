module.exports = {
  configureWebpack: {
    // Configuration applied to all builds
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "~@/assets/sass/index.sass"`
      }
    }
  },
  chainWebpack: config => {
    ['vue-modules', 'vue', 'normal-modules', 'normal'].forEach(match => {
      config.module
        .rule('scss')
        .oneOf(match)
        .use('sass-loader')
        .tap(opt =>
          Object.assign(opt, { data: `@import '~@/assets/sass/index.sass';` })
        )
    })
  }
}
