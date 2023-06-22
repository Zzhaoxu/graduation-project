
<script>
export default {
  onShow() {
    // wx.hideTabBar()
  },
  // onLoad(){
  //   let allinfo = wx.getSystemInfoSync()
  //   console.log(allinfo.windowHeight)
  // },
  created () {
    //隐藏微信自带的底部tabbar
    // wx.hideTabBar()
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

    let logs
    if (mpvuePlatform === 'my') {
      logs = mpvue.getStorageSync({key: 'logs'}).data || []
      logs.unshift(Date.now())
      mpvue.setStorageSync({
        key: 'logs',
        data: logs
      })
    } else {
      logs = mpvue.getStorageSync('logs') || []
      logs.unshift(Date.now())
      mpvue.setStorageSync('logs', logs)
    }
  },
  log () {
    console.log(`log at:${Date.now()}`)
  }
}
</script>
<style>
/* @screenheight:allinfo.windowHeight; */
/* @import url('../static/colorui/main.wxss');
@import url('../static/colorui/icon.wxss');
@import url('../static/colorui/animation.wxss');
.pos-bottom{
  position: fixed !important;
  bottom:0px !important;
  width: 100% !important;
} */
*{
  margin: 0;
  padding: 0;
}
page{
  width: 100%;
  height: 100%;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}

/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
@font-face {
  font-family: "iconfont"; /* Project id 3246643 */
  src: url('//at.alicdn.com/t/font_3246643_lik8vn1svkd.woff2?t=1648038859036') format('woff2'),
       url('//at.alicdn.com/t/font_3246643_lik8vn1svkd.woff?t=1648038859036') format('woff'),
       url('//at.alicdn.com/t/font_3246643_lik8vn1svkd.ttf?t=1648038859036') format('truetype');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-mima:before {
  content: "\e65c";
}

.icon-yanzhengma:before {
  content: "\e647";
}

.icon-shouji:before {
  content: "\e669";
}

.icon-guanyu:before {
  content: "\e60e";
}

.icon-guanyuwomen:before {
  content: "\e600";
}

.icon-jibing:before {
  content: "\ec4d";
}

.icon-bianji:before {
  content: "\e620";
}

.icon-sousuo:before {
  content: "\e62f";
}

</style>
