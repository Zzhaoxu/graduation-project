<template>
  <div>
    <Emptyorder v-if="hasOrder"/>
    <!-- <cu-custom bgColor="bg-gradual-green" isBack="true"><view slot="backText">返回</view><view slot="content">关于</view></cu-custom> -->
    <div v-else>
      <view  class='margin-xl bg-white padding-xl radius shadow-lg father' v-for="(item,index) in visitInfo" :key="index">
    <view class='text-center margin-bottom text-lg  text-grey'>预约信息单</view>
    <view class='text-content'>
    <view>医生职称:主任医师</view>
    <view class='margin-top-sm'>医生姓名:{{item.doctorName}}</view>
    <view class='margin-top-sm'>预约科室:{{item.doctorOffice}}</view>
    <view class='margin-top-sm'>身份证号:{{item.idCard}}</view> 
    <view class='margin-top-sm'>预约日期:{{item.visitDate}}</view>
    <view class='margin-top-sm'>预约时间:{{item.visitTime}}</view>
    <view class='margin-top-sm photo'>
      <van-button v-if="handleInfo[index].visitDate>canCancel"  round size="mini"  @click="cancelVisit" type="info">取消预约</van-button>
      <!-- <van-button v-if="handleInfo[index].visitDate>canCancel"  round size="mini"  @click="cancelVisit" type="info">返回首页</van-button> -->
      <div v-else class="expire">
        已完成的订单，无法取消预约
      </div>
    </view>
  </view>
</view>
    </div>
  </div>
</template>
<script>
import Emptyorder from '../../components/Emptyorder'
export default {
  name:'',
  data () {
    return {
      phone:'',
      // 预约记录
      visitInfo:[],
      // 处理的数据
      handleInfo:[],
      // 用来判断是否可以取消预约
      canCancel:0,
      hasOrder:true  //默认无订单
    }
  },
  mounted() {
    this.phone = wx.getStorageSync('phone')
    this.getVisitInfo()
    this.checkCancelOrder()
    console.log(this.phone)
    
  },
  
  methods: {
      // 处理订单数组
      filterList(){
        // 深拷贝
        let newArr = JSON.parse(JSON.stringify(this.visitInfo))
        console.log(newArr)
        this.handleInfo = newArr.map((item)=>{
          item.visitDate= Number(item.visitDate.replace(/-/g, ''))
          return item
        })
        // console.log(arr,this.visitInfo)
      },
      //判断是否可用取消预约
      checkCancelOrder(){
        let a=this.dateFormatter(Date.now(),1)
        console.log(a)
        // 全局匹配-
        let nowTime = a.replace(/-/g, '');
        this.canCancel = Number(nowTime)
      },
      // 时间格式化
      dateFormatter(val, type) {
        var date = new Date(val);
        var year = date.getFullYear()  // 年
        var month = date.getMonth() + 1  // 月
        var day = date.getDate()      // 日
        var hour = date.getHours()    // 时
        var minute = date.getMinutes()  // 分
        var seconds = date.getSeconds()  //秒
        // 补0
        if (month < 10) { month = `0${month}` }
        if (day < 10) { day = `0${day}` }
        if (hour < 10) { hour = `0${hour}` }
        if (minute < 10) { minute = `0${minute}` }
        if (seconds < 10) { seconds = `0${seconds}` }
        //今天
         var dates = `${year}-${month}-${day}`
        var day = `${year}-${month}-${day} ${hour}:${minute}:${seconds}`
        var time = `${hour}:${minute}:${seconds}`
        if (type == 1) {
          return dates;
        } else if (type == 2) {
          return day;
        } else if (type == 3) {
          return time;
        }
      },
    //获取预约记录
    getVisitInfo(){
       // 1. 获取数据库引用
        wx.cloud.init()
				const db = wx.cloud.database({
				  env: 'prowaimai-0gjxo97if0659c49'
				})
        db.collection('prvisitdoctor').where({phone:this.phone}).get().then(res=>{
          // console.log(res)
          this.visitInfo = res.data
          console.log(this.visitInfo)


          //表示没有预约信息
          if(!this.phone||this.visitInfo.length==0){
            console.log(this.phone,this.visitInfo)
            // wx.navigateTo({
            //   url: '/pages/emptyOrder/main',
            // });
            this.hasOrder = true
          }else{
            this.hasOrder = false
          }


          //处理数组
          this.filterList()
        })
    }, 
    // 取消预约
    cancelVisit(){
      wx.cloud.init()
				const db = wx.cloud.database({
				  env: 'prowaimai-0gjxo97if0659c49'
			})
      db.collection('prvisitdoctor').where({phone:this.phone}).remove({
        success: res=> {
          console.log(res)
          wx.showToast({
              title: '取消成功!',
              icon: 'none',
              duration: 1000,
              mask: false,
            });

          setTimeout(()=>{
            wx.wx.switchTab({
              url: '/pages/index/main',
            });
          },1000)
        }
})
    }
  },
  components: {
     Emptyorder
  }
}
</script>
<style scoped>
  .father{
    position: relative;
  }
  .expire{
    width: 100%;
    height: 50rpx;
    line-height: 50rpx;
    text-align: center;
    background-color: skyblue;
    color: white;
    bottom: 0;
    left: 0;
    position: absolute;
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
.photo{
  width: 100%;
  text-align: center;
}
</style>