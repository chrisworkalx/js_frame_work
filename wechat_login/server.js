const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();
const { encode } = require('url-encode-decode');

const {
  fetchToGetAccessToken,
  getWeChatQrcode,
  getUserInfo
} = require('./test');

const resolve = (p) => path.resolve(__dirname, p);

//引用ejs
app.set('views', 'public'); //设置视图的对应目录
app.set('view engine', 'ejs'); //设置默认的模板引擎
app.engine('ejs', ejs.__express); //定义模板引擎

//设置跨域访问（设置在所有的请求前面即可）
app.all('*', function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header('Access-Control-Allow-Origin', '*');
  //允许的header类型
  res.header('Access-Control-Allow-Headers', 'content-type');
  //跨域允许的请求方式
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS');
  if (req.method == 'OPTIONS') res.sendStatus(200); //让options尝试请求快速结束
  else next();
});
//静态页面托管
// 默认/ 托管public目录
app.use('/', express.static(resolve('public')));

// /src 托管文件等
app.use('/src', express.static(resolve('src')));

app.get('/login', (req, res, next) => {
  res.render('login', {
    title: '登录页面'
  });
});

app.get('/home', (req, res, next) => {
  res.render('home');
});
app.get('/getUserInfo', (req, res, next) => {
  const { username, password } = req.params;
  res.json({
    code: 200,
    data: {
      username,
      password
    }
  });
});
app.get('/getToken', async (req, res, next) => {
  const result = await fetchToGetAccessToken();
  res.json({ access_token: result });
});
app.get('/getWeChatQrcode', async (req, res, next) => {
  const result = await getWeChatQrcode();
  const { ticket } = result;
  const qrcodeUrl = `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${encode(
    ticket
  )}`;
  res.json({
    qrcodeUrl
  });
});

app.get('/getWechatUserInfo', async (req, res, next) => {
  const { code } = req.query;
  console.log(code, '===code');
  const result = await getUserInfo(code);
  res.json(result);
});

app.listen(3000, () => {
  console.log('当前正在监听3000端口');
});
