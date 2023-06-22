<!--
 * @Descripttion: 
 * @version: 
 * @Author: 00289
 * @Date: 2022-05-10 11:29:53
 * @LastEditors: Zzhaoxu
 * @LastEditTime: 2022-05-12 23:37:11
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: 00289
 * @Date: 2022-05-09 19:16:04
 * @LastEditors: Zzhaoxu
 * @LastEditTime: 2022-05-09 19:26:29
-->
<template>
  <div>
    <!-- <cu-custom bgColor="bg-gradual-green" isBack="true"><view slot="backText">返回</view><view slot="content">关于</view></cu-custom> -->
    <view class='margin-xl bg-white padding-xl radius shadow-lg'>
    <view class='text-center margin-bottom text-lg  text-grey'>医生简介</view>
    <view class='text-content'>
    <view class='margin-top-sm photo'>{{doctorInfo.name}}</view>
    <view class='margin-top-sm photo'>
      <img style="width:180rpx;height:180rpx" :src="doctorInfo.photo" alt="">
    </view>
    <view>职称:主任医师</view>
    <view class='margin-top-sm'>所在科室:{{doctorInfo.office}}</view>
    <view class='margin-top-sm'>医生特长:{{doctorInfo.advantage}}</view> 
    <view class='margin-top-sm'>医生排班:{{doctorInfo.workDate}}</view>
    <view class='margin-top-sm photo'>
      <van-button round size="small"  @click="toVisit" type="info">立即预约</van-button>
    </view>
  </view>
</view>
  </div>
</template>
<script>
export default {
  name:'',
  data () {
    return {
      doctorId:'',
      doctorInfo:[]
    }
  },
  mounted() {
    console.log(this)
    this.doctorId = this.$mp.query.id
    this.getDoctorInfo()
  },
  methods: {
     getDoctorInfo(){
       let _this = this
       let uid = this.doctorId
       // 1. 获取数据库引用
        wx.cloud.init()
				const db = wx.cloud.database({
				  env: 'prowaimai-0gjxo97if0659c49'
				})
        // 2. 构造查询语句
        // collection 方法获取一个集合的引用
        db.collection('doctorList').where({id:parseInt(uid)}).get().then(res=>{
          console.log(res,uid)
          _this.doctorInfo = res.data[0]
        })
        },
        // 立即预约的按钮
        toVisit(){
          let _this = this
          wx.navigateTo({
            url: `/pages/previsit/main?id=${_this.doctorId}&doctorInfo=${_this.doctorInfo}`,
          });
        }
  },
  components: {
     
  }
}
</script>
<style scoped>
.photo{
  width: 100%;
  text-align: center;
}
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