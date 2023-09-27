<script>
import { collapse as CollapseConfig } from './collapse';
const getListenerPosition = (k, cstHook, defaultHook) => {
  return k.includes('before') ? [cstHook, defaultHook] : [defaultHook, cstHook];
};
export default {
  name: 'MyCollapseTransition',
  functional: true,
  render(h, { children, listeners, props }) {
    listeners = listeners || {};
    const finalListners = Object.entries(CollapseConfig).reduce(
      (target, [k, v]) => {
        if (k in listeners) {
          target[k] = (...args) => {
            getListenerPosition(k, listeners[k], v).forEach((f) => f(...args));
          };
        } else {
          target[k] = (...rest) => {
            v(...rest);
          };
        }
        return target;
      },
      {}
    );
    const $data = {
      on: {
        ...finalListners
      },
      ...props
    };
    return h('transition', $data, children);
  }
};
</script>
