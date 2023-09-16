<script>
import JsxSlot from './JsxSlot.vue';
export default {
  name: 'BaseJsxSlot',
  components: {
    JsxSlot
  },
  render() {
    // header: ({ user }) => <h1>我是header插槽</h1>
    //   相当于
    // <template slot="header" slot-scope="{ user }"></template>
    return (
      <div>
        <JsxSlot
          scopedSlots={{
            header: ({ user }) => (
              <h1 class="bg-red">我是header插槽,姓名：{user.name}</h1>
            ),
            default: () => <h2 class="bg-orange">我是默认插槽</h2>,
            footer: () => <h3 class="bg-grey">我是footer插槽</h3>
          }}
        />
      </div>
    );
  }
};
</script>

<style lang="scss" scoped></style>
