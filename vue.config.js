module.exports = {
    transpileDependencies: ["@dcloudio/uni-ui", "uview-ui"],
    devServer: {
      proxy: {
        '/jisu': {
          target: 'https://api.jisuapi.com',
          changeOrigin: true,
          pathRewrite: {
            '^/jisu': ''
          }
        },
        "/binstd": {
          target: "https://api.binstd.com",
          changeOrigin: true,
          pathRewrite: {
            "^/binstd": ""
          }
        }
      }
    }
  }