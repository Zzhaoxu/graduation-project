<template>
  <div>
    <div class="card">
      <!-- <div class="mid"> -->
        <div class="user">
        <text class="iconfont icon-shouji" ></text>
        <input @blur="userJudge"  placeholder="请填写账号(4~8位)" type="text"/>
      </div>
      <div class="pwd">
        <text class = "iconfont icon-mima"></text>
        <input @blur="pwdJudge" placeholder="请输入密码(5~12位)" type="password" name="" id=""/>
      </div>
      <div class="phone">
        <text class="iconfont icon-shouji" ></text>
        <input @blur="phoneJudge"  placeholder="请填写手机号" type="text"/>
      </div>
      <div class="yzm">
        <text class = "iconfont icon-yanzhengma"></text>
        <input @blur="yzmJudge"   placeholder="请输入验证码" type="text" name="" id=""/>
        <button @click="apiMessage" :disabled = "!canSend" class="btn">{{content}}</button>
      </div>
      <!-- //正确是绑定register -->
      <button @click="register"   class="btnL">立即注册</button>
      </div>
      <!-- <van-count-down
      class="control-count-down"
      time="60000"
      :auto-start="!canSend"
      format="ss"
      @finish="Finished"

    /> -->
  </div>
</template>
<script>
var that = this
// var http = require('http')
// import Sms from '../../server/tools/sendsms.js'
// import { post } from 'server/controllers/message'
// const MSG = 'http://api.shansuma.com/gateway.do'
export default {
  name:'Register',
  data () {
    return {
      //控制发送按钮是否可用
      canSend:true,
      //发送验证码时间间隔
      time:'',
      //f
      content:'获取验证码',
      sec:60,
      username:'',
      // hasusername:false,
      pwd:'',
      phone:'',
      //表示数据库该用户是否存在
      Type:0,
      hasusername:false,
      haspwd:false,
      hasphone:false,
      hasyzm:false,
      //用来保存后端传来的验证码，这个是应该填入的验证码
      isYzm:'',
      //用来获取用户输入的验证码，进行两个验证码的匹配验证查看是否正确
      userYzm:''
    }
  },
  methods: {
    
    start(){
      // console.log(this) 
      let clock = setInterval(()=>{
        if(this.sec>0){
        this.canSend = false
        console.log(this.sec)
        this.sec-=1
        this.content = this.sec+'s后可申请'
        console.log(this.sec)
      }else{
        clearInterval(clock)
        this.canSend = true
        this.sec = 60
        this.content = '获取验证码'
      }},1000)
    },
        //  if(this.sec>0){
        //  this.canSend = false
        //  this.sec-- 
        //  console.log(this.sec)
        // //  return;
        //  }else{
        // this.canSend = true
        // }
        // this.sec = setTimeout(()=>{this.start()},1000)  
  
    startFinished() {
    Toast('倒计时结束');
  },
    saveuserPwd(){
          wx.cloud.callFunction({
            config:{
              env:'prowaimai-0gjxo97if0659c49'
            },
            name:"userPwd",
            data:{
              username:this.username,
              pwd:this.pwd,
              phone:this.phone
            },
            success:(res)=>{}
        })
        },
    // res.result.code
    //短信,用来传递验证码，进行登录
    apiMessage(){
      //发送验证码前先进行查库，看该用户是否已经注册
      //防止多个环境造成冲突，特此声明环境
      wx.cloud.init({
        env: 'prowaimai-0gjxo97if0659c49',
        traceUser: true
      })
      // console.log(11)
      //查询用户信息表
      wx.cloud.database().collection('userPwd').where({
      phone: this.phone
      //then里面的属于微任务，会先将其放入微任务队列，暂不执行   任务栈   --->微任务--->宏任务
    }).get().then(res=>{
      if(res.data.length==1){
        console.log(res.data.length)
        wx.showToast({
             title: '该手机号已注册!',
             icon: 'none',
             duration: 1500,
             mask: false,
           });
           this.Type = res.data.length
           console.log(this,this.Type)
           this.canSend = false
           this.content = '不可请求!'
           return;
      }
     else if(this.hasphone && this.Type!=1){
        this.start()
        wx.showToast({
             title: '验证码已发送!',
             icon: 'none',
             duration: 1500,
             mask: false,
           });
        // console.log(this)
        // 发送验证码
      wx.cloud.callFunction({
      config:{
        env:'prowaimai-0gjxo97if0659c49'
      },
      name:"sms",    
      data:{
        // username:this.username,
        // pwd:this.pwd,
        // 传递手机号给后台函数进行处理
        phone:this.phone
      },
      success:(res)=>{
        console.log('为了获取code',res.result.code)
        // 将验证码信息存入到前台变量isYzm中
        this.isYzm = res.result.code
      }
      })
        }else{
          wx.showToast({
             title: '手机号有误!',
             icon: 'none',
             duration: 1500,
             mask: false,
           });
        }
    })
      // console.log(first)
      },
        register(){
          //开启倒计时
          // this.start()
          // console.log('first')
          if(this.userYzm !=this.isYzm){
            wx.showToast({
             title: '验证码输入有误！',
             icon: 'none',
             duration: 1500,
             mask: false,
           });
          }
         else if(this.hasusername&&this.haspwd&&this.hasphone&&this.hasyzm&&this.userYzm ==this.isYzm){
           console.log('保证所有信息都是正确的，此时可以将信息存入数据库')
           //将信息存入数据库 通过云函数
           this.saveuserPwd()
           wx.showToast({
                 title: '注册成功',
                 icon: 'success',
                 duration: 1500,
                 mask: false,
               });
            wx.switchTab({
             url: '/pages/index/main',
           });
          //  this.apiMessage()
         }else{
           wx.showToast({
             title: '信息填写有误或不完整',
             icon: 'none',
             duration: 1500,
             mask: false,
           });
           console.log(this.hasusername,this.haspwd,this.hasphone,this.hasyzm,this.userYzm ==this.isYzm)
         }
         },
        
        userJudge(e,label){
        console.log(e)
        let a = e.mp.detail.value
          // 输入的信息为空
          if(!a){
            wx.showToast({
              title: '账号不能为空',
              icon: 'none',
              duration: 1500,
              mask: false,
            });
            return false
          }else{
            // 正则验证账号输入是否合法，4-12位
            var uPattern = /^[a-zA-Z0-9_-]{4,8}$/;
            if(!uPattern.test(a)){
              wx.showToast({
              title: '请输入4-8位账号',
              icon: 'none',
              duration: 1500,
              mask: false,
            });
            // return false
            }else{
            console.log(this)
            // this.hasusername = true
            this.username = a.trim()
            this.hasusername = true
            // return true
          }
          }
          
        },
        pwdJudge(e){
          let a = e.mp.detail.value
        console.log(e)
          // 输入的密码为空
          if(!a){
            wx.showToast({
              title: '密码不能为空',
              icon: 'none',
              duration: 1500,
              mask: false,
            });
            return false
          }else{
            // 正则验证密码输入是否合法，5-12位
            var uPattern = /^[a-zA-Z0-9_-]{5,12}$/;
            if(!uPattern.test(a)){
              wx.showToast({
              title: '请输入5-12位密码',
              icon: 'none',
              duration: 1500,
              mask: false,
            });
            return false
            }else{
            console.log(this)
            // this.hasusername = true
            this.pwd = a.trim()
            this.haspwd = true
            return true
          }
          }
        },
        phoneJudge(e){
        console.log(e)
        let a = e.mp.detail.value
          // 输入的信息为空
          if(!a){
            wx.showToast({
              title: '手机号不能为空',
              icon: 'none',
              duration: 1500,
              mask: false,
            });
            return false
          }else if(a) {
            // 正则验证手机号输入是否合法，11位
            var mPattern = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
            if(!mPattern.test(a)){
              wx.showToast({
              title: '该手机号不存在',
              icon: 'none',
              duration: 1500,
              mask: false,
            });
            // return false
            }else{
            console.log(this)
            // this.hasusername = true
            this.phone = a.trim()
            this.hasphone = true
            return true
          }
          }
        },
        // 填写了手机号之后，点击按钮，然后填写验证码
        yzmJudge(e){
          // 获取用户输入的验证码
          this.userYzm = e.mp.detail.value
          if(this.userYzm ==this.isYzm){
            this.hasyzm =true
            // wx.showToast({
            //   title: '验证码已发送！',
            //   icon: 'none',
            //   duration: 1500,
            //   mask: false,
            // });
            //输入的手机号正确,请求验证码
            // this.apiMessage()
          }else{  //代表手机号输入有误
            wx.showToast({
              title: '验证码输入有误!',
              icon: 'none',
              duration: 1500,
              mask: false,
            });
            return false
          }
        },
        
  },
  components: {
     
  }
}
</script>
<style scoped>
   .btnL{
     width: 70%;
     height: 60rpx;
     line-height: 60rpx;
     font-size: 30rpx;
     /* background-color: #3d90e2; */
     background-image: linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%);
     color: white;
     margin-top: 20rpx;
   }
   .card{
     width: 88%;
     height: 600rpx;
     background-color: white;
     border-radius: 10%;
     margin: 0 auto;
     padding: 40rpx;
     margin-top: 40rpx;
     color: black;
   }
   /* .mid{
     margin: 0 auto;
   } */
   .btn{
     width: 150rpx;
     height: 60rpx;
     line-height: 60rpx;
     float: right;
     text-align: center;
     /* background-color: #3d90e2; */
     background-image: linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%);
     border-radius: 10%;
     font-size: 18rpx;
     color: white;
     margin: 0;
   }
   .user, .pwd, .yzm, .phone{
     display: flex;
     width: 90%;
     height: 100rpx;
     align-items: flex-end;
     /* background-color: #fff; */
     border-bottom: 1px solid #f1f1f1;
   }
   .card text{
     font-size: 44rpx;
     /* color: rgb(56, 163, 163); */
     color: linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%);
     margin-left: 10rpx;
   }
</style>