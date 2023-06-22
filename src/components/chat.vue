<template>
	<view>
		<!-- <cu-custom bgColor="bg-gradual-pink" :isBack="true"><block slot="backText">返回</block><block slot="content">聊天</block></cu-custom> -->
		<view class="cu-chat" v-for="(item,index) of chatList" :key="index">
			<!-- 用户消息 -->
			<view class="cu-item self" v-if="item.isMe" >
				<view class="main">
					<view class="content bg-blue shadow">
						<text>{{item.messageData}}</text>
					</view>
				</view>
				<view class="cu-avatar radius" style="background-image:url('https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI5QbBF920qWBlDkdia5lYZyY6IegOZwqVicp1siclriaFP59TJgY8VBdW1Wb93icI1Hql3FiboIsK4abjQ/132');"></view>
				<view class="date">{{item.time}}</view>
			</view>
			<!-- <view class="cu-info round">对方撤回一条消息!</view> -->
			<!-- 客服消息 -->
			<view class="cu-item" v-if="!item.isMe">
				<view class="cu-avatar radius" style="background-image:url('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F018dbf55427fd10000019ae9126252.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655112358&t=a1029ea7024426b2e37dfa5ea69f154b');"></view>
				<view class="main">
					<view class="content shadow">
						<text>{{item.messageData}}</text>
					</view>
				</view>
				<view class="date ">{{item.time}}</view>
			</view>

		</view>

		<view class="cu-bar foot input" :style="[{bottom:InputBottom+'px'}]">
			<view class="action">
				<text class="cuIcon-sound text-grey"></text>
			</view>
			<input class="solid-bottom"  :adjust-position="false" :focus="false" maxlength="300" cursor-spacing="180"
			 @focus="InputFocus" @blur="InputBlur" @input="getMessage"/>
			<view class="action">
				<text class="cuIcon-emojifill text-grey"></text>
			</view>
			<button @click="send(1)"  class="cu-btn bg-blue shadow">发送</button>
		</view>

	</view>
</template>

