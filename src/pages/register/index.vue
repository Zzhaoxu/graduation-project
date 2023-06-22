<template>
  <div>
    <!-- <button @click="completeEnd">点击登录</button> -->
    <div class="bg"><text>登录注册</text></div>
    <div class="pic" v-show="false">
      <img src="https://7072-prowaimai-0gjxo97if0659c49-1301433395.tcb.qcloud.la/user_photo/register_D%402x.png?sign=f0b554d092cd9001352bcc341adac23f&t=1647961822" alt="">
    </div>
    <!-- <div class="cu-bar bg-white margin-top solid-bottom">
			<div class="action">
				<text class="cuIcon-title text-orange"></text> 登录/注册
			</div>
		</div> -->
		<div class="info">
      <scroll-view scroll-x class="bg-white nav">
			<div class="flex text-center">
				<div  class="cu-item flex-sub" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in list" :key="index" @tap="tabSelect" :data-id="index">
					{{item}}
				</div>
			</div>
    </scroll-view>
    </div>

    <!-- //登录注册面板 -->
    <Login v-if="TabCur===0"></Login>
    <Register v-if="TabCur===1"></Register>
  </div>
</template>
<script>
import Login from '../../components/login'
import Register from '../../components/register'
export default {
  
  name:'Register',
  data () {
    return {
      type:2,
			TabCur: 1,
			scrollLeft: 0,
      list:['登录','注册']
			};
  },
  methods: {
    login(){
      wx.switchTab({
        url: '/pages/index/main',
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    },
    tabSelect(e) {
      console.log(e.currentTarget.dataset.id)
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
    
  },
  components: {
     Login,
     Register
  }
}
</script>
<style scoped>
   .bg{
     width: 100%;
     height: 300rpx;
     /* background-color: #78b9f8; */
     background-image: linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%);
     color: white;
     font-size: 34rpx;
     font-weight: bold;
     text-align: center;
     /* margin-top: -90rpx; */
   }
   .bg text{
     display: flex;
     height: 200rpx;
     line-height: 200rpx;
     justify-content: center;
     /* float: left; */
     /* margin: 0 auto; */
     /* margin-top: 90rpx; */
   }
   .pic{
     position: fixed;
     top: 100rpx;
     right: 0;
     width: 50%;
     z-index: 10;
   }
</style>