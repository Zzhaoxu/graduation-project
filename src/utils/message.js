var http = require('http');

var Sms = require('./sendsms.js');  
// 创建实例


var code = '1234';  //验证码
var mobile = '18616695689';  //接收短信手机号码，如果多个手机号用逗号间隔

var app_id = 'hw_10935';
var secretKey = 'cc6b12c7633c15edd7f16661c9143eec'; 

var template_sign = '短信签名 这里填写短信签名，不需要填写签名id';
var template_id = 'ST_2021092200001006';  //短信模板ID

var sms = new Sms();
var res = sms.getSendSmsData(app_id, secretKey, template_sign, template_id, mobile, code, URL);

var req = http.get('http://api.shansuma.com/gateway.do' + res, function(res) {
		var sendresult = '';
    	res.setEncoding('utf8');
	    res.on('data', (chunk) => { //获取放回结果
	       sendresult = chunk;
	    });
	    res.on('end', () => {
	      console.log(sendresult);  //显示返回结果
	    });
	   
	}).on('error', function(e) { //错误
	    console.log("Got error: " + e.message);
	});
	req.end();