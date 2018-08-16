module.exports = {
  chainWebpack: config => {
    config.module
      .rule('objLoader')
      .test(/\.obj$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()

    config.module
      .rule('mtlLoader')
      .test(/\.mtl$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
  }
}
