<template>
  <div class="guideSwiper">
    <swiper @change="getIndex" :indicator-dots="index!==2"   indicator-active-color = "blue" >
      <swiper-item>
        <img src="https://7072-prowaimai-0gjxo97if0659c49-1301433395.tcb.qcloud.la/user_photo/guide_1%402x.jpg?sign=c29e1d44d77b7c64d974bd5c5b923bd3&t=1647957305" alt="">
      </swiper-item>
      <swiper-item>
        <img src="https://7072-prowaimai-0gjxo97if0659c49-1301433395.tcb.qcloud.la/user_photo/guide_2%402x.jpg?sign=dbe7ebdfeb3978e9aa6bc8f8b1f97476&t=1647957343" alt="">
      </swiper-item>
      <swiper-item>
        <img src="https://7072-prowaimai-0gjxo97if0659c49-1301433395.tcb.qcloud.la/user_photo/guide_3%402x.jpg?sign=635e481ee337c494cfea2618c063e012&t=1647957359" alt="">
      </swiper-item>
    </swiper>
    <button class="btn" @click="experience" v-show="index===2">立即体验</button>
  </div>
</template>
<script>
export default {
  name:'HelloWorld',
  data () {
    return {
      index:0
    }
  },
  methods: {
     getIndex(e){
       console.log(e)
       this.index = e.mp.detail.current
     },
     experience(){
       wx.navigateTo({
         url:'/pages/register/main',
         success: (result)=>{
           
         },
         fail: ()=>{},
         complete: ()=>{}
       })
     }
  },
  components: {
     
  }
}
</script>
<style scoped>
  .guideSwiper,swiper,swiper-item,img{
    width: 100%;
    height: 100%;
  }
  .btn{
    width: 280rpx;
    height: 80rpx;
    position: absolute;
    text-align: center;
    line-height: 80rpx;
    color: white;
    left: 50%;
    margin-left: -140rpx;
    bottom:50rpx;
    background: #7183fe;
  }
</style>