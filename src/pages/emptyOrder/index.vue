<!--
 * @Descripttion: 
 * @version: 
 * @Author: 00289
 * @Date: 2022-05-14 11:26:47
 * @LastEditors: Zzhaoxu
 * @LastEditTime: 2022-05-14 14:41:36
-->
<template>
  <div>
    <van-empty description="没有查询到您的预约订单信息！" />
  </div>
</template>
<script>
export default {
  name:'Emptyorder',
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