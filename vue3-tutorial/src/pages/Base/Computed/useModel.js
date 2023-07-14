import { computed } from 'vue';
/**
 * props：属性对象
 * propName：要做成计算属性的名字
 * emit：emit 函数
 */
export function useVModel(props, propName, emit) {
  return computed({
    get() {
      return new Proxy(props[propName], {
        set(obj, name, val) {
          console.log('emit', name, val);
          emit('update:' + propName, {
            ...obj,
            [name]: val
          });
          return true;
        }
      });
    },
    set(val) {
      emit('update:' + propName, val);
    }
  });
}
