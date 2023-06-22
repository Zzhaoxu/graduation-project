/*
 * @Descripttion: 
 * @version: 
 * @Author: 00289
 * @Date: 2022-03-14 08:25:51
 * @LastEditors: Zzhaoxu
 * @LastEditTime: 2022-06-06 14:19:32
 */
import Vue from 'vue'
import App from './App'
// const echarts = require('echarts')
import Fly from 'flyio/dist/npm/wx'
// import Echarts from "../plugin/echarts"
// import "../node_modules/echarts/map/js/china.js"

// Vue.use(Echarts)

//引入colorUI库
import '../static/colorui/main.wxss'
import '../static/colorui/icon.wxss'
import '../static/colorui/animation.wxss'


Vue.config.productionTip = false



// import * as VueJsonp from 'vue-jsonp'
// // Vue Plugin.
// Vue.use(VueJsonp)

// // Now you can use this.$jsonp in Vue components.
// Vue.$jsonp('/some-jsonp-url', {
//   myCustomUrlParam: 'veryNice'
// })


App.mpType = 'app'


let fly = new Fly
// 在原型上挂载flyio
Vue.prototype.$fly = fly
// Vue.prototype.$echarts = echarts

const app = new Vue(App)

app.$mount()

//使用微信的云开发
wx.cloud.init({
  traceUser: true
})