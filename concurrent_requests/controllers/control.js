const fs = require('fs');

function addControllers(router) {
  // 先导入fs模块，然后用readdirSync列出文件
  // 这里可以用sync是因为启动时只运行一次，不存在性能问题:
  const files = fs.readdirSync(__dirname);
  // console.log("file", files)
  // 过滤出.js文件:
  const js_files = files.filter((f) => {
    return f.endsWith('.js');
  });
  for (let f of js_files) {
    // 可跳出循环
    // console.log('遍历对的controller为，', f);
    const mapping = require(`${__dirname}/${f}`);
    console.log('mapping', mapping);
    findMapping(router, mapping);
  }
}

function findMapping(router, mapping) {
  for (let url in mapping) {
    // 遍历对象
    console.log('拿到的url', url);
    if (url.startsWith('GET')) {
      const path = url.substring(3); // 取 跳转路径 / 或者 /hello/:name
      // console.log('那到的path', path);
      router.get(path, mapping[url]);
    } else if (url.startsWith('POST')) {
      const path = url.substring(4); // 取 跳转路径/test
      console.log(path, '===post-path-url');
      router.post(path, mapping[url]);
    }
  }
}

module.exports = function () {
  const // 如果不传参数 ，默认为controllers目录
    route = require('@koa/router'); // 注意require('koa-router')返回的是函数:
  router = new route();
  // 调用方法
  addControllers(router);
  return router.routes(); // 必须return出去
};
