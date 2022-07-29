const koa = require('koa');
const app = new koa();
const path = require('path');
const KoaStatic = require('koa-static');
const views = require('koa-views'); //模版渲染引擎
const onerror = require('koa-onerror');
//设置跨域等配置
const cors = require('koa2-cors');
// post请求，需要请求体，这个时候需要安装 koa-bodyparser,它可以解析从body里面传过来的数据
const bodyparser = require('koa-bodyparser');

const controller = require(path.resolve(__dirname, './controllers/control'));

onerror(app);

function sleep(seconds = 2000) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, seconds);
  });
}

/** ===========middlewares  start ============ */
//允许跨域请求访问 手动封装
// app.use(async (ctx, next) => {
//   ctx.set('Access-Control-Allow-Origin', '*');
//   ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE');
//   await next();
// });

app.use(
  cors({
    origin: function (ctx) {
      //设置允许来自指定域名请求
      return '*';
      // if (ctx.url === '/choose-city') {  return '*'; // 允许来自所有域名请求 }
      // return 'http://localhost:8080'; // 只允许http://localhost:8080这个域名的请求
    },
    maxAge: 5 * 60 * 24 * 7, //指定本次预检请求的有效期，单位为秒。 7天
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法'
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
  })
);

app.use(
  views(__dirname + '/views', {
    extension: 'pug'
  })
);

app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
);

app.use(KoaStatic(__dirname + '/public'));

app.use(async (ctx, next) => {
  if (ctx.url === '/test') {
    await sleep();
  }
  await next();
});

app.use(controller()); // 调用return 出来的函数

/** ===========middlewares  over ============ */

app.listen(3000, () => console.log('listening on localhost:3000'));
