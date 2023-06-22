<template>
<!-- 顶部区域 -->
  <div class ="my">
    <div class="header">
      <div class="header_1">
         <img :src="userPhoto!=''?userPhoto:'/static/images/photo@2x.png'" alt=""/>
         <button open-type = "getUserInfo" lang="zh_CN" @getuserinfo = "login" class="btn" @click="getUserProfile" v-show="userPhoto!=''?false:true">获取头像</button>
          <span class="user" v-show="userPhoto!=''?true:flase">{{username}}</span>      
        <i class="iconfont icon-bianji edit"></i>
        
      </div>
      
    </div>
     <!-- 四个icon数据 -->
      <ul class="my_tab">
          <li @tap="visitOrder(index)" v-for="(item,index) of icon_myTab1" 
          :key="index"
          >
          <img :src="icon_myCommonurl+item.url" alt=""/>
          <span>{{item.info}}</span>
          </li>
      </ul>
      <!-- 设置关于等按钮 -->
      <ul class="my_tab1">
          <li  v-for="(item,index) of icon_myTab2" 
          :key="index"
          >
          <img :src="icon_myCommonurl+item.url" alt=""/>
          <span>{{item.info}}</span>
          <span class="detail">></span>
          </li>
      </ul>
  </div>
 
</template>
<script>
import eventBus from '../../eventBus'
import config from '@/utils/config'
// var qcloud = require('@/node_modules/wafer2-client-sdk/index.js');
import qcloud from "wafer2-client-sdk"
export default {
  name:'My',
  onLoad(){
    this.getIcon_my()
    //云函数调用   
    this.userOpenid()
  },
  data () {
    return {
      //默认头像
      photo:'',
      //用户昵称
      username:'',
      // 用户头像
      userPhoto:'',
      icon_myCommonurl:'',
      icon_myTab1:[],
      icon_myTab2:[],
      //用户的openId
      openId:''
    }
  },
  methods: {
    //查看预约订单信息
    visitOrder(e){
      if(e==0){
        wx.navigateTo({
          url: '/pages/resultInfo/main',
        });
      }else{
        return
      }
    },
    //兄弟组件传值给chat组件
    sendData(){
      eventBus.$emit('share',this.openId)
      },
    //获取用户openid
    userOpenid(){
      let that = this
      wx.cloud.callFunction({
      config:{
        env:'prowaimai-0gjxo97if0659c49'
      },
      name:"user",
      data:{
        username:that.username,
        openId:that.openId,
        photo:that.userPhoto
      },
      success(res){
        console.log(res,'event')
        console.log('请求云函数成功',res.result.event.userInfo.openId)
        that.openId = res.result.event.userInfo.openId
      },
      fail(err){
        console.log('请求云函数失败',err)
      }
    })
    },
    //将openid放入本地缓存中
    storageOpenid(){
      try {
      wx.setStorageSync('openid', this.openId)
    } catch (e) { }
    },
    //用户登录信息
    login(){
      qcloud.setLoginUrl(config.loginUrl);
      qcloud.login({
        success:userInfo=>{
          console.log('login登录成功',userInfo)
          this.loginSuccess(userInfo)
        },
        fail:err=>{
          console.log('login登录失败',err)
        }
      })
    },
    loginSuccess(userInfo){
      wx.setStorageSync('userinfo', userInfo);
    },
    // 获取用户信息
    getUserProfile(e) {
      console.log('profile',e)
       wx.getUserProfile({
      // desc: '业务需要'
      desc: '获取您的信息', 
      success: res => {
        //拿到信息处理业务
       console.log(res.userInfo,'成功profile');
       this.userPhoto = res.userInfo.avatarUrl
      //  console.log(this.photo)
       this.username = res.userInfo.nickName
       this.userOpenid()
      }
    })
  },

    //将登录用户的信息存入数据库
    saveInfo(){
      wx.cloud.callFunction
    },

 
    //获取my中的icon数据
    getIcon_my(){
      wx.cloud.init()
				const db = wx.cloud.database({
				  env: 'prowaimai-0gjxo97if0659c49'
				})
				const  data =db.collection('my').get({
				  success: res=> {
				    // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
					console.log(res.data[0])
          this.icon_myCommonurl = res.data[0].commonUrl
          this.icon_myTab1 = res.data[0].my.slice(0,4)
          this.icon_myTab2 = res.data[0].my.slice(4,7)
				  }
				})
    }
  },
  components: {
     
  }
}
</script>

<style scoped>
  .header{
  width: 100%;
  height: 2rem;
  background-color: #5eB1FF;
  }
  .header_1{
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 44rpx;
    width: 90%;
    height: 130rpx;
    line-height: 130rpx;
    margin: 0 auto;
  }
  .header_1 span{
    width: 75%;
    margin-left: 26rpx;
    color: white;
  }
  .header_1 .btn{
    width:40%;
    height: 90rpx;
    font-size: 26rpx;
    line-height: 90rpx;
    text-align: center;
    margin-left: 20rpx;
    background-color: rgba(255,255,255,0.4);
    color: white;
  }
  .header img{
    width: 114rpx;
    height: 114rpx;
    /* margin-right: 20rpx; */
    border: 4rpx solid white;
    overflow: hidden;
    border-radius: 50%;
    background-color: #fff;
}
.edit{
    display: block;
    float: right;
    font-size: 44rpx;
    color: white;
}
.my_tab{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  width:92%;
  height:160rpx;
  font-size: 24rpx;
  margin-top: 20rpx;
}  
.my_tab li{
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  /* margin: 0 auto; */
  width: 23%;
  height: 100%;
}
.my_tab li img{
  width: 60rpx;
  height: 60rpx;
  /* text-align: center; */
}

.my_tab1{
  display: flex;
  flex-direction: column;
  width: 90%;
  font-size: 28rpx;
  color: #666666;
  /* height: 85rpx; */
  margin: 0 auto;
}
.my_tab1 li{
  width: 100%;
  height: 85rpx;
}
.my_tab1 img{
  width: 40rpx;
  height: 40rpx;
  margin-right: 24rpx;
}
.my_tab1 .detail{
  float: right;
}
</style>