const Koa = require('koa')
const app = new Koa()
const debug = require('debug')('koa-weapp-demo')
const response = require('./middlewares/response')
const bodyParser = require('koa-bodyparser')
const config = require('./config')
// 引入路由分发
const router = require('./routes')
const Router = require('koa-router')

// const connect = require('connect')

// 实例化路由
const route = new Router()

// 使用响应处理中间件
app.use(response)

// 解析请求体
app.use(bodyParser())
// 配置路由
app.use(router.routes()).use(route.allowedMethods())

// 启动程序，监听端口
app.listen(config.port, () => debug(`listening on port ${config.port}`))
