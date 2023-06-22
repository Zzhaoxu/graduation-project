<!--
 * @Descripttion: 
 * @version: 
 * @Author: 00289
 * @Date: 2022-05-08 21:20:46
 * @LastEditors: Zzhaoxu
 * @LastEditTime: 2022-05-16 20:42:16
-->
<template>
  <div class="container">
    <div class="tip">医生信息录入系统</div>
    
    <div class="form">
      <form @submit="formSubmit">
      <van-field required @blur="getName" v-model="name"  type="text" label="姓名：" placeholder="请输入姓名"/>
      <van-field required @blur="getPhone" v-model="phone"  type="text" label="手机号：" placeholder="请输入手机号"/>
      
      <!-- 职称信息 -->
      <div @tap="showZPopup">
      <van-field @blur = "getPosition" v-model="position" readonly  required label="职称信息:" placeholder="请选择职称" />
      </div>
      <van-popup  :show="Zshow" @close="onZClose"  round position="bottom"
      custom-style="height: 50%;border-top-left-radius: 25px;border-top-right-radius: 25px;">
      <van-picker   round show-toolbar :columns="positionList" :default-index="2"  @cancel="onZClose"
      @confirm="onZConfirm"/>
      </van-popup>

      <!-- 星期几出诊 -->
      <van-checkbox-group class="info" @change= "weekSelect" v-model="weekWork" direction="horizontal">
        <van-checkbox  class="vancheck"  name="星期一">星期一</van-checkbox>
        <van-checkbox  class="vancheck" name="星期二">星期二</van-checkbox>
        <van-checkbox  class="vancheck" name="星期三">星期三</van-checkbox>
        <van-checkbox  class="vancheck" name="星期四">星期四</van-checkbox>
        <van-checkbox  class="vancheck" name="星期五">星期五</van-checkbox>
        <van-checkbox  class="vancheck" name="星期六">星期六</van-checkbox>
        <van-checkbox  class="vancheck" name="星期日">星期日</van-checkbox>
      </van-checkbox-group>
      <!-- 所属科室 -->
      <div @tap="showTPopup">
      <van-field @blur = "getOffice" v-model="office" readonly  required label="所属科室:" placeholder="选择就诊科室" />
      </div>
      <van-popup  :show="Tshow" @close="onTClose"  round position="bottom"
      custom-style="height: 50%;border-top-left-radius: 25px;border-top-right-radius: 25px;">
      <van-picker   round show-toolbar :columns="officeList" :default-index="2"  @cancel="onTClose"
      @confirm="onTConfirm"/>
      </van-popup>

      <!-- 上传照片 -->
      <!--  -->
      <div v-show="photoUrl" class="img">
        <image mode="widthFix" class="myimg"  :src="photoUrl" alt=""/>
      </div>
      <!--  v-else -->
      <van-button    @tap="upImage">上传照片</van-button>
      
     
        <textarea placeholder="请补充专业特长" name="textarea"/>
        <van-button class="btn" form-type="submit" @tap = "formSubmit"  type="info" block round>提交</van-button>
     </form>
      <van-dialog id="myDialog"></van-dialog> 
    </div>
   
</div>

</template>

