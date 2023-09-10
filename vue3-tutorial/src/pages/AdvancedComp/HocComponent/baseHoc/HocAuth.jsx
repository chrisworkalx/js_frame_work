import Store from '@/store';
const { permissions } = Store.getters;
export default function HocTwo(Comp) {
  return (props, context) => {
    const { slots } = context;
    const { permission, title, ...rest } = props;
    const isHasAuth = !permission || permissions.includes(permission);
    if (isHasAuth) {
      return (
        <left-title title="Hoc鉴权">
          <Comp {...rest}>{slots.default ? slots.default() : title}</Comp>
        </left-title>
      );
    }
    return null;
  };
}
