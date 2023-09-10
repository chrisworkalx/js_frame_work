import baseExtendVue from '../baseComp/baseExtend.vue';
// import { useSlots } from 'vue';
//如何覆盖定义的html呢？
export default {
  name: 'HocExtend',
  extends: baseExtendVue,
  setup(props, context) {
    context.$slots?.dynamic({
      age: 100
    });
    const baseExtendVueSetupProps = baseExtendVue.setup(props, context); //优先获取继承组件定义的方法属性等
    // console.log('baseExtendVueSetupProps', baseExtendVueSetupProps);
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
    // console.log(context.$slots, '===context.$slots');

    const RenderComp = baseExtendVue.render.call(
      context,
      ...[context, ...rest]
    );

    // console.log(RenderComp.ctx.slots, '[===RenderComp.ctx.slots');

    // RenderComp.ctx.slots.dynamic({
    //   user: 'hello'
    // });

    // console.log(<RenderComp />, '======组件');
    // console.log(RenderComp, '======组件RenderComp');

    return (
      <div>
        <div>
          {context.$slots?.dynamic_one({
            user: 'chrisworkalx'
          })}
        </div>
        <span style={{ color: 'blue' }}>hello</span>
        <RenderComp />
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
