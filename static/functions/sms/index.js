/*
 * @Descripttion: 
 * @version: 
 * @Author: 00289
 * @Date: 2022-03-25 15:00:59
 * @LastEditors: Zzhaoxu
 * @LastEditTime: 2022-04-05 22:41:07
 */

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env:cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()

        var http = require('http')

        var Sms = require('./sendms.js')
        // 创建实例

        var code = Date.now().toString().substring(4,9)  // 验证码
        var mobile = event.phone  // 接收短信手机号码，如果多个手机号用逗号间隔
        var app_id = 'hw_10935'
        var secretKey = 'cc6b12c7633c15edd7f16661c9143eec'

        var template_sign = '康健医疗云'
        var template_id = 'ST_2020101100000005'  // 短信模板ID

        // var URL = 'http://api.shansuma.com/gateway.do'

        var sms = new Sms()
        var res = sms.getSendSmsData(app_id, secretKey, template_sign, template_id, mobile, code, URL)

        var req = http.get('http://api.shansuma.com/gateway.do' + res, function (res) {
            var sendresult = ''
                res.setEncoding('utf8')
                res.on('data', (chunk) => { // 获取放回结果
                sendresult = chunk
                })
                res.on('end', () => {
                console.log(sendresult)  // 显示返回结果
                })
        }).on('error', function (e) { // 错误
                console.log('Got error: ' + e.message)
        })
        req.end()




    return {
        code,
        event,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
    }
}