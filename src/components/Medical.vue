<!--
 * @Descripttion: 医疗资讯
 * @version: 
 * @Author: 00289
 * @Date: 2022-05-20 20:31:01
 * @LastEditors: Zzhaoxu
 * @LastEditTime: 2022-05-20 21:09:59
-->
<template>
  <div class="card">
    <!-- 左侧图片 -->
    <img src="" alt="">
    <!-- 右侧内容文字 -->
    <div class="Rtext">
      <!-- 右侧文字上 -->
      <p class="Rtop">Rtop</p>
      <!-- 右侧文字下 -->
      <div class="Rbottom">
        <span class="love">love</span>
        <span class="time">time</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'Medical',
  data () {
    return {
    }
  },
  methods: {
     
  },
  components: {
     
  }
}
</script>
<style scoped>
   .card{
     width: 100%;
     height: 160rpx;
     background-color: #fff;
     padding: 16rpx;
   }
   .card img{
     width: 120rpx;
     height: 120rpx;
     background-color: pink;
     margin: 10rpx 10rpx 10rpx 0;
   }
   .Rtext{
     position: relative;
     float: right;
   }
   .Rtop{
     position: absolute;
     left: 0;
     top: 0;
   }
   .Rbottom{
     position: absolute;
     left: 0;
     bottom: 0;
   }
   .love{
     float: left;
   }
   .time{
     float: right;
   }
</style>