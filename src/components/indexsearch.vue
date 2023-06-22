<template>
  <div>
    <van-notice-bar
      scrollable="true"
      text="欢迎访问，欢迎访问，欢迎访问，欢迎访问，欢迎访问！"
    />
    <div class="top_bg">
          <div class="bg"></div>
          <img  src="cloud://prowaimai-0gjxo97if0659c49.7072-prowaimai-0gjxo97if0659c49-1301433395/bs_UI/home/icon-test@2x.png" alt="" class="scan">
          <div class="nav_search">
          <input type="text" placeholder = "请输入内容" class="input" v-model="searchVal">       
          <span class="iconfont icon-sousuo search" @click="searchSink"></span>
        </div>
          <img src="cloud://prowaimai-0gjxo97if0659c49.7072-prowaimai-0gjxo97if0659c49-1301433395/bs_UI/home/xinxi@2x.png" alt="" class="message">
    </div>
    <!-- 渲染的疾病信息列表 -->
    <Sink :searchVal = "searchVal" :sinkDesc = "sinkDesc"></Sink>
  </div>
</template>
<script>
import Sink from "./sink/index.vue"
//  const query = `?PAGE_NUM=${this.PAGE_NUM}&STRING=${this.STRING}`
const SINK_URL = 'https://aidisease.market.alicloudapi.com/ai_disease_search/elite'
const TOUTIAO = 'https://v.juhe.cn/toutiao/index'
export default {
 
  name:'Search',
  beforeMount(){
 
  },
  data () {
    return {
      
    }
  },
  methods: {}
}
</script>
<style scoped>
   body{
  width: 100%;
  height: 100%;
  /* background-color: #555; */
}
.bg{
  position: fixed;
  width: 100%;
  height: 2.5rem;
  top: 0;
  left: 0;
  /* background-image: linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%); */
   background-color: #5eB1FF;
  /* border-bottom-right-radius: 10%;
  border-bottom-left-radius: 10%; */
  border-bottom-right-radius: 10%;
  border-bottom-left-radius: 10%;
  z-index: -2;
}
.top_bg{
  width: 100%;
  height: 0.5rem;
  display: flex;
  margin: 0 auto;
  align-items: center;
  margin-top: 20rpx;
  justify-content: space-around;
  /* padding: 0 20rpx; */
  /* border: 1px solid red; */
  z-index: 10;
}
.scan{
  float: left;
  width: 40rpx;
  height: 40rpx;
  /* margin-left: 20rpx; */
  z-index: 10;
}
.input{
  width: 80%;
  height: 40rpx;
  padding:10rpx 0 10rpx  30rpx;
  color: #f8f8f8;
  margin: 0 auto;
  /* 默认content-box，盒子宽度=width+border+padding */
  box-sizing: content-box;
  background-color: rgba(255,255,255,0.4);
  z-index: 10;
}
.nav_search{
  /* position: relative; */
  float: left;
  display: flex;
  /* align-items: center; */
  justify-content: center;
  width: 70%;
  margin-left: -30rpx;
  /* height: 40rpx; */
  /* margin: 0 auto; */
  /* border: 1rpx solid red; */
  z-index: 10;
}
.search{
  float: right;
  /* height: 40rpx; */
  line-height: 40rpx;
  font-size:40rpx ;
  color: white;
  /* right: 17%;
  top: 15rpx; */
  padding:10rpx 30rpx;
  /* border-bottom-right-radius: 5%;
  border-top-right-radius: 5%; */
  background-color:rgba(255,255,255,0.4);
  z-index: 10;
}
.message{
  float: right;
  width: 48rpx;
  height: 48rpx;
  line-height: 48rpx;
  z-index: 10;
  margin-left: -40rpx;
}
</style>