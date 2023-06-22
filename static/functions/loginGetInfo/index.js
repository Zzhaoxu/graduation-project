// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env:cloud.DYNAMIC_CURRENT_ENV
})

var db = cloud.database().collection('userPwd')
// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    var userData = {}
    db.get({
        success: (res)=> {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        //   console.log('11',res.data)
          this.userData = res
        }
      })  
    return {
        userData,
        event,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
    }
}