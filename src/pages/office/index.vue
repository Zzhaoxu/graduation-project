<!--
 * @Descripttion: 
 * @version: 
 * @Author: 00289
 * @Date: 2022-05-10 22:31:36
 * @LastEditors: Zzhaoxu
 * @LastEditTime: 2022-05-20 14:42:56
-->
<template>
  <div class="doc">
    <!-- <IndexSearch></IndexSearch> -->
    <scroll-view class="menu-wrapper"
      :scroll-into-view="navId"
       scroll-with-animation="true"
       scroll-y>
      <ul class="menu-ul  menu-fixed">
        <li class="menu-item"
          v-for="(item,index) in goods"
          :id="'nav_'+index"
          :class="index===currentIndex ? 'current' : ''"
          :key="index"
          @tap="selectMenu(item,index)">
          {{item.name}}
        </li>
      </ul>
  </scroll-view>
  <scroll-view scroll-y
    @scroll="onScroll"
    :scroll-into-view="contentId"
    scroll-with-animation="true"
    class="foods-wrapper">
  <ul class="showDoctor">
    <li v-for="(item,index) in doctorList" :key="index"
        :id="item.name"
        @tap="detailInfo(item.id)"
        class="food-list food-list-hook" >
        <img :src="item.photo" alt="" class="avator"/>
        <p>姓名：{{item.name}}</p>
        <p>科室：{{item.office}}</p>
    </li>
  </ul>
</scroll-view>
  </div>
</template>
<script>
// import IndexSearch from '../../components/indexsearch.vue'
export default{
  data() {
    return {
      doctorList:[],
      // 科室名称
      officeName:"",
      goods: [
      {name:'皮肤科'},
      {name:'精神科'},
      {name:'骨科中心'},
      {name:'儿科'},
      {name:'眼科'},
      {name:'口腔科'},
      {name:'疼痛科'},
      // {name:'消化内科'}
      ],
      contentId: '', // 每个food-list的id，scroll-into-view滚动到对应的id
      navId: '', // 导航模块对应的id，用来联动内容区域
      currentIndex: 0,
      navulHeight: 0, // 导航里ul高度
      navItemHeight: 0, // 每个导航高度
      listHeight: [], // foods内部块的高度
      contentHeight: [], // 内容区域scroll-view高度
      detailGoods:[
        {name:'内科'},
        {name:'外科'},
        {name:'骨科中心'},
        {name:'儿科'},
        {name:'眼科'},
        {name:'口腔科'},
        {name:'疼痛科'},
        // {name:'消化内科'}
      ]
    }
  },
  mounted() {
    this.getDoctorList(this.goods[0].name)
  },
  watch: {
    currentIndex() {
      console.log(this.currentIndex)
      if (this.contentHeight < this.navulHeight) {
        let h = this.currentIndex * this.navItemHeight
        if (h > this.contentHeight) {
          // 导航滑动
          this.navId = `nav_${this.currentIndex}`
        } else {
          this.navId = 'nav_0'
        }
      }
    }
  },
  
  components:{
    // IndexSearch
  },
  methods: {
    //医生详情信息页面
    detailInfo(id){
      wx.navigateTo({
          url:`/pages/visitResult/main?id=${id}`,
        })
    },
    //获取医生信息列表
     getDoctorList(name){
       let _this = this
				wx.cloud.init()
				const db = wx.cloud.database({
				  env: 'prowaimai-0gjxo97if0659c49'
				})
				const  data =db.collection('doctorList').where({office:name}).get({
				  success: res=> {
				  // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
          console.log(res)
          this.doctorList = res.data
          console.log('1212',this.doctorList,res.data)
				  }
				})
			},
      doctorInfo(i){
        console.log(i)
        wx.navigateTo({
          url:`/pages/doctorDetail/main?id=${i}`,
        })
      },
    selectMenu(item,index) {
      console.log(item,index)  //item.name
      this.officeName = item.name
      this.currentIndex = index
      this.getDoctorList(item.name)
    },
    onScroll(e) {
      this.contentId = ''
      let scrollTop = e.target.scrollTop
      // console.log(scrollTop)
      let length = this.listHeight.length
      if (scrollTop >= this.listHeight[length - 1] - this.contentHeight) {
        return
      } else if (scrollTop > 0 && scrollTop < this.listHeight[0]) {
        this.currentIndex = 0
      }
      for (let i = 0; i < length; i++) {
        if (scrollTop >= this.listHeight[i - 1] && scrollTop < this.listHeight[i]) {
          this.currentIndex = i
        }
      }
      // console.log(this.currentIndex)
    },
    getFoodHeight() {
      var query = wx.createSelectorQuery()
      let h = 0
      query.selectAll('.food-list-hook').boundingClientRect((rects) => {
        // console.log(rects)
        rects.forEach((rect) => {
          h += rect.height
          this.listHeight.push(h)
        })
        // console.log(this.listHeight)
      })
      query.select('.foods-wrapper').boundingClientRect((rect) => {
        this.contentHeight = rect.height
      })
      query.select('.menu-ul').boundingClientRect((rect) => {
        this.navulHeight = rect.height
      })
      query.select('.menu-item').boundingClientRect((rect) => {
        this.navItemHeight = rect.height
      }).exec()
    }
  },
  watch: {
    // goods() {
    //   // 获取模块高度，即food-list
    //   setTimeout(() => {
    //     this.getFoodHeight()
    //   }, 60)
    // }
  }
}
</script>
<style scoped>
   .doc{
      display: flex;
    }
   .menu-wrapper{
     width: 200rpx;
     height: 1000rpx;
   }
   .menu-ul{
     position: fixed;
     left: 0;
     top: 0; 
     width: 200rpx;
     /* border: 1px solid red; */
     /* height: 300rpx; */
   }
   
   .menu-item{
     height: 100rpx;
     line-height: 100rpx;
     padding-left: 30rpx;
   }
   .current{
     box-sizing: content-box;
     /* border-right: 2rpx solid red; */
     border-left: 6rpx solid skyblue;
     color: skyblue;
     height: 100rpx;
     line-height: 100rpx;
     background-color: #fff;
   }


   .foods-wrapper{
     flex: 1;
   }
   .food-list{
     flex: 1;
     float: left;
     flex-wrap: wrap;
     min-width: 250rpx;
     max-width: 250rpx;
     /* border: 1px solid purple; */
     height: 350rpx;
     line-height: 100rpx;
     /* padding-left: 30rpx; */
     padding: 20rpx;
     background-color: #fff;
     margin: 0 auto;
     margin: 12rpx;
     text-align: center;
     border-bottom: 2rpx solid #eee;
   }

    .avator{
    width: 100rpx;
    height: 100rpx;
    border-radius: 6%;
    text-align: center;
    margin: 0 auto;
    overflow: hidden;
    /* background-color: pink; */
  }
  .doctor p{
    height: 70rpx;
    line-height: 100rpx;
    text-align: center;
    font-weight: 500;
    font-size: 30rpx;
    color: #999;
    
  }
</style>