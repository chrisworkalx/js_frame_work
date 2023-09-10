import baseExtendVue from '../baseComp/baseExtend.vue';
import { useSlots, ref, Suspense } from 'vue';
//如何覆盖定义的html呢？
export default {
  name: 'HocSlot',
  setup(props, context) {
    const slots = useSlots();
    const baseExtendVueSetupProps = baseExtendVue.setup(props, context); //优先获取继承组件定义的方法属性等
    const handleDangerClick = baseExtendVueSetupProps.handleDangerClick;
    baseExtendVueSetupProps.handleDangerClick = () => {
      console.log('复写------HocSlots');
      handleDangerClick();
    };
    return (context, ...rest) => {
      return (
        <>
          {/* {context.$slots?.dynamic({
            user: 10
          })} */}
          {slots?.dynamic({
            age: 30
          })}
          <baseExtendVue
            v-slots={{
              //可以在这里重写
              dynamic: () => {
                // conosle.log(props, '====kkkk');
                return 'kkkkk';
              }
            }}
          />
        </>
      );
    };
  }
};
