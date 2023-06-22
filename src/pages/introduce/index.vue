<!--
 * @Descripttion: 
 * @version: 
 * @Author: 00289
 * @Date: 2022-05-09 19:16:04
 * @LastEditors: Zzhaoxu
 * @LastEditTime: 2022-05-09 19:26:29
-->
<template>
  <div>
    <!-- <cu-custom bgColor="bg-gradual-green" isBack="true"><view slot="backText">返回</view><view slot="content">关于</view></cu-custom> -->
    <view class='margin-xl bg-white padding-xl radius shadow-lg'>
    <view class='text-center margin-bottom text-lg  text-grey'>康健医院</view>
    <view class='text-content'>
    <view>医院简介</view>
    <view class='margin-top-sm'>康健医院始建于xxxx年，是一所集医疗、教学、科研、预防、保健、康复于一体的三级甲等综合性医院。现有职工2594人，其中正高职称162人、副高职称445人、博士后1人、博士28人、硕士380人、硕士研究生导师12人。</view>
    <view class='margin-top-sm'>康健医院坚定以省级区域性医疗中心为发展定位，以提升疑难危重症疾病诊疗能力为重点，先后引进超高端GE256排CT、GE兼容型SPECT/CT、3.0T进口磁共振、Elekta Infinity直线加速器、肿瘤综合治疗高聚焦超声治疗机（海扶刀）、蔡司全飞秒激光、移动ICU、3D数字高清内窥镜摄像系统、数字减影血管成像系统（DSA）及数字胃肠机、彩色多普勒超声诊断仪、进口施乐辉数字高清关节镜、进口椎间孔镜、搭建了基因测序四大平台、全自动生化分析仪、化学发光和电发光仪、彩色同位素扫描仪、进口脑室镜、钬激光等高端医学诊疗设备。高层次专业人才、高端医疗设备助力医院高精尖复杂诊疗技术迅速提升，医院的ECMO（人工膜肺）、肾脏移植、干细胞移植、断肢断指再植、心脑血管疾病诊疗、心脏大血管外科手术、实体恶性肿瘤放化疗及免疫治疗、胸腔镜、呼吸内镜、消化内镜、腹腔镜、关节镜、脊柱内镜等外科腔镜诊疗及血管微创介入诊疗技术均居国内前列。</view>
    <view class='margin-top-sm'>近年来，医院坚持以“扩规模、强内涵、提能力、创一流”为发展理念，着力建设“学科高地、人才高地、科研高地”，发扬“敬佑生命，救死扶伤，甘于奉献，大爱无疆”的医疗职业精神，遵循“厚德、仁爱、博学、精医”的医院院训,遵守“对医学严谨、对病人用心、对同行友善、对自己廉律”的医院道德观。时刻以服务人民群众健康为中心，持续保持医院高质量发展，不断提升品牌价值，努力打造“环境一流、技术一流、服务一流、管理一流”的湖南省区域性医疗中心。</view> 
    <view class='margin-top-sm'>预约挂号电话：0730-8246482</view>
    <view class='margin-top-sm'>医院地址：XX市XX区XXX路39号</view>
  </view>
</view>
  </div>
</template>
<script>
export default {
  name:'',
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
   .UCenter-bg {
  background-image: url(https://image.weilanwl.com/color2.0/index.jpg);
  background-size: cover;
  height: 700rpx;
  display: flex;
  justify-content: center;
  padding-top: 40rpx;
  overflow: hidden;
  position: relative;
  flex-direction: column;
  align-items: center;
  color: #fff;
  font-weight: 300;
  text-shadow: 0 0 3px rgba(0,0,0,0.3);
}
.UCenter-bg text{
  opacity: 0.8;
}
.UCenter-bg image {
  width: 250rpx;
  height: 250rpx;
}

.UCenter-bg .animation-wave {
  position: absolute;
  bottom: 0;
}

</style>