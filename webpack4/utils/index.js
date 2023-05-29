const { resolve } = require('path');

const join = ($path) => resolve(__dirname, '..', $path);

module.exports = {
  join
};
