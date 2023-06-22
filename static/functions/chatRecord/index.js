// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env:cloud.DYNAMIC_CURRENT_ENV
})

let db = cloud.database().collection('chatRecord')
// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    db.add({
        // data 字段表示需新增的 JSON 数据
        data: {
            openid : event.openid,
            avatorUrl:event.avatorUrl,
            messageData:event.messageData,
            time:event.time,
            isMe:event.isMe
        },
        success: function(res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log('数据已添加到数据库中',res)
        }
      })
    return {
        event,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
    }
}