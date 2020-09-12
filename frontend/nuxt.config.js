export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no,viewport-fit=cover' },//禁止用户缩放
      { name: 'X-UA-Compatible', content: 'ie=edge,chrome=1' },//优先使用 IE 最新版本和 Chrome
      { name: 'Cache-Control', content: 'no-siteapp' },//转码申明：用百度打开网页可能会对其进行转码（比如贴广告），避免转码
      { name: 'Cache-Control', content: 'no-transform' },//不得对资源进行转换或转变
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { hid: 'keywords', name: 'description', content: process.env.npm_package_description || '' },
      { name: 'renderer', content:'webkit'},//浏览器内核控制
      { name: 'robots', content:'index,follow'},//搜索引擎索引方式
      { name: 'googlebot', content:'index,follow'},//搜索谷歌引擎索引方式
      { name: 'google', content:'notranslate'},//谷歌翻译
    ],
    link: [
      {  hid: 'icon',rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {  rel:"stylesheet",href:'https://cdn.jsdelivr.net/npm/viewerjs@1.5.0/dist/viewer.min.css' },
      {  rel:"stylesheet",href:'https://cdn.jsdelivr.net/npm/prismjs@1.20.0/themes/prism-okaidia.min.css' },
      {  rel:"stylesheet",href:'https://cdn.jsdelivr.net/npm/prismjs@1.20.0/plugins/line-numbers/prism-line-numbers.min.css' },
    ],
    script:[
      // 加入百度统计js，使用时自行添加为自己的
      {src:'https://hm.baidu.com/hm.js?3fe14007f4e50044632c218e1f0d719c'},
      {src:'https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js'},
      {src:'https://cdn.bootcdn.net/ajax/libs/jquery.qrcode/1.0/jquery.qrcode.min.js'},
      {src:'https://cdn.staticfile.org/tocbot/4.11.1/tocbot.min.js'},
      {src:'https://cdn.jsdelivr.net/npm/prismjs@1.20.0/prism.min.js'},
      {src:'https://cdn.jsdelivr.net/npm/prismjs@1.20.0/plugins/autoloader/prism-autoloader.min.js'},
      {src:'https://cdn.jsdelivr.net/npm/prismjs@1.20.0/plugins/line-numbers/prism-line-numbers.min.js'},
      {src:'https://cdn.jsdelivr.net/npm/viewerjs@1.6.1/dist/viewer.min.js'},
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading:'./components/Loading',
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    './assets/scss/global.scss',
  ],
  styleResources:{
    scss:['./assets/scss/variable.scss']
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui','@/plugins/moment',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    ["@nuxtjs/axios",{anotherOption:true}],
    "@nuxtjs/apollo","@nuxtjs/markdownit",
    "@nuxtjs/style-resources",
  ],
  markdownit: {
    preset: "default",
    linkify: true,
    breaks: true,
    injected: true,
    html:true,
    anchorLinkSymbol:'',
    use:[
      "@/plugins/markdown-it-toc-and-anchor"
    ]
  },
  // Give apollo module options
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: "http://localhost:1337/graphql"
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  env: {
    strapiBaseUri: process.env.API_URL || "http://localhost:1337"
  },
}
