import Loading from '../baseComp/loading.vue';

export default function HocTwo(Comp) {
  const isNumberLargerFive = () => Math.random() * 10;

  return ({ isLoading, ...props }) => {
    if (isLoading) {
      return <Loading />;
    }
    return <Comp {...props} />;
  };
}
