<!--
 * @Descripttion: 
 * @version: 
 * @Author: 00289
 * @Date: 2022-05-09 00:17:00
 * @LastEditors: Zzhaoxu
 * @LastEditTime: 2022-05-11 21:35:40
-->
<template>
  <div>
    <div class="doctorCon">
      <div @click="doctorInfo(index)" class="doctor" v-for="(item,index) in doctorList" :key="index" >
        <img :src="item.photo" alt="" class="avator"/>
        <p>姓名：{{item.name}}</p>
        <p>科室：{{item.office}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'',
  data () {
    return {
      doctorList:[]
    }
  },
  mounted(){
    this.getDoctorList()
  },
  methods: {
     //获取医生信息列表
     getDoctorList(){
				wx.cloud.init()
				const db = wx.cloud.database({
				  env: 'prowaimai-0gjxo97if0659c49'
				})
				const  data =db.collection('doctorList').get({
				  success: res=> {
				    // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
					// console.log(res.data[0].swiper)
          this.doctorList = res.data[0].doctorData
          console.log(this.doctorList,res.data)
				  }
				})
			},
      doctorInfo(i){
        console.log(i)
        wx.navigateTo({
          url:`/pages/detailInfo/main?id=${i}`,
        })
      }
  },
  components: {
     
  }
}
</script>
<style scoped>
  .doctorCon{
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding:20px;
  }
  .doctor{
    display: flex;
    flex-direction: column;
    width: 45%;
    height: 180px;
    border-radius: 5%;
    padding: 20rpx;
    margin: 0 auto;
    margin-bottom: 14px;
    background-color: #fff;
    /* text-align: center; */

  }
  .avator{
    width: 66px;
    height: 66px;
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