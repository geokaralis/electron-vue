module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  chainWebpack: config => {
    config.plugins
      .delete('split-manifest')
      .delete('inline-manifest')
  }
  // configureWebpack: {
  //   output: {
  //     path: __dirname + '/dist'
  //   },
  //   resolve: {
  //     alias: {
  //       '@': __dirname + '/renderer'
  //     }
  //   },
  //   entry: {
  //     app: './renderer/main.js'
  //   }
  // }
}