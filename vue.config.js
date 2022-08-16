const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave:false,
  transpileDependencies: true,
  configureWebpack:{
    resolve:{
      alias:{
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views'
      }
    }
  }
})
