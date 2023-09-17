import _MessageBox from './MessageBox.vue';

export default {
  install(Vue) {
    let messageBox = null;
    Vue.component(_MessageBox.name, _MessageBox);

    Vue.prototype.$messageBox = {
      show,
      hide,
      info,
      success,
      warn,
      error
    };

    function info(props) {
      this.show({ ...props, type: 'primary' });
    }
    function success(props) {
      this.show({ ...props, type: 'success' });
    }
    function warn(props) {
      this.show({ ...props, type: 'warn' });
    }
    function error(props) {
      this.show({ ...props, type: 'danger' });
    }

    function show(props) {
      const { callback = () => {}, ...rest } = props;

      // 不存在的时候实例化
      if (!messageBox) {
        const MessageBox = Vue.extend({
          render(h) {
            return h('message-box', { props: rest });
          }
        });

        // 相当于vue一个子类，返回组件的实例
        messageBox = new MessageBox();
        this.vm = messageBox.$mount(); // 获取挂载元素
        document.body.appendChild(
          this.vm.$el /** this.vm.$el--->挂载dom元素 */
        );
        callback();
      }
    }

    function hide() {
      let isCreateByExtend = false;
      let createExtendsFun = null;
      if (messageBox) {
        isCreateByExtend = true;
        createExtendsFun = (callback) => {
          document.body.removeChild(this.vm.$el);
          messageBox.$destroy(); // 销毁这个组件
          messageBox = null;
          this.vm = null;
          callback();
        };
      }
      return {
        isCreateByExtend,
        createExtendsFun
      };
    }
  }
};
