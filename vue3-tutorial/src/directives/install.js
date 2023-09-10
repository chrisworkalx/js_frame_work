import permission from './permisson'; // 引入指令

const directives = {
  // 指令对象
  permission
};

export default {
  install(app) {
    Object.keys(directives).forEach((key) => {
      app.directive(key, directives[key]);
    });
  }
};
