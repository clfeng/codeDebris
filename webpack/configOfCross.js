// vue-cli实现跨域


// 在config/index.js下的dev对象中添加
    proxyTable: {
     '/api': {
       target: 'http://47.92.28.40:8080',
       changeOrigin: true,
       pathRewrite: {
         '^/api': ''
       }
     }
    }
  },
// 当请求的时'/api/path','/pai'会自动匹配上面的代理于是便可以实现跨域
// 使用axios的话,可以在main.js页面设置axios.defaults.baseURL = '/api'实现请求路径自动添加'/api'