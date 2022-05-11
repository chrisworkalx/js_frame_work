let fn_test = async (ctx, next) => {
  let type = ctx.request.body.type || '';
  console.log(type, '===type');
  const n = Math.random();
  console.log(n, '====n');
  // 随机挂掉接口
  if (n > 0.8) {
    ctx.response.body = {
      code: 200,
      data: type
    };
  } else {
    ctx.status = 404;
    ctx.response.body = '';
  }
  next();
};

module.exports = {
  'POST/test': fn_test
};
