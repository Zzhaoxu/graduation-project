<template>
  <div class="first">
    <!-- ffffhfbhfbwejhfbwjhfbewhjbfwehfbwjhfbewhj -->
    <img src="https://7072-prowaimai-0gjxo97if0659c49-1301433395.tcb.qcloud.la/user_photo/screen%402x.jpg?sign=f4e9095528c9daea312e91cb6a2c3b3d&t=1648030429" alt="">
  </div>
</template>
<script>
export default {
  name:'HelloWorld',
  onLoad(){
    this.pageStart()
  },
  data () {
    return {
    }
  },
  methods: {
     pageStart(){
       setTimeout(function(){
         wx.reLaunch({
         url:'/pages/guide/main',
      });
    },4000)
  }
},
  components: {
     
  }
}
</script>
<style scoped>
  .first,img{
     width: 100%;
     height: 100%;
   }
</style>