import baseExtendVue from '../baseComp/baseExtend.vue';
// import { useSlots } from 'vue';
//如何覆盖定义的html呢？
export default {
  name: 'HocExtend',
  extends: baseExtendVue,
  setup(props, context) {
    // context.slots?.dynamic({
    //   age: 100
    // });
    const baseExtendVueSetupProps = baseExtendVue.setup(props, context); //优先获取继承组件定义的方法属性等
    const handleDangerClick = () => {
      console.log('重写方法');
      baseExtendVueSetupProps.handleDangerClick();
    };
    return {
      ...baseExtendVueSetupProps, //开始覆盖
      handleDangerClick
    };
  },
  render(...args) {
    const [context, ...rest] = args;

    // context.$slots?.dynamic({
    //   user: 'chrisworkalx'
    // });

    return (
      <div>
        <span style={{ color: 'blue' }}>hello</span>
        {baseExtendVue.render.call(context, ...[context, ...rest])}
        <h1>-------------分割线---------------</h1>
        {context.$slots?.list({
          goods: {
            name: 'pear',
            price: 80
          }
        })}
      </div>
    );
  }
};
