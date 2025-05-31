const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();

// 处理静态文件
app.use('/static', express.static(path.join(__dirname, 'public')));

// 配置代理规则
app.use(
  '/forward',
  createProxyMiddleware({
    target:
      'https://visitor.astrazeneca.cn/vm#/applyResult?id=10821&key=c9ec2b61712311b1350015ac5f32c0bc', // 目标网站
    // 'https://www.baidu.com/s?wd=%E4%B9%A0%E8%BF%91%E5%B9%B3%E5%90%91%E5%85%A8%E5%86%9B%E8%80%81%E5%90%8C%E5%BF%97%E7%A5%9D%E8%B4%BA%E6%96%B0%E6%98%A5&sa=fyb_n_homepage&rsv_dl=fyb_n_homepage&from=super&cl=3&tn=baidutop10&fr=top1000&rsv_idx=2&hisfilter=1', // 目标网站
    // 'https://visitor.astrazeneca.cn', // 目标网站
    // 'https://www.baidu.com', // 目标网站
    changeOrigin: true, // 修改请求头中的Origin字段，适用于跨域请求
    secure: false, // 忽略SSL证书验证，适用于HTTPS请求
    pathRewrite: {
      '^/forward': '' // 将请求路径中的 `/forward` 去掉
    },
    // onProxyRes: (proxyRes, req, res) => {
    //   let body = '';

    //   // 收集响应体
    //   proxyRes.on('data', (chunk) => {
    //     body += chunk;
    //   });

    //   proxyRes.on('end', () => {
    //     // 使用 cheerio 修改 HTML 内容
    //     // const $ = cheerio.load(body);
    //     // $('title').text('New Title');  // 修改网页的标题

    //     // 将修改后的内容返回给客户端
    //     // res.setHeader('Content-Type', 'text/html');
    //     // res.end($.html());
    //     console.log('res', res);
    //   });
    // }
    // logLevel: 'debug' // 可选：调试日志，查看代理的请求和响应
    onProxyReq: (proxyReq, req, res) => {
      console.log(`forward-Proxying request: ${req.url}`);
    }
  })
);

app.use(
  '/static',
  createProxyMiddleware({
    target: 'https://visitor.astrazeneca.cn',
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      '^/static': '/static/mb_visitor/js/' // 确保静态资源路径正确
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log(`Proxying request: ${req.url}`);
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log(`Proxy response status: ${proxyRes.statusCode}`);
    }
  })
);

// 启动服务
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
