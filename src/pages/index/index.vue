<template>
  <div>
    <!-- <van-notice-bar
      scrollable="true"
      text="。"
    /> -->
    <!-- 顶部搜索栏 -->
    <IndexSearch></IndexSearch>
    <!-- 试验colorui -->

    
    <!-- 轮播图区域 -->
    <div class="lunbo">
      <swiper
        class="swiper"
        indicator-dots="true"
        autoplay="true"
        :interval="interval"
        :duration="duration"
        circular = "true"
      >
        <block v-for="(item,index) of swiper_img" :key="index">
          <swiper-item>
            <img :src="item.url" class="slide-image"/>
          </swiper-item>
          </block>
        </swiper>
        </div>
      <!-- icon区域 -->
      <ul class="icon">
        <li v-for="(item,index) of icon_img" class="iconImg"  :key="index" @click="detailVisit(item)">
          <img :src="iconImg_conmmon+item.url"    alt="">
          {{item.info}}
        </li>
      </ul>
      <!-- icon下面的两个banner -->
      <ul class="banner">
        <li v-for="(item,index) of banner" :key="index">
          <img :src="item.url" alt="">
        </li>
      </ul>
      <!-- //养生课堂 -->
      <div class="yangsheng" >
          <img src="https://7072-prowaimai-0gjxo97if0659c49-1301433395.tcb.qcloud.la/bs_UI/home/banner12%402x.png?sign=6bd38dab3201196cff1b56e66d52c248&t=1654497491" alt="">
      </div>



    </div>
</template>
<script>
import IndexSearch from '../../components/indexsearch.vue'
export default {
  name:'',
  data () {
    return {
      swiper_img:[],
      icon_img:[],
      iconImg_conmmon:'',
      banner:[],
      duration:500,
      interval:2000
    }
  },
  onLoad(){
    // this.login()
    this.getSwiper_img()
    this.getIcon_img()
    this.get_banner()
  },
  mounted() {
    
  },
  //设置小程序分享
  onShareAppMessage(){
    return{
      title:"毕设小程序",
      path:"/pages/index/main"
    }
  },
  methods: {
    //每个icon的点击事件
    detailVisit(e){
      // let href = 'http://192.168.0.101:8080'
      if(e.info=='疫情信息'){
      wx.navigateToMiniProgram({
      appId: 'wxa746022219de83be',
      success(res) {
        // 打开成功
      }
    })
    return
}
      wx.navigateTo({
      url:e.detailUrl+"?title="+e.info,
    })
    },
    //获取轮播图图片数据
     getSwiper_img(){
				wx.cloud.init()
				const db = wx.cloud.database({
				  env: 'prowaimai-0gjxo97if0659c49'
				})
				const  data =db.collection('swiper').get({
				  success: res=> {
				    // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
					// console.log(res.data[0].swiper)
          this.swiper_img = res.data[0].swiper
				  }
				})
			},
    //获取icon数据
    getIcon_img(){
      wx.cloud.init()
				const db = wx.cloud.database({
				  env: 'prowaimai-0gjxo97if0659c49'
				})
				const  data =db.collection('icon').get({
				  success: res=> {
				    // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
					// console.log(res.data[0].icon)
          this.iconImg_conmmon = res.data[0].commonUrl
          this.icon_img = res.data[0].icon
				  }
				})
    },
    //获取banner数据
     get_banner(){
				wx.cloud.init()
				const db = wx.cloud.database({
				  env: 'prowaimai-0gjxo97if0659c49'
				})
				const  data =db.collection('banner').get({
				  success: res=> {
				    // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
					console.log(res.data[0].banner)
          this.banner = res.data[0].banner
				  }
				})
			},
  },
  components: {
     IndexSearch
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
  height: 2.5rem;
  /* border: 1px solid red; */
  background-color: #5eB1FF;
  border-bottom-right-radius: 10%;
  border-bottom-left-radius: 10%;
  
}
.scan{
  position: absolute;
  width: 40rpx;
  height: 40rpx;
  top: 10rpx;
  left: 18rpx;
}
.input{
  position: relative;
  width: 70%;
  height: 40rpx;
  border-radius: 5%;
  z-index: 200;
  margin: 0 auto;
  padding:10rpx 30rpx;
  color: #f8f8f8;
  /* 默认content-box，盒子宽度=width+border+padding */
  box-sizing: content-box;
  background-color: rgba(255,255,255,0.4);
}
.search{
  position: absolute;
  height: 40rpx;
  line-height: 40rpx;
  font-size:40rpx ;
  color: white;
  right: 17%;
  top: 15rpx;
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
.lunbo{
  height: 276rpx;
  display: block;
  margin-top: 20rpx;
}
.swiper{
  /* position: absolute;
  top:100rpx;
  left: 50%;
  margin-left:-337rpx; */
  display: flex;
  width: 90%;
  height: 276rpx;
  justify-content: center;
  margin: 0 auto;
  border-radius: 5%;
  /* background-color: red; */
  /* border: 1px solid red; */
  text-align: center;
  overflow: hidden;
  z-index: 400;
}
.slide-image{
  height: 276rpx;
}
.icon{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 auto;
  justify-content: space-between;
  width: 90%;
  height: 360rpx;
  /* border: 1px solid red; */
}
.iconImg{
  display: flex;
  flex-direction: column;
  width: 18%;
  height: 180rpx;
  font-size: 26rpx;
  color: #060606;
  align-items: center;
}
.iconImg img{
  width: 148rpx;
  height: 192rpx;
  max-width: 130%;
}

.banner{
  width: 90%;
  height: 210rpx;
  display: flex;
  margin: 0 auto;
  flex-direction: row;
  justify-content: space-between;
}
.banner img{
  width: 310rpx;
  height: 180rpx;
  margin-top: 69rpx;
}
.yangsheng{
  display: flex;
  width: 90%;
  height: 200rpx;
  text-align: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 30rpx;
}
.yangsheng img{
  width: 100%;
  height: 187rpx;
  margin-top: 15rpx;
}
</style>