export default {
  sum: (...args) => {
    return args.reduce((cur, pre) => cur + pre, 0);
  }
};
