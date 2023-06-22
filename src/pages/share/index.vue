<template>
  <div>
    <!-- <cu-custom bgColor="bg-gradual-green" isBack="true"><view slot="backText">返回</view><view slot="content">关于</view></cu-custom> -->
    <view class='margin-xl bg-white padding-xl radius shadow-lg'>
    <view class='text-center margin-bottom text-lg  text-grey'>关于该程序</view>
    <view class='text-content'>
    <view>Hi！首先，欢迎访问！</view>
    <view class='margin-top-sm'>该项目是个人开发的一款关于提供网上医疗服务的微信小程序，当时开发的主要目的意图为毕业设计。这个项目开发工具为VSCODE（编写DEMO）+微信开发者工具（预览效果）+ADOBEXD+PHOTOSHOP(切图)，前端用到的主要技术为MPVUE+云开发（云函数+云存储+云数据库），后端用到的主要技术为NODE.JS+KOA2。该程序后续会一直更新，如果您发现有什么问题或者更好地建议，欢迎您提出建议给我，或者可以在GitHub里提交给我，我会加入到扩展里。</view>
    <view class='margin-top-sm'>我的个人博客地址为：https://zzhaoxu.github.io</view>
    <view class='margin-top-sm'>希望这个项目有帮到你，如果你觉得很赞，可以在GitHub里给ME支持一下！</view> 
    <view class='margin-top-sm'>更多功能敬请期待！</view>
  </view>
</view>
  </div>
</template>
<script>
export default {
  name:'Share',
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
  background-image: url(https://image.weilanwl.com/color2.0/index.jpg);
  background-size: cover;
  height: 700rpx;
  display: flex;
  justify-content: center;
  padding-top: 40rpx;
  overflow: hidden;
  position: relative;
  flex-direction: column;
  align-items: center;
  color: #fff;
  font-weight: 300;
  text-shadow: 0 0 3px rgba(0,0,0,0.3);
}
.UCenter-bg text{
  opacity: 0.8;
}
.UCenter-bg image {
  width: 250rpx;
  height: 250rpx;
}

.UCenter-bg .animation-wave {
  position: absolute;
  bottom: 0;
}

</style>