// vue.config.js
const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)

/** 正式配置项**/
module.exports = {
  indexPath: 'index.html', // 相对于打包路径index.html的路径
  outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
  assetsDir: 'static', // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: false, // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码，false不需要
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  parallel: require('os').cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  pwa: {}, // 向 PWA 插件传递选项。
  chainWebpack: config => {
    config.resolve.symlinks(true) // 修复热更新失效
    // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    config.plugin('html').tap(args => {
      // 修复 Lazy loading routes Error
      args[0].chunksSortMode = 'none'
      return args
    })
    // 压缩图片
    // 需要 npm i -D image-webpack-loader
    // config.module
    //     .rule("images")
    //     .use("image-webpack-loader")
    //     .loader("image-webpack-loader")
    //     .options({
    //         mozjpeg: { progressive: true, quality: 65 },
    //         optipng: { enabled: false },
    //         pngquant: { quality: [0.65, 0.9], speed: 4 },
    //         gifsicle: { interlaced: false },
    //         webp: { quality: 75 }
    //     });
  },
  // //webpack的配置项
  // configureWebpack: config => {
  //     // 开启 gzip 压缩
  //     // 需要 npm i -D compression-webpack-plugin
  //     const plugins = [];
  //     if (IS_PRODUCTION) {
  //         plugins.push(
  //             new CompressionWebpackPlugin({
  //                 filename: "[path].gz[query]",
  //                 algorithm: "gzip",
  //                 test: productionGzipExtensions,
  //                 threshold: 10240,
  //                 minRatio: 0.8
  //             })
  //         );
  //     }
  //     config.plugins = [...config.plugins, ...plugins];
  // },
  css: {
  //   extract: IS_PRODUCTION,
  //   requireModuleExtension: false,// 去掉文件名中的 .module
  //   loaderOptions: {
  //     sass: {
  //         prependData: `@import "@/assets/style/index.scss";`
  //       }
  //     }
  },
  devServer: {
    overlay: { // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
    host: '0.0.0.0',
    port: 9000, // 端口号
    https: false, // https:{type:Boolean}
    open: false, // 配置后自动启动浏览器
    hotOnly: true, // 热更新
    proxy: {
      // 配置多个跨域
      '/api': {
        target: 'http://localhost:9000',
        changeOrigin: true,
        ws: true, // websocket支持
        secure: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