<script>
	// import eventBus from '../eventBus.js'
	// console.log(w)
	// console.log(this)
	
	
	//防止消息死循环
	// var RP = 1
	const Toutiaokey = 'a63c19ec7b0587705821eb7892b7fe10'
	const TOUTIAO = 'https://v.juhe.cn/toutiao/index'
	const ROBOT = 'https://znys.market.alicloudapi.com/sent.do'
	export default {
		name:'Chat',
		beforeUpdate() {
			// console.log('打印 de Gthat',Gthat)
			this.getTime() 
		},
		// onLoad(){
		// 	console.log(this)
		// },
		data(){
			return{
				//暂时存储用户头像
				userPhoto:'',
				//用户的标识openid
				openid:'',
				InputBottom: 0,
				sendMessage:'',
				//此时的时间
				nowTime:'',
				//历史聊天记录内容
				historyList:[],
				//消息循环列表
				chatList:[
					{
						change:1,
						avatorUrl:'',
						messageData:'您好，我是客服，请问您想咨询什么捏~',
						time:'',
						isMe:false
					},
					// {
					// 	avatorUrl:'https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg',
					// 	messageData:'',
						// time:'',
					// 	isMe:true
					// }
				]
			}
		},
		mounted(){
			// let Gthat = this.$options.parent.$mp.page.data.$root["0_0"]
			// console.log('试试有没openid',this)   无
			this.getChatinfo()
			var Gthat = this.$options.parent.$mp.page.data.$root["0_0"]
			// console.log('Gthat的',Gthat)
			console.log('打印Gthat',Gthat)
			console.log('mounted的this',this)
			this.getTime()
			this.getUserProfile()
			// return
			Gthat.chatList[0].time = Gthat.nowTime
			console.log('tmie',	Gthat.chatList[0].time)
			wx.cloud.callFunction({
      config:{
        env:'prowaimai-0gjxo97if0659c49'
      },
      name:"user",
      data:{},
			success:(res)=>{
				console.log(res.result.openid)
				// 获取openid
				Gthat.openid = res.result.openid
				//将openid放入本地缓存中
				wx.setStorageSync('openid', Gthat.openid)
				console.log('打印openid',Gthat.openid)
			},
			fail:(err)=>{
				console.log('获取openid失败',err)
			}
			})},
			// created() {
			// 	var Gthat = this.$options.parent.$mp.page.data.$root["0_0"]
			// 	// console.log('试试有没openid',Gthat.openid)
			// 	this.showRecord()
				// console.log('beforeC',this)
			// },
		// created(){
		// 	// console.log(first)
		// 	eventBus.$on('share',val =>{
		// 	this.$options.parent.$mp.page.data.$root["0_0"].openid = val
			
		// 	})
		// },
		methods:{
			//获取数据库聊天记录
    getChatinfo(){
			let that = this
			console.log('这是that',that)
			let Gthat = this.$options.parent.$mp.page.data.$root["0_0"]
			let db = wx.cloud.database()
			wx.cloud.init({
        env: 'prowaimai-0gjxo97if0659c49',
        traceUser: true
      })
			db.collection('chatRecord').get({
      success: function(res) {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      console.log('getChatinfo信息',res.data)
			Gthat.historyList = res.data
			// that.showRecord()
			console.log('这还是',this)
				},
			fail:function(err){
				console.log('打印错误信息',err)
			}
			})
		},
		//对比openid，筛选数据，然后展现聊天记录
		showRecord(){
			let Gthat = this.$options.parent.$mp.page.data.$root["0_0"]
			console.log('这是historyList',Gthat.historyList)
			let newArr = Gthat.historyList.filter(item=>item.openid ==Gthat.openid)
			//完成数据的删选
			// Gthat.chatList = newArr
		},
			//聊天机器人
    ApiToutiao(data){
		let Gthat = this.$options.parent.$mp.page.data.$root["0_0"]
    var that = this
    this.$fly.config.headers={
      Authorization:'APPCODE 9f8bf1014bc84525a5e0c6d4669fcd26'
    },
		that.getTime()
		//获取时间
		let times = Date.now()
		let theIndex = Gthat.chatList.length
		//获取用户输入内容
		let content = data
    this.$fly.get(ROBOT,{
			content:content,
			product:'FGHJ',
			uuid:times
      // key:Toutiaokey,
      // SINA_WEIBO_TOPIC_2ND:that.Dtopic
    })
    .then(function (res) {
    console.log(res);
		//成功之后获取请求数据，进行赋值
		// that.$options.parent.$mp.page.data.$root["0_0"].chatList[theIndex].messageData = res.data.msg
    // that.searchVal = response.data.DISEASE_INFO
    // that.sinkDesc = response.data.DISEASE_INFO
    // that.sinkVal = response.
			that.robotSend(0,res.data.msg)
  })
  .catch(function (error) {
    console.log(error);
  });
  },
		//智能医生api
		robotDoctor(data){
		var that = this
    this.$fly.config.headers={
      Authorization:'APPCODE 9f8bf1014bc84525a5e0c6d4669fcd26'
    },
		that.getTime()
		//获取时间
		let times = Date.now()
		// let theIndex = Gthat.chatList.length
		//获取用户输入内容
		let content = data
		// that.$options.parent.$mp.page.data.$root["0_0"].chatList[theIndex].messageData
    this.$fly.get(ROBOT,{
			content:content,
			product:'FGHJ',
			uuid:times
    })
    .then(function (res) {
    console.log(res);

		//0代表isMe是false，代表是客服的信息  
		//1代表isMe是true，代表是用户的信息  
		that.robotSend()
		return
  })
  .catch(function (error) {
    console.log(error);
  });
  },

			//获取时间
			getTime(){
				// console.log('time被执行了',this)
				let  date=new Date();
				// console.log('getTime里面的',this)
				this.$options.parent.$mp.page.data.$root["0_0"].nowTime=date.toLocaleString('chinese', { hour12: false }); 
			},
			InputFocus(e) {
				console.log('键盘',e)
				this.InputBottom = e.target.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			getMessage(e){
				let Gthat = this.$options.parent.$mp.page.data.$root["0_0"]
				console.log('getMe',e)
				console.log(this)
				Gthat.sendMessage = e.mp.detail.value
				this.sendMessage = e.mp.detail.value
			},
			//执行客服发送消息
			robotSend(e,b){
				let Gthat = this.$options.parent.$mp.page.data.$root["0_0"]
				// var that = this
					console.log('打印this',this.$options.parent.$mp.page)
				let index = Gthat.chatList.length
					// console.log('打印index',index)
				let data =  b
				// this.$options.parent.$mp.page.data.$root["0_0"].sendMessage
				// this.$options.parent.$mp.page.data.$root["0_0"].chatList.length+=1
				//初始化操作
				Gthat.chatList[0].change =2

				Gthat.chatList[index] = {
						change:2,
						avatorUrl:'',
						messageData:'',
						time:'',
						isMe:false
				}
				//data =b  代表的是机器人返回的消息
				Gthat.chatList[index].messageData = data
				Gthat.chatList[index].avatorUrl = Gthat.chatList[0].avatorUrl
				Gthat.chatList[index].isMe = true
			  Gthat.chatList[index].time = Gthat.nowTime
				// 判断是客服还是用户输入的信息    0代表是服务端发送数据   1代表客户端发送数据
				if(e==0){
					Gthat.chatList[index].isMe = false
					e =1
				}
				this.saveRecord(Gthat.openid,Gthat.chatList[index].avatorUrl,Gthat.chatList[index].messageData,Gthat.chatList[index].time,Gthat.chatList[index].isMe)
				//触发发送消息的事件
				Gthat.chatList[0].change =1
				// if(that.RP ==1){
			},

			
			send(){
				// let Gthat = this.$options.parent.$mp.page.data.$root["0_0"]
				if(!this.sendMessage.trim()){
					wx.showToast({
              title: '请输入信息!',
              icon: 'none',
              duration: 1000,
              mask: false,
            });
						return   
				}
				// console.log('打印that',that)
				console.log('打印this',this.$options.parent.$mp.page)
				let index = this.$options.parent.$mp.page.data.$root["0_0"].chatList.length
					// console.log('打印index',index)
				let data = this.$options.parent.$mp.page.data.$root["0_0"].sendMessage
				// this.$options.parent.$mp.page.data.$root["0_0"].chatList.length+=1
				//初始化操作
				this.$options.parent.$mp.page.data.$root["0_0"].chatList[0].change =2

				this.$options.parent.$mp.page.data.$root["0_0"].chatList[index] = {
						change:2,
						avatorUrl:'',
						messageData:'',
						time:'',
						isMe:false
				}
				// let path = this.$options.parent.$mp.page.data.$root["0_0"]
				this.$options.parent.$mp.page.data.$root["0_0"].chatList[index].messageData = data
				this.$options.parent.$mp.page.data.$root["0_0"].chatList[index].avatorUrl = this.$options.parent.$mp.page.data.$root["0_0"].chatList[0].avatorUrl
			  this.$options.parent.$mp.page.data.$root["0_0"].chatList[index].isMe = true
				this.$options.parent.$mp.page.data.$root["0_0"].chatList[index].time = this.$options.parent.$mp.page.data.$root["0_0"].nowTime
				let Gthat = this.$options.parent.$mp.page.data.$root["0_0"]
				//触发云函数，将数据保存到数据库中
				this.saveRecord(
				Gthat.openid,
				Gthat.chatList[index].avatorUrl,
				Gthat.chatList[index].messageData,
				Gthat.chatList[index].time,
				Gthat.chatList[index].isMe)
				//判断是客服还是用户输入的信息
				// if(e==0){
				// 	this.$options.parent.$mp.page.data.$root["0_0"].chatList[index].isMe = false
				// 	e =1
				// }
				//
        
				//获取用户的openid
				// try {
				// 	var value = wx.getStorageSync('openid')
				// 	if ('openid') {
				// 		console.log(value)
				// 	}
				// } catch (e) {
				// 	console.log('获取openid失败')
				// }
				//触发发送消息的事件
		  	this.$options.parent.$mp.page.data.$root["0_0"].chatList[0].change =1
				// if(that.RP ==1){
				this.ApiToutiao(data)
				// 	this.RP = 2
				// 	if(index ==index+1){this.RP = 1}
				// }
				// this.sendMessage = ''
				Gthat.sendMessage =''
			},
			// 获取用户信息
    getUserProfile(e) {
			let Gthat = this.$options.parent.$mp.page.data.$root["0_0"]
      console.log('profile',e)
       wx.getUserProfile({
      // desc: '业务需要'
      desc: '获取您的信息', 
      success: res => {
        //拿到信息处理业务
       console.log(res.userInfo,'成功profile');
       Gthat.userPhoto = res.userInfo.avatarUrl
      //  console.log(this.photo)
      //  this.username = res.userInfo.nickName
      //  this.userOpenid()
      }
    })
  },
	    //获取用户openid
    // userOpenid(){
    //   // let that = this
		// 	let Gthat = this.$options.parent.$mp.page.data.$root["0_0"]
    //   wx.cloud.callFunction({
    //   config:{
    //     env:'prowaimai-0gjxo97if0659c49'
    //   },
    //   name:"user",
    //   data:{
    //     // username:that.username,
    //     // openId:Gthat.openid,
    //     // photo:Gthat.userPhoto
    //   },
    //   success(res){
    //     console.log(res,'event')
    //     console.log('请求云函数成功',res.result.event.userInfo)
    //     Gthat.openid = res.result.event.userInfo.openId
    //   },
    //   fail(err){
    //     console.log('请求云函数失败',err)
    //   }
    // })
    // },
			//将用户数据保存到数据库中，实现聊天记录缓存
			saveRecord(openid,avatorUrl,messageData,time,isMe){
				wx.cloud.callFunction({
					config:{
						env:'prowaimai-0gjxo97if0659c49'
					},
					name:'chatRecord',
					data:{
						openid,avatorUrl,messageData,time,isMe
					},
				success: function(res) {
					// res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
					console.log('执行成功',res)
				},
				fail(err){
					console.log('执行失败',err)
				}
			})
			}
		}
	}
</script>

<style>
page{
  padding-bottom: 100rpx;
}
</style>
