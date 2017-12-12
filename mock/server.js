const jsonServer = require('json-server')
const server = jsonServer.create()

// Support middleware
const middleware = jsonServer.defaults()
server.use(middleware)

// Add this before server.use(router)
server.use(jsonServer.rewriter({
  '/api/user/baseinfo': '/userinfo' // 配置请求路由到指定的json-server值；也可以不配置，'/api/user/baseinfo'会找 /baseinfo.
 ,'/api/enterprise/info' : '/enterpriseInfo'
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

server.post('/api/reportrecord/list', (req, res) => {
  let db = router.db
  let data = db.get('recordList').value()
  res.jsonp({ data: data, status:"success", message:"ok" })
})

server.post('/api/member/list', (req, res) => {
  let db = router.db
  let data = db.get('memberList').value()
  res.jsonp({ data: data, status:"success", message:"ok" })
})

server.post('/api/reportcashflow/typeList', (req, res) => {
  let db = router.db
  let data = db.get('cashList').value()
  res.jsonp({ data: data, status:"success", message:"ok" })
})

server.post('/api/reportprofit/visual', (req, res) => {
  let db = router.db
  let data = db.get('visual').value()
  res.jsonp({ data: data, status:"success", message:"ok" })
})

server.post('/api/reportcashflow/dataList', (req, res) => {
  let db = router.db
  let data = db.get('cashDataList').value()
  res.jsonp({ data: data, status:"success", message:"ok" })
})

server.post('/api/reportassets/typeList', (req, res) => {
  let db = router.db
  let data = db.get('assetsList').value()
  res.jsonp({ data: data, status:"success", message:"ok" })
})

server.post('/api/reportassets/dataList', (req, res) => {
  let db = router.db
  let data = db.get('assetsDataList').value()
  res.jsonp({ data: data, status:"success", message:"ok" })
})

server.post('/api/reportrecord/warningdata', (req, res) => {
  let db = router.db
  let data = db.get('warningdata').value()
  res.jsonp({ data: data, status:"success", message:"ok" })
})

server.post('/api/department/infos', (req, res) => {
  let db = router.db
  let data = db.get('demprtmentList').value()
  res.jsonp({ data: data, status:"success", message:"ok" })
})

server.post('/api/area/get', (req, res) => {
  let db = router.db
  let data = db.get('get').value()
  res.jsonp({ data: data, status:"success", message:"ok" })
})

server.use(router)

// 返回自定义格式数据
router.render = (req, res) => {
  let data = {}
  res.jsonp({
    data: res.locals.data,
    status:"success",
    message:"ok"
  })
}

server.listen(9090, () => {
  console.log('JSON Server is running')
})