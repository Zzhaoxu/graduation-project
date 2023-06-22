<template>
  <div >
    <van-card
      v-for="(item,index) of searchVal" :key="index"
      num="2"
      :tag="item.DISEASE_INFECTIOUNESS"
      :price="item.DISEASE_COST"
      :desc="item.DISEASE_CURE_RATE"
      :title="item.DISEASE_BYNAME"
      :thumb="imageURL"
    >
      <view slot="footer">
        <van-button size="mini">{{item.DISEASE_CLINIC_DEPARTMENT}}</van-button>
        <van-button size="mini">{{item.DISEASE_CYCLE}}</van-button>
      </view>
    </van-card>
    <!-- <div class="card">
        <div class="card_top">
          <i class="iconfont icon-jibing weak">疾病名称</i>
          <i class="yibao">医保疾病</i>
        </div>
        <div class="card_bottom">
          <div class="left_nav">
            <span class="introduce">疾病介绍：<p>这是内容区域</p></span>
          </div>
          <div class="right_nav">
            <span class="infect">有传染性</span>
          </div>
          
        </div>
    </div> -->
  </div>
</template>
<script>
export default {
  name:'Sink',
  props:['searchVal','sinkDesc'],
  data () {
    return {
      searchVal:this.searchVal,
      sinkDesc:this.sinkDesc,
      imageURL:'https://img.yzcdn.cn/vant/ipad.jpeg'
    }
  },
  methods: {
    
  },
  components: {
    
  }
}
</script>
<style scoped>
   body{
     width: 100%;
     height: 100%;
     background-color: #f1f1f1;
   }
   .card{
     width: 90%;
     height: 200rpx;
     margin: 0 auto;
     background-color: #fff;
     box-shadow: 3rpx;
     margin-top: 6rpx;
     padding: 20rpx;
   }
   .card_top{
     width: 100%;
     height: 50%;
     display: flex;
     align-items: center;
     justify-content: space-between;
     background-color: #80c2ff;
     color: #222222;
     border-bottom: 1px solid gray;
   }
  .weak{
    float: left;
    font-size: 28rpx;
    /* background-color: rgba(60, 60, 225, 0.568); */
    /* border-radius: 50%; */
    font-weight: bold;
  }
  .yibao{
    float: right;
    font-size: 28rpx;
  }

  .card_bottom{
    width: 90%;
    padding:0  40rpx;
    height: 50%;
    background-color:green;
  }

  .card_bottom .left_nav{
    float: left;
    width: 70%;
    height: 100%;
  }

  .card_bottom .right_nav{
    float: right;
    display: flex;
    width: 30%;
    height: 100%;
    align-items: center;
    justify-content: center;
    /* background-color: #fff; */
  }
  .right_nav span{
    width: 50rpx;
    height: 30rpx;
    font-size: 20rpx;
    color: white;
    border-radius: 10%;
    background-color: red;
  }


</style>