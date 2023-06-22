<!--
 * @Descripttion: 
 * @version: 
 * @Author: 00289
 * @Date: 2022-05-08 21:20:46
 * @LastEditors: Zzhaoxu
 * @LastEditTime: 2022-06-06 20:01:00
-->
<template>
  <view class="container">
    <view class="tip">填写以下信息即可快速预约</view>
    <div class="info">
      <p>就诊医院:康健人民医院</p>
      <p style="margin-bottom:14rpx">挂号类型:专家门诊</p>
      <p>挂号费用:</p>
      <p>20元</p>
      <p>已被预约时间段:</p>
      <p v-for="(index,item) in hasVisitTime" :key="item">{{index}}</p>

    </div>
    <view class="form">
      <van-field required @blur="getName" v-model="name" type="text" label="姓名：" placeholder="请输入姓名" />
      <van-field required @blur="getPhone" v-model="phone" type="text" label="手机号：" placeholder="请输入手机号" />
      <van-field required @blur="getIdCard" v-model="idCard" type="text" label="身份证号：" placeholder="请输入身份证号" />
      <!-- 就诊科室 -->
      <view @tap="showTPopup">
        <van-field @blur="getOffice" v-model="office" readonly required label="就诊科室:" placeholder="选择就诊科室" />
      </view>
      <van-popup :show="false" @close="onTClose" round position="bottom" custom-style="height: 50%;border-top-left-radius: 25px;border-top-right-radius: 25px;">
        <van-picker round show-toolbar :columns="officeList" :default-index="2" @cancel="onTClose" @confirm="onTConfirm" />
      </van-popup>

      <!-- 就诊医生 -->
      <view @tap="showYPopup">
        <van-field @input="getDoctor" v-model="doctor" readonly required label="就诊医生:" placeholder="选择就诊医生" />
      </view>
      <van-popup :show="false" @close="onYClose" round position="bottom" custom-style="height: 50%;border-top-left-radius: 25px;border-top-right-radius: 25px;">
        <van-picker round show-toolbar :columns="doctorList" @cancel="onYClose" @confirm="onYConfirm" />
      </van-popup>
      <!-- 就诊日期： -->
      <view @tap="showJPopup">
        <van-field @input="getReturntime" readonly label="预约日期" v-model="detailDate" placeholder="选择预约日期" required />
      </view>
      <van-popup :show="Jshow" @close="onJClose" round position="bottom" custom-style="height: 50%;border-top-left-radius: 25px;border-top-right-radius: 25px;">
        <van-picker round show-toolbar :columns="timeList" @cancel="onJClose" @confirm="onJConfirm" />
      </van-popup>

      <!-- 就诊时间 -->
      <view @tap="showDPopup">
        <van-field v-model="detailTime" readonly required label="预约时间:" placeholder="选择预约时间" />
      </view>
      <van-popup :show="Dshow" @close="onDClose" round position="bottom" custom-style="height: 50%;border-top-left-radius: 25px;border-top-right-radius: 25px;">
        <van-area :show="Dshow" :area-list="visitTime" columns-num="2" @cancel="onDClose" @confirm="onDConfirm" />
      </van-popup>

    </view>
    <div class="plain">
      <p>预约说明:</p>
      <p>1、请注意核对就诊人姓名、身份证号等信息是否相符</p>
      <p>2、取消预约：请在就诊前一天24:00前取消预约或者拨打医院电话取消（8:00~17:00）</p>
      <p>3、已列入被预约时间项的时间段不可被再次预约!</p>
      <p>4、如遇医生紧急停诊，医院将通过电话或者短信的方式告知患者，如来不及通知，将由医院安排专业特长相近的医师接诊，或者由患者重新预约</p>
    </div>
    <van-button class="btn" @tap="submitInfo" type="info" block round>提交</van-button>
    <van-dialog id="myDialog"></van-dialog>
  </view>

</template>

