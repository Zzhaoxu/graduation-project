<template>
  <div>
    <van-cell class="cell" title="出发地" is-link @click="onClose" >{{fromCity}}</van-cell>
    <van-cell title="到访地" is-link @click="onClose" >{{toCity}}</van-cell>

    <van-popup
      @click="close"
      :show="Dshow"
      round
      position="bottom"
      custom-style="height: 40%;"    
    >
      <van-area
      :area-list="areaList"
      columns-placeholder="['请选择', '请选择', '请选择']"
      title="选择地区"
      visible-item-count = "5"
      @confirm = "fromCityConfirm"
      @cancel = "cancel"
    />
    </van-popup>
    <div class="btn">
      <van-button  @click="ApiFangyi" type="info">点击查询</van-button>
      <van-button  @click="ClearData" type="info">清空数据</van-button>
    </div>

    <!-- //显示结果 -->
    <div class=" city goCity">
      <h5>{{fromCity}}防疫相关政策</h5>
      <p>{{fangyiDetailFrom}}</p>
    </div>

    <div class="city visitCity">
      <h5>{{toCity}}防疫相关政策</h5>
      <p>{{fangyiDetailTo}}</p>
    </div>

    <van-toast id="van-toast" />

    <van-notify id="van-notify" />
    


  </div>
</template>
<script>
import Notify from "../../../static/vantweapp/notify/notify"
import Toast from "../../../static//vantweapp/toast/toast"
// const CITYID = 'http://apis.juhe.cn/springTravel/citys'
const FANGYI = 'https://apis.juhe.cn/springTravel/query'
const KUGOU = 'http://m.kugou.com/rank/list&json=true'
import { areaList } from '@vant/area-data';
export default {
  name:'Travel',
  data () {
    return {
      //存储城市列表
      city:[],
      //获取城市ID
      cityId:'',
      //出发地
      fromCity:'',
      //到访地
      toCity:'',
      //出发地城市ID
      fromCityCode:'',
      //到访地城市ID
      toCityCode:'',
      // 区分用户要改变出发地还是到访地
      changeCity:1,    
      // 三级联动层的显示与隐藏
      Dshow:false,
      //从属地防疫相关政策内容
      fangyiDetailFrom:'',
      //到访地防疫相关政策内容
      fangyiDetailTo:'',
      Fangyikey:'96341cd1782a6eb08824cc8ceec1696c',
      //城市地区列表
      areaList
      
    }
  },
  beforeMount(){
    // this.ApiCITYID()
    // this.ApiKugou()
  },
  methods: {
    //清空数据
    ClearData(){
      this.fromCityCode = ''
      this.toCityCode = ''
      this.city = []
      this.fangyiDetailFrom = ''
      this.fangyiDetailTo = ''
      this.fromCity = ''
      this.toCity = ''
      Notify({ type: 'primary', message: '数据已清空！' });
    },
    
    close(res){
      console.log(res)
      this.Dshow = false
    },
    onClose(){
      if(this.Dshow==true){
        this.Dshow = false
      }else{
        this.Dshow = true
      }

    },
    //获取城市数据
     getCity(from,to){
       let that  =this
				wx.cloud.init()
				const db = wx.cloud.database({
				  env: 'prowaimai-0gjxo97if0659c49'
				})
				const  data =db.collection('city').get({
				  success: res=> {
          // console.log(res.data[0].result)
          that.city = res.data[0].result
          // that.fromCityCode = that.city.map(function(item){
          //   if(item.fromCity==from){
          //     that.fromCityCode = item.city_id
          //     return that.fromCityCode
          //   }
          // })
          let newArr1 = that.city.filter(item => item.city+'市' == from)
          that.fromCityCode = newArr1[0].city_id
          
          // that.city.forEach(item => {
          //   if(item.city == to){
          //     that.toCityCode = item.city_id
          //     console.log(that.toCityCode)
          //   }
          // });
          let newArr2 = that.city.filter(item => item.city+'市' == to)
          that.toCityCode = newArr2[0].city_id
          //  console.log(that.fromCityCode,that.toCityCode)
				  }
				})
        console.log(that.fromCityCode,that.toCityCode)
			},
    //点击确认按钮,设置出发地与到访地
    fromCityConfirm(res){
      let that  = this
      console.log(res)
      switch(this.changeCity){
        case 1:
          this.fromCity = res.mp.detail.values[1].name
          // this.fromCityCode =  res.mp.detail.values[1].code
          this.changeCity = 2
          break
        case 2:
          this.toCity =res.mp.detail.values[1].name
          // this.toCityCode = res.mp.detail.values[2].code
          this.changeCity = 1
          break
        default:
      }
      
      if(that.fromCity&&that.toCity){
        console.log(that.fromCity,that.toCity)
          that.getCity(that.fromCity,that.toCity)
      }
      
    },
    cancel(res){
      console.log(res)
      this.Dshow = false
    },
    //疫情出行政策查询
     ApiFangyi(){
    let that = this
    if(that.fromCityCode==''||that.toCityCode==''){
      Toast.fail('请完善信息!');
      return
    }
    if(that.fromCityCode==that.toCityCode){
      Toast.fail('信息有误！');
      return
    }
    // this.$fly.config.headers={
    //   Authorization:'APPCODE 9f8bf1014bc84525a5e0c6d4669fcd26'
    // },
    this.$fly.get(FANGYI,{
      key:that.Fangyikey,
      from:that.fromCityCode,
      to:that.toCityCode
      // SINA_WEIBO_TOPIC_2ND:that.Dtopic
    })
    .then(function (res) {
    // setTimeout(function() {
      Notify({ type: 'primary', message: '查询中....' });
    // },2000)
    console.log(res);
    that.fangyiDetailFrom = res.data.result.from_info.high_in_desc+res.data.result.from_info.low_in_desc+res.data.result.from_info.out_desc
    that.fangyiDetailTo = res.data.result.to_info.high_in_desc+res.data.result.to_info.low_in_desc+res.data.result.to_info.out_desc 
    Notify({ type: 'success', message: '查询成功' });
  })
  .catch(function (error) {
    console.log(error);
  });
  },
  //获取酷狗歌曲
    ApiKugou(){
    var that = this
    // this.$fly.config.headers={
    //   Authorization:'APPCODE 9f8bf1014bc84525a5e0c6d4669fcd26'
    // },
    this.$fly.get(KUGOU,{
      // SINA_WEIBO_TOPIC_2ND:that.Dtopic
    })
    .then(function (res) {
    console.log(res.data);
    // that.fangyiDetail = res.data.rank.list[0].intro
  })
  .catch(function (error) {
    console.log(error);
  });
  }
  },
  components: {
     
  }
}
</script>
<style scoped>
   body{
     background-color: #f2f2f2;
   }
   .btn{
     /* margin: 0 auto; */
     display: flex;
     justify-content: center;

     margin-top: 20rpx;
     /* background-color: #5eB1FF; */
   }
   .btn van-button{
     margin-left: 20rpx;
   }
   .city{
     width: 90%;
     border-radius: 16%;
     padding: 25rpx 36rpx;
     margin: 10rpx 0;
     font-size: 26rpx;
   }
   .city h5{
     color: #5eB1FF;
   }
   .city p{
     color: rgb(43, 42, 42);
   }
   .cell{
     margin-bottom: 50rpx;
   }
</style>