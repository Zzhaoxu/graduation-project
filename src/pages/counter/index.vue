<template>
  <div>
    <van-empty description="该模块尚未开发，铁铁待会再来叭！" />
  </div>
</template>
<script>
export default {
  name:'HelloWorld',
  onLoad: function (options) {//此处接收传递过来的参数wx.navigateTo跳转时传递的参数
    //如果要在页面中使用
    this.title = options.title,
    this.setHeader()
  },
  data () {
    return {
      title:''
    }
  },
  methods: {
    setHeader: function (data) {
    wx.setNavigationBarTitle({
      title: this.title
    })
  }
  },
  components: {
     
  }
}
</script>
<style scoped>
   
</style>