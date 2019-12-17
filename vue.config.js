const path = require('path')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

function resolve (dir) {
  return path.join(__dirname, './', dir)
}

module.exports = {
  configureWebpack: {
    /* plugins: [
      new BundleAnalyzerPlugin()
    ] */
    module: {
      rules: [{
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: ['style', 'css', 'sass']
      }]
    }
  },
  productionSourceMap: false, // 是否生成map文件
  chainWebpack: config => {
    if (process.env.ANALYZE) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
    /* config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin) */
    // svg loader
    const svgRule = config.module.rule('svg') // 找到svg-loader
    svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
    svgRule // 添加svg新的loader处理
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    // 修改images loader 添加svg处理
    const imagesRule = config.module.rule('images')
    imagesRule.exclude.add(resolve('src/icons'))
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true
      })
      .end()
  },
  devServer: {
    proxy: {
      '/service': {
        // target: 'http://192.168.20.31:8083', // 添
        // target: 'http://192.168.20.32:8083', // 小凤
        // target: 'http://172.18.16.28:8084',
        target: 'https://qkt-api-test.uedu100.com',
        // target: 'https://qkt-api-dev.uedu100.com',
        // target: 'http://192.168.1.29:8999/mockjsdata/43',
        changeOrigin: true, // 开启代理
        pathRewrite: { '^/service': '/service' } // 这里重写路径/run就代理到对应地址
      },
      '/security': {
        // target: 'http://192.168.20.31:8083',
        // target: 'http://192.168.20.32:8081',
        // target: 'http://172.18.16.28:8084',
        target: 'https://qkt-api-test.uedu100.com',
        // target: 'https://qkt-api-dev.uedu100.com',
        // target: 'http://192.168.1.29:8999/mockjsdata/43',
        changeOrigin: true, // 开启代理
        pathRewrite: { '^/security': '/security' } // 这里重写路径/run就代理到对应地址
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/math/'
    : ''
}