<script>
import Dialog from "../../../static/vantweapp/dialog/dialog"
const vTime = require("../../utils/time.js")
export default {
  name: "",
  data() {
    return {
      name: "",
      phone: "",
      idCard: "",
      // 选择的就诊时间
      detailTime: "",
      // 就诊日期
      detailDate: "",
      Tshow: false,
      // 就诊医生
      doctor: "",
      doctorList: ["张三丰"],
      today: "",
      Jshow: false,
      Yshow: false,
      Dshow: false,
      // 获取明日后日日期数组
      dateList: [],
      index: 0,
      offset: 0,
      visitTime: Object.assign({}, vTime.default),
      // 选中的科室
      office: "",
      officeList: ["呼吸科", "外壳", "脑科", "菲克"],
      // 医生信息
      doctorInfo: "",
      //此医生的排班信息    '星期几'
      workDate: [],
      // 今日星期几
      currentDay: "",
      //周数组
      weekDay: [],
      // 日期数组  明日为第一项
      dateArr: [this.dateFormatter(Date.now(), 1.1), this.dateFormatter(Date.now(), 1.2), this.dateFormatter(Date.now(), 1.3), this.dateFormatter(Date.now(), 1.4), this.dateFormatter(Date.now(), 1.5), this.dateFormatter(Date.now(), 1.6), this.dateFormatter(Date.now(), 1.7)],
      // 筛选过后的时间  日期
      timeList: [],
      // 已预约的时间
      hasVisitTime: []
    }
  },
  mounted() {
    this.getDoctorInfo()

    // console.log('1212',this)
    // 获取今日日期
    // let todayDate = this.dateFormatter(Date.now(),1.1)
    // 今日星期几
    this.currentDay = new Date().toString().substr(0, 3) //Thu
  },
  methods: {
    getName(e) {
      console.log(e)
      this.name = e.target.value
    },
    getIdCard(e) {
      this.idCard = e.target.value
    },
    getPhone(e) {
      this.phone = e.target.value
    },
    getOffice(e) {
      this.office = e.target.value
    },
    //匹配医生的排班时间
    getDoctorWorkDate() {
      let arr = [{}, {}, {}, {}, {}, {}, {}]
      let arr1 = this.dateArr
      let arr2 = this.weekDay
      for (let i = 0; i < 7; i++) {
        arr[i].date = arr1[i]
        arr[i].weekday = arr2[i]
        // arr.push()
      }
      console.log(arr)
      let len = this.workDate.length
      this.timeList = []
      for (let a = 0; a < len; a++) {
        let c = arr.filter(item => {
          return item.weekday == this.workDate[a]
        })
        console.log(c)
        if (c) {
          this.timeList.push(c[0].date)
          console.log(this.timeList)
        }
      }
      console.log(this.timeList)
    },
    //获取星期
    getWeekDate() {
      // let day = new Date().toString().substr(0,3)
      let day = new Date().getDay()
      switch (day) {
        case 1:
          this.weekDay = ["星期二", "星期三", "星期四", "星期五", "星期六", "星期日", "星期一"]
          break
        case 2:
          this.weekDay = ["星期三", "星期四", "星期五", "星期六", "星期日", "星期一", "星期二"]
          break
        case 3:
          this.weekDay = ["星期四", "星期五", "星期六", "星期日", "星期一", "星期二", "星期三"]
          break
        case 4:
          this.weekDay = ["星期五", "星期六", "星期日", "星期一", "星期二", "星期三", "星期四"]
          break
        case 5:
          this.weekDay = ["星期六", "星期日", "星期一", "星期二", "星期三", "星期四", "星期五"]
          break
        case 6:
          this.weekDay = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
          break
        case 0:
          this.weekDay = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"]
          break
        default:
          break
      }
    },
    // 判断身份证号
    isIdCard(idCard) {
      //15位和18位身份证号码的正则表达式
      let regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
      //如果通过该验证，说明身份证格式正确，但准确性还需计算
      if (regIdCard.test(idCard)) {
        if (idCard.length == 18) {
          var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2) //将前17位加权因子保存在数组里
          var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2) //这是除以11后，可能产生的11位余数、验证码，也保存成数组
          var idCardWiSum = 0 //用来保存前17位各自乖以加权因子后的总和
          for (var i = 0; i < 17; i++) {
            idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i]
          }
          var idCardMod = idCardWiSum % 11 //计算出校验码所在数组的位置
          var idCardLast = idCard.substring(17) //得到最后一位身份证号码
          //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
          if (idCardMod == 2) {
            if (idCardLast == "X" || idCardLast == "x") {
              return true
            } else {
              return false
            }
          } else {
            //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
            if (idCardLast == idCardY[idCardMod]) {
              return true
            } else {
              return false
            }
          }
        }
      } else {
        return false
      }
    },

    // 判断手机号
    isPhone(phone) {
      var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      if (myreg.test(phone)) {
        return true
      } else {
        return false
      }
    },
    // 时间格式化
    dateFormatter(val, type) {
      var date = new Date(val)
      var year = date.getFullYear() // 年
      var month = date.getMonth() + 1 // 月
      var day = date.getDate() // 日
      var hour = date.getHours() // 时
      var minute = date.getMinutes() // 分
      var seconds = date.getSeconds() //秒
      // 补0
      if (month < 10) {
        month = `0${month}`
      }
      if (day < 10) {
        day = `0${day}`
      }
      if (hour < 10) {
        hour = `0${hour}`
      }
      if (minute < 10) {
        minute = `0${minute}`
      }
      if (seconds < 10) {
        seconds = `0${seconds}`
      }
      //今天
      let dates1 = `${year}-${month}-${Number(day) + 1}`
      // 明天
      var dates2 = `${year}-${month}-${Number(day) + 2}`
      var dates3 = `${year}-${month}-${Number(day) + 3}`
      var dates4 = `${year}-${month}-${Number(day) + 4}`
      var dates5 = `${year}-${month}-${Number(day) + 5}`
      var dates6 = `${year}-${month}-${Number(day) + 6}`
      var dates7 = `${year}-${month}-${Number(day) + 7}`
      var day = `${year}-${month}-${day} ${hour}:${minute}:${seconds}`
      var time = `${hour}:${minute}:${seconds}`
      if (type == 1.1) {
        return dates1
      } else if (type == 1.2) {
        return dates2
      } else if (type == 1.3) {
        return dates3
      } else if (type == 1.4) {
        return dates4
      } else if (type == 1.5) {
        return dates5
      } else if (type == 1.6) {
        return dates6
      } else if (type == 1.7) {
        return dates7
      } else if (type == 2) {
        return day
      } else if (type == 3) {
        return time
      }
    },
    //得到每个医生的排班日期
    getDoctorDate(weekDay) {
      // 得到本周7天的时间对应数据
      switch (weekDay) {
        case "星期一":
          return "Mon"
        case "星期二":
          return "Tue"
        case "星期三":
          return "Wed"
        case "星期四":
          return "Thu"
        case "星期五":
          return "Fri"
        case "星期六":
          return "Sat"
        case "星期日":
          return "Sun"
        default:
          break
      }
    },
    exportData() {
      for (let i = 52; i < 63; i++) {
        this.insertDoctorInfo(i)
      }
    },
    getDoctorInfo() {
      let _this = this
      let uid = this.$mp.query.id
      // 1. 获取数据库引用
      wx.cloud.init()
      const db = wx.cloud.database({
        env: "prowaimai-0gjxo97if0659c49"
      })
      // 2. 构造查询语句
      // collection 方法获取一个集合的引用
      db.collection("doctorList")
        .where({ id: parseInt(uid) })
        .get()
        .then(res => {
          console.log(res, uid)
          this.doctorInfo = ""
          this.doctorInfo = res.data[0]
          this.doctor = this.doctorInfo.name
          this.office = this.doctorInfo.office
          this.workDate = this.doctorInfo.workDate
          this.getWeekDate()
          this.getDoctorWorkDate()
          this.selectVisitTime()
        })
    },
    // 插入数据到数据库
    insertDoctorInfo(e) {
      wx.cloud.init()
      const db = wx.cloud.database({
        env: "prowaimai-0gjxo97if0659c49"
      })
      const data = db.collection("doctorList").add({
        // data 字段表示需新增的 JSON 数据
        data: {
          id: e,
          name: "黄子分",
          photo: "cloud://prowaimai-0gjxo97if0659c49.7072-prowaimai-0gjxo97if0659c49-1301433395/bs_UI/home/banner@2x.png",
          advantage: "有丰富的临床经验，在处理皮肤科常见病、多发病方面有独到的见解，尤其是在治疗系统性红斑狼疮、皮肌炎、重症药疹、腹型过敏性紫癜、大疱性皮肤病等皮肤科急危重症方面有较高的水平。",
          tel: `13${e - 1}93${e}6${e}`,
          office: "皮肤科",
          workDate: ["星期三", "星期四"]
        },
        success: function (res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log(res)
        }
      })
    },
    // 就诊医生
    showTPopup() {
      this.Tshow = true
    },
    onTClose() {
      this.Tshow = false
    },
    showYPopup() {
      this.Yshow = true
    },
    onYClose() {
      this.Yshow = false
    },
    showJPopup() {
      this.Jshow = true
    },
    onJClose() {
      this.Jshow = false
    },
    showDPopup() {
      this.Dshow = true
    },
    onDClose() {
      this.Dshow = false
    },
    onJConfirm(e) {
      this.Jshow = false
      console.log(e)
      this.detailDate = e.target.value
    },
    onDConfirm(e) {
      this.Dshow = false
      console.log(e)
      this.detailTime = `${e.target.values[0].name}-${e.target.values[1].name}`
    },
    //发起预约
    submitInfo() {
      console.log(this.name, this.phone, this.idCard, this.detailTime, this.detailDate)
      if (!this.name) {
        wx.showToast({
          title: "请填写姓名",
          icon: "none",
          duration: 1000,
          mask: false
        })
        return
      }
      if (!this.isPhone(this.phone)) {
        wx.showToast({
          title: "手机号不存在",
          icon: "none",
          duration: 1000,
          mask: false
        })
        return
      }
      if (!this.isIdCard(this.idCard)) {
        wx.showToast({
          title: "身份证号有误",
          icon: "none",
          duration: 1000,
          mask: false
        })
        return
      }
      if (!this.detailDate) {
        wx.showToast({
          title: "请填写就诊日期",
          icon: "none",
          duration: 1000,
          mask: false
        })
        return
      }
      if (!this.detailTime) {
        wx.showToast({
          title: "请填写就诊时间",
          icon: "none",
          duration: 1000,
          mask: false
        })
        return
      }
      this.checkHasVisit()
    },
    //已被挂号的时间段查询
    selectVisitTime() {
      wx.cloud.init()
      const db = wx.cloud.database({
        env: "prowaimai-0gjxo97if0659c49"
      })
      db.collection("prvisitdoctor")
        .where({
          doctorName: this.doctor,
          doctorOffice: this.office
        })
        .get()
        .then(res => {
          console.log(res.data)
          res.data.map(item => {
            this.hasVisitTime.push(`${item.visitDate.substr(5)}-${item.visitTime}`)
          })
        })
    },
    //查看是否该时间段已有预约
    checkHasVisit() {
      wx.cloud.init()
      const db = wx.cloud.database({
        env: "prowaimai-0gjxo97if0659c49"
      })
      db.collection("prvisitdoctor")
        .where({
          doctorName: this.doctor,
          doctorOffice: this.office,
          visitDate: this.detailDate,
          visitTime: this.detailTime
        })
        .get()
        .then(res => {
          if (res.data.length > 0) {
            wx.showToast({
              title: "该时间段已有人预约!",
              icon: "none",
              duration: 1000,
              mask: false
            })
          } else {
            this.handleRecord()
          }
          // console.log(res.data)
        })
    },
    //提交预约
    handleRecord() {
      Dialog.confirm({
        selector: "#myDialog",
        title: "确认提交",
        message: "我已确认以上信息属实，支付后如有问题可取消预约!"
      })
        .then(() => {
          //将手机号存入本地缓存中
          wx.setStorageSync("phone", this.phone)
          // on confirm
          // 将数据存入数据库
          wx.cloud.init()
          const db = wx.cloud.database({
            env: "prowaimai-0gjxo97if0659c49"
          })
          db.collection("prvisitdoctor")
            .add({
              // data 字段表示需新增的 JSON 数据
              data: {
                name: this.name,
                phone: this.phone,
                doctorName: this.doctor,
                doctorOffice: this.office,
                idCard: this.idCard,
                visitDate: this.detailDate,
                visitTime: this.detailTime
              }
            })
            .then(res => {
              wx.showToast({
                title: "预约成功!",
                icon: "none",
                duration: 1000,
                mask: false
              })
              console.log(res)
              wx.navigateTo({
                url: `/pages/resultInfo/main`
              })
            })
        })
        .catch(() => {
          // on cancel
        })
    }
  },
  components: {}
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.info {
  width: 90%;
  padding: 30rpx;
  background-color: #fff;
  margin: 0 auto;
  margin-bottom: 12rpx;
  color: #666;
}
.info p:first-child {
  margin-bottom: 14rpx;
}
.info p:nth-child(3) {
  float: left;
}
.info p:nth-child(4) {
  /* float:left; */
  color: #5eb1ff;
  font-weight: 600;
}
.container {
  padding: 0;
  justify-content: flex-start !important;
}
.tip {
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
.form {
  width: 90%;
  color: tomato;
}
.field-index--van-field {
  float: right !important;
}
radio,
.radio {
  transform: scale(0.7) !important;
}

.van-picker__toolbar {
  border-radius: 20px !important;
}

.van-field__input {
  text-align: right !important;
}
.van-cell {
  /* padding: 20rpx 0 !important; */
}
.van-field__placeholder {
  text-align: right;
  color: #d6cccd !important;
}
.van-cell__title {
  color: #4a4b4d;
  max-width: 260rpx !important;
}
.form {
  /* margin-bottom: 80rpx; */
}
.treaty,
.message {
  width: 90%;
  margin: 0 auto;
  text-align: left;
  font-size: 24rpx;
  color: #4a4b4d;
}
.message {
  display: flex;
  justify-content: space-around !important;
}
.radio {
  /* width: 20rpx !important; */
}
.treaty {
  margin-bottom: 16rpx;
}

.btn {
  width: 90%;
  margin: 40rpx auto;
}
.plain {
  width: 90%;
  padding: 30rpx;
  background-color: #fff;
  margin: 0 auto;
  margin-top: 12rpx;
  color: #666;
}
</style>