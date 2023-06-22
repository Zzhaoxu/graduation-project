<template>
  <div>
    <div class="card">
      <!-- <div class="mid"> -->
        <div class="user">
        <text class="iconfont icon-shouji" ></text>
        <input @blur="checkPhone"  placeholder="请填写手机号" type="text"/>
      </div>
      <div class="pwd">
        <text class = "iconfont icon-mima"></text>
        <input @blur="checkPwd"  placeholder="请输入注册时的密码" type="password" name="" id=""/>
      </div>
      <!-- </div> -->
      <button @click="getInfo" class="btnL">立即登录</button>
    </div>
  </div>
</template>
<script>
export default {
  name:'Login',
  data () {
    return {
      //用户注册时的手机号
      userPhone:'',
      //用户注册时的密码
      userPwd:'',
      //用户输入的手机号
      uphone:'',
      //用户输入的密码
      upwd:'',
      //用户是否存在库中
      length:0,
      //判断用户是否已注册，默认未注册为false
      hasPhone:false
    }
  },
  mounted(){
    wx.cloud.callFunction({
      config:{
        env:'prowaimai-0gjxo97if0659c49'
      },
      name:"user",
      data:{},
			success:(res)=>{
				console.log(res.result.openid)
				//将openid放入本地缓存中
				wx.setStorageSync('openid', res.result.openid)
			},
			fail:(err)=>{
				console.log('获取openid失败',err)
			}
			})
  },
  methods: {
    checkPwd(e){
      console.log(e)
      this.upwd = e.mp.detail.value
      console.log(e)
    },
    checkPhone(e){
      this.uphone = e.mp.detail.value
      console.log(e)
    },
    //获取用户注册表的信息，用来验证该用户是否已注册,若注册过，则直接登录
    getInfo(){
      // var that = this
      if(!this.uphone||!this.upwd){
        wx.showToast({
          title: '请完善信息！',
          icon: 'none',
          duration: 1500,
        });
      }
      //防止多个环境造成冲突，特此声明环境
      wx.cloud.init({
        env: 'prowaimai-0gjxo97if0659c49',
        traceUser: true
      })
      // console.log(11)
      //查询用户信息表
      wx.cloud.database().collection('userPwd').where({
      phone: this.uphone
    })
    .get().then(res=>{
      console.log(res.data)
      console.log(22)
      console.log(res)
      console.log(res.data[0].phone)
      this.userPwd = res.data[0].pwd
      this.userPhone = res.data[0].phone
      this.length = res.data.length
      if(res.data.length ==1&&this.upwd==this.userPwd&&this.uphone==this.userPhone){
        wx.showToast({
          title: '登录成功!',
          icon: 'none',
          duration: 1500,
        });
        wx.switchTab({
          url: '/pages/index/main'
        });
      }else if(this.length==0){
        wx.showToast({
          title: '您还未注册！',
          icon: 'none',
          duration: 1500,
        });
      }else{
         wx.showToast({
          title: '密码有误！',
          icon: 'none',
          duration: 1500,
        });
    }



    })
    },
  components: {
     
  }
}
}
</script>
<style scoped>
  .btnL{
    
     width: 70%;
     height: 60rpx;
     line-height: 60rpx;
     font-size: 30rpx;
     background-image: linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%);
     /* background-color: #3d90e2; */
     color: white;
     margin-top: 100rpx;
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
   .mid{
     margin: 0 auto;
   }
   .btn{
     width: 150rpx;
     height: 60rpx;
     line-height: 60rpx;
     float: right;
     text-align: center;
     background-color: #3d90e2;
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
     color: rgb(56, 163, 163);
     /* color: linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%); */
     margin-left: 10rpx;
   }
</style>