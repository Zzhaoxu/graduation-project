<template>
  <div>
    <!-- <  class="scrollPage"> -->
  <div class="UCenter-bg">
    <image src="/images/logo.png" class="png" mode="widthFix"></image>
    <div class="text-xl">预约挂号平台
      <text class="text-df">v1.0.0</text>
    </div>
    <div class="margin-top-sm">
      <text>By:雪域冰城</text>
    </div>
    <image src="https://7072-prowaimai-0gjxo97if0659c49-1301433395.tcb.qcloud.la/user_photo/hospital.jpg?sign=4460c5c9f862c9c80f6b4e84b10f9513&t=1647915882" mode="scaleToFill" class="gif-wave"></image>
  </div>
  <!-- <div class="padding flex text-center text-grey bg-white shadow-warp">
    <div class="flex flex-sub flex-direction solid-right">
      <div class="text-xxl text-orange">{{visitTotal}}</div>
      <div class="margin-top-sm">
        <text class="cuIcon-attentionfill"></text> div</div>
    </div>
    <div class="flex flex-sub flex-direction solid-right">
      <div class="text-xxl text-blue">{{starCount}}</div>
      <div class="margin-top-sm">
        <text class="cuIcon-favorfill"></text> Star</div>
    </div>
    <div class="flex flex-sub flex-direction">
      <div class="text-xxl text-green">{{forksCount}}</div>
      <div class="margin-top-sm">
        <text class="cuIcon-fork"></text> Fork</div>
    </div>
  </div> -->
  <div class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius">
    <div class="cu-item arrow">
      <div class="content" bindtap="CopyLink" data-link="https://zzhaoxu.github.io">
        <text class="cuIcon-github text-grey"></text>
        <text class="text-grey">我的博客</text>
      </div>
    </div>
    <div class="cu-item arrow">
      <navigator  class="content" url="/pages/share/main" hover-class="none">
        <!-- <image src="/images/logo.png" class="png" mode="aspectFit"></image> -->
        
        <text class="cuIcon-tagfill text-pink"></text>
        <text class="text-grey">关于</text>
      </navigator>
    </div>
    <div class="cu-item arrow">
      <navigator class="content" url="/pages/about/log/log" hover-class="none">
        <text class="cuIcon-formfill text-green"></text>
        <text class="text-grey">日志</text>
      </navigator>
    </div>
    <!-- <div class="cu-item arrow">
      <div class="content" bindtap="showQrcode">
        <text class="cuIcon-appreciatefill text-red"></text>
        <text class="text-grey">赞赏支持</text>
      </div>
    </div>
    <div class="cu-item arrow">
      <button class="cu-btn content" >
        <text class="cuIcon-writefill text-cyan"></text>
        <text class="text-grey">意见反馈</text>
      </button>
    </div>
    <div class="cu-item arrow">
      <navigator class="content" url="/pages/about/test/list" hover-class="none">
        <text class="cuIcon-creativefill text-orange"></text>
        <text class="text-grey"></text>
      </navigator>
    </div> -->
  </div>
  <div class="cu-tabbar-height"></div>
<!-- </> -->
  </div>
</template>
<script>
export default {
  name:'HelloWorld',
  data () {
    return {
    }
  },
  methods: {
     
  },
  components: {
     
  }
}
</script>
<style scoped>
   .UCenter-bg {
  background-image: url(https://7072-prowaimai-0gjxo97if0659c49-1301433395.tcb.qcloud.la/user_photo/hospital.jpg?sign=83643c39245f4b970ef70780b617c4d8&t=1647915139);
  background-size: cover;
  height: 450rpx;
  display: flex;
  justify-content: center;
  padding-top: 40rpx;
  overflow: hidden;
  position: relative;
  flex-direction: column;
  align-items: center;
  color: #fff;
  font-weight: 300;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}

.UCenter-bg text {
  opacity: 0.8;
}

.UCenter-bg image {
  width: 200rpx;
  height: 200rpx;
}

.UCenter-bg .gif-wave{
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 99;
  mix-blend-mode: screen;  
  height: 100rpx;   
}
map,.mapBox{
  left: 0;
  z-index: 99;
  mix-blend-mode: screen;  
  height: 100rpx;   
}

map,.mapBox{
  width: 750rpx;
  height: 300rpx;
}
</style>