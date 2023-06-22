// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env:cloud.DYNAMIC_CURRENT_ENV
})

let db = cloud.database().collection('userInfo')
// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    cloud.database().collection('userInfo')
    .get().then(res => {
        // res.data 包含该记录的数据
        console.log(res.data)
        let arr =  res.data.filter(item=>item.openid==event.openId)
        if(arr.length==0){
            db.add({
                data:{
                    username:event.username,
                    openid:event.openId,
                    user_pic:event.photo
                }
            })
            .then(res=>{
                console.log('添加成功',res)
            })
            .catch(err=>{
                console.log('添加失败',err)
            })
        }
      })
      .catch(err=>{
          console.log('数据已存在',err)
      })
      



    
    return {
        event,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
    }
}