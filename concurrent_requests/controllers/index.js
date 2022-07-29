let fn_index = async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  });
};

module.exports = {
  'GET/': fn_index
};