<script>
import Dialog from "../../../static/vantweapp/dialog/dialog"
export default {
  name:'',
  data () {
    return {
      name:'',
      phone:'',
      Tshow:false,
      Zshow:false,
      Yshow:false,
      Dshow:false,
      // 出诊星期几
      weekWork:[],
      positionList:['主任','副主任','医师','副医师'],
      position:'',
      // 选中的科室
      office:'',
      // 存放照片
      // doctorPhoto:'',
      officeList:['皮肤科','精神科','骨科中心','儿科','眼科','口腔科','疼痛科'],
      // 医生信息
      doctorInfo:'',
      //此医生的排班信息    '星期几'
      workDate:[],
      // 存放图片的临时路径
      tempFilePaths:'',
      // 用户的云存储地址
      photoUrl:'',
      // 医生擅长
      advantage:'',
      // 信息数据
      doctorDataLen:-1
    }
  },
 mounted() {
    this.getDbId()
  },
  methods: {
    formSubmit(e){
      console.log(e)
      this.advantage = e.target.value.textarea
      console.log(this.advantage.length)
      // return
      // this.insertDoctorInfo()
      if(this.doctorDataLen>=0&&this.name&&this.photoUrl&&this.advantage.length>20&&this.isPhone(this.phone)&&this.office&&this.weekWork){
        this.insertDoctorInfo()
        wx.showToast({
          title: '医生信息添加成功!',
          icon: 'none',
          duration: 800,
        });
      }else if(this.advantage.length<=20){
        wx.showToast({
          title: '特长不得少于20字',
          icon: 'none',
          duration: 800,
        });
      }else if(!this.isPhone(this.phone)){
        wx.showToast({
          title: '手机号不存在',
          icon: 'none',
          duration: 800,
        });
      }else{
         wx.showToast({
          title: '请完善信息后提交',
          icon: 'none',
          duration: 800,
        });
      }
    },
    weekSelect(e){
      this.weekWork = e.mp.detail
      console.log(this.weekWork.length)
    },
      // 上传图片
      upImage(){
        wx.chooseImage({
          count: 1,
          sizeType: ['original'],
          sourceType: ['album'],
          success: res=> {
            // tempFilePath可以作为img标签的src属性显示图片   临时地址
            this.tempFilePaths = res.tempFilePaths
            console.log(this.tempFilePaths)
            this.upImageToCloud()
          }
        })
      },
      // 上传图片到云端
      upImageToCloud(){
        // wx.cloud.init({
        //   env: 'prowaimai-0gjxo97if0659c49'
        // })
        wx.cloud.uploadFile({
          cloudPath: `${this.name}.png`, //仅为示例，非真实的接口地址
          filePath: this.tempFilePaths[0]     //图片的临时地址
        }).then(res=>{
          this.photoUrl = res.fileID
          console.log(this.photoUrl)
        }).catch(err=>{
          console.log('err',err)
        })
      },
      getName(e){
        console.log(e)
        this.name = e.target.value
      },
      getIdCard(e){
        this.idCard = e.target.value
      },
      getPhone(e){
        this.phone = e.target.value
        
      },
      getOffice(e){
        this.office = e.target.value
      },

      // 判断手机号
      isPhone(phone) {
          var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
          if (myreg.test(phone)) {
              return true;
          } else {
              return false;
          }
      },
      //获取总条数  确定插入id
  async  getDbId(){
      wx.cloud.init()
				const db = wx.cloud.database({
				  env: 'prowaimai-0gjxo97if0659c49'
				})
      let a =await db.collection('doctorList').count()
      this.doctorDataLen = a.total
      console.log(this.doctorDataLen)
    },
    // 添加数据到数据库
    insertDoctorInfo(e){
      wx.cloud.init()
				const db = wx.cloud.database({
				  env: 'prowaimai-0gjxo97if0659c49'
				})
				const  data =db.collection('doctorList').add({
          // data 字段表示需新增的 JSON 数据
          data: {
            id:this.doctorDataLen,
            name:this.name,
            photo:this.photoUrl,
            advantage:this.advantage,
            tel:this.phone,
            office:this.office,
            workDate:this.weekWork
          },
          success: function(res) {
            console.log(res)
          }
        })
    },
    // 就诊医生
    showTPopup(){
      this.Tshow = true
    },
    onTClose(){
      this.Tshow = false
    },
    showYPopup(){
      this.Yshow = true
    },
    onYClose(){
      this.Yshow = false
    },
    showZPopup(){
      this.Zshow = true
    },
    onZClose(){
      this.Zshow = false
    },
    onZConfirm(e){
      this.Zshow = false
      console.log(e)
      this.position = e.target.value
    },
    onTConfirm(e){
      this.Tshow = false
      console.log(e)
      this.office = e.target.value
    },
  },
  components: {

  }
}
</script>
<style scoped>
.vancheck{
  margin-bottom: 16rpx;
  /* flex: 0.33; */
  /* margin-right: 20; */
}
*{margin: 0;padding:0;}
.info{
  /* display: flex; */
  width: 90%;
  padding: 30rpx;
  /* background-color: #fff; */
  margin: 0 auto;
  margin-bottom: 12rpx;
  color: #666;
}
.info p:first-child{
  margin-bottom: 14rpx;
}
.info p:nth-child(3){
  float:left;
}
.info p:nth-child(4){
  /* float:left; */
  color:#5eb1ff;
  font-weight: 600;
}
.container{
    padding: 0;
    justify-content: flex-start !important;
}
.tip{
    height: 80rpx;
    line-height: 80rpx;
    width: 90%;
    margin: 0 auto;
    text-align: center;
    background-color: #1989fa;
    color: white;
    font-weight: 400;
    font-size: 28rpx;
    margin-bottom: 20rpx;
}
.form{
    width: 90%;
    color: tomato;
}
.field-index--van-field{
    float: right !important;
}
radio,.radio{ transform:scale(.7) !important }

.van-picker__toolbar {
    border-radius: 20px !important;
}

.van-field__input{
    text-align: right !important;
}
.van-cell{
    /* padding: 20rpx 0 !important; */
}
.van-field__placeholder{
    text-align: right;
    color: #d6cccd !important;    
}
.van-cell__title{
    color: #4a4b4d;
    max-width: 260rpx !important;
}
.form{
    /* margin-bottom: 80rpx; */
}
.treaty, .message{
    width: 90%;
    margin: 0 auto;
    text-align: left;
    font-size: 24rpx;
    color: #4a4b4d;
}
.message{
    display: flex;
    justify-content: space-around !important;
}
.radio{
    /* width: 20rpx !important; */
}
.treaty{
    margin-bottom: 16rpx;
}


.btn{
    width: 90%;
    margin: 40rpx auto;
}
.plain{
  width: 90%;
  padding: 30rpx;
  background-color: #fff;
  margin: 0 auto;
  margin-top: 12rpx;
  color: #666;
}
.myimg{
  width: 180rpx;
  /* height: 100rpx; */
  overflow: hidden;
}
.myimg{
  z-index: 20;
}
.mybtn{
  z-index: 10;
}
</style>