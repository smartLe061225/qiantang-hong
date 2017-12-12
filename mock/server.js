const jsonServer = require('json-server')
const server = jsonServer.create()

// Support middleware
const middleware = jsonServer.defaults()
server.use(middleware)

// Add this before server.use(router)
server.use(jsonServer.rewriter({
  '/api/user/baseinfo': '/userinfo' // 配置请求路由到指定的json-server值；也可以不配置，'/api/user/baseinfo'会找 /baseinfo.
}))

// 支持加载多个db文件
const _ = require('underscore')
const path = require('path')
const fs = require('fs')
const mockDir = path.join(__dirname, 'data')
const base = {}
const files = fs.readdirSync(mockDir)
files.forEach((file) => {
  _.extend(base, require(path.resolve(mockDir, file)))
})
const router = jsonServer.router(base)


// 自定义请求路由 - post
server.post('/api/jwt/token', (req, res) => {
  let db = router.db
  let data = db.get('login').value()
  res.jsonp(data)
})


server.use(router)

// 返回自定义格式数据
router.render = (req, res) => {
  let data = {}
  let blackList = ['/dashboard', '/dashboard/weekly_data']
  let localData = res.locals.data
  if (localData instanceof Array && !blackList.includes(req.originalUrl)) {
    data = {
      list: localData,
      total: 20
    }
  } else {
    data = localData
  }
  res.jsonp({
    data: data,
    status:"success",
    message:"ok"
  })
}

server.listen(9090, () => {
  console.log('JSON Server is running')
})