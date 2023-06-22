<template>
  <div>
    <div class="top_bg">
          <img src="cloud://prowaimai-0gjxo97if0659c49.7072-prowaimai-0gjxo97if0659c49-1301433395/bs_UI/home/icon-test@2x.png" alt="" class="scan">
          <div class="nav_search">
          <input type="text" placeholder = "请输入疾病名称"  class="input" v-model="searchVal">       
          <span class="iconfont icon-sousuo search" @click="searchSink"></span>
        </div>
          <img src="cloud://prowaimai-0gjxo97if0659c49.7072-prowaimai-0gjxo97if0659c49-1301433395/bs_UI/home/xinxi@2x.png" alt="" class="message">
    </div>
    <!-- 渲染的疾病信息列表 -->
    <Sink :searchVal = "searchVal" :sinkDesc = "sinkDesc"></Sink>
  </div>
</template>
<script>
import Sink from "./sink/index.vue"
//  const query = `?PAGE_NUM=${this.PAGE_NUM}&STRING=${this.STRING}`
const SINK_URL = 'https://aidisease.market.alicloudapi.com/ai_disease_search/elite'
const TOUTIAO = 'https://v.juhe.cn/toutiao/index'
const Hospital = 'https://api.yonyoucloud.com/apis/dst/hospitalInfoQuery/hospitalInfoQuery'
export default {
 
  name:'Search',
  beforeMount(){
    // this.searchSink()
    this.ApiToutiao()
    // this.ApiHospital()
    // this.ApiFangyi()
  },
  data () {
    return {
      //接收用户输入的搜索内容
      searchVal:'',
      //请求到的数据
      sinkVal:[],
      //处理后的疾病描述信息
      sinkDesc:[],
      //医院名称
      hospitalName:'',
      //输入的对话信息
      Toutiaokey:'a63c19ec7b0587705821eb7892b7fe10',
      
    }
  },
  methods: {
    // var that = this,
    getSinkData:function(){
     this.$fly.get(SINK_URL,{DISEASE:this.searchVal})
    .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
    },
  //搜索疾病信息  模糊搜索  
  searchSink(){
    // this.searchVal = searchVal
    // console.log("我悲哀吧")
    var that = this
    this.$fly.config.headers={
      Authorization:'APPCODE 9f8bf1014bc84525a5e0c6d4669fcd26'
    },
    this.$fly.get(SINK_URL,{DISEASE:that.searchVal
    })
    .then(function (response) {
    console.log(response.data.DISEASE_INFO);
    // console.log(111)
    // console.log(response.data.DISEASE_INFO);
    // console.log(that.searchVal)
    that.searchVal = response.data.DISEASE_INFO
    that.sinkDesc = response.data.DISEASE_INFO
    // const query = wx.createSelectorQuery() 
    // query.select('#input').value = ''
    // that.sinkVal = response.
    // that.$refs.input.ariaPlaceholder = ''
  })
  .catch(function (error) {
    console.log(error);
  });
  },
  //医院信息查询
   ApiHospital(){
    var that = this
    // this.$fly.config.headers={
    //   Authorization:'APPCODE 9f8bf1014bc84525a5e0c6d4669fcd26'
    // },
    this.$fly.get(Hospital,{
      // key:that.Toutiaokey,
      // SINA_WEIBO_TOPIC_2ND:that.Dtopic
      name:that.hospitalName
    })
    .then(function (res) {
    console.log(res);
    // that.searchVal = response.data.DISEASE_INFO
    // that.sinkDesc = response.data.DISEASE_INFO
    // that.sinkVal = response.
  })
  .catch(function (error) {
    console.log(error);
  });
  },
  //新闻头条
   ApiToutiao(){
    var that = this
    // this.$fly.config.headers={
    //   Authorization:'APPCODE 9f8bf1014bc84525a5e0c6d4669fcd26'
    // },
    this.$fly.get(TOUTIAO,{
      key:that.Toutiaokey,
      // SINA_WEIBO_TOPIC_2ND:that.Dtopic
    })
    .then(function (res) {
    console.log(res);
    // that.searchVal = response.data.DISEASE_INFO
    // that.sinkDesc = response.data.DISEASE_INFO
    // that.sinkVal = response.
  })
  .catch(function (error) {
    console.log(error);
  });
  },
  //处理描述信息的数据长度
  handleDesc(searchVal){
    searchVal.forEach(item,index => {
      item.substring(0,8)
    });
  },
   
  },
  components: {
    Sink
  }
}
</script>
<style scoped>
   body{
  width: 100%;
  height: 100%;
  /* background-color: #555; */
}

.top_bg{
  width: 100%;
  height: 1rem;
  /* border: 1px solid red; */
  background-color: #5eB1FF;
  /* border-bottom-right-radius: 10%;
  border-bottom-left-radius: 10%; */
  
}
.scan{
  position: absolute;
  width: 40rpx;
  height: 40rpx;
  top: 10rpx;
  left: 18rpx;
}
.input{
  /* position: relative; */
  width: 80%;
  height: 40rpx;
  /* border-radius: 5%; */
  z-index: 200;
  /* margin: 0 auto; */
  padding:10rpx 30rpx;
  color: #f8f8f8;
  /* 默认content-box，盒子宽度=width+border+padding */
  box-sizing: content-box;
  background-color: rgba(255,255,255,0.4);
}
.nav_search{
  /* position: relative; */
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75%;
  margin-left: 80rpx;
  /* height: 40rpx; */
  /* margin: 0 auto; */
  /* border: 1rpx solid red; */
}
.search{
  float: right;
  /* height: 40rpx; */
  line-height: 40rpx;
  font-size:40rpx ;
  color: white;
  /* right: 17%;
  top: 15rpx; */
  padding:10rpx 30rpx;
  /* border-bottom-right-radius: 5%;
  border-top-right-radius: 5%; */
  background-color:rgba(255,255,255,0.4);
}
.message{
  position: absolute;
  width: 48rpx;
  height: 48rpx;
  line-height: 48rpx;
  top: 10rpx;
  right: 18rpx;
  z-index: 4000;
}
</style>