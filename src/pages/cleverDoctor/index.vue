<template>
  <div>
    <Chat></Chat>
  </div>
</template>
<script>
import Chat from '../../components/chat.vue'
export default {
  name:'HelloWorld',
  onLoad: function (options) {//此处接收传递过来的参数wx.navigateTo跳转时传递的参数
    //如果要在页面中使用
    this.title = options.title,
    this.setHeader()
  },
  data () {
    return {
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
     Chat
  }
}
</script>
<style scoped>
   
</style>