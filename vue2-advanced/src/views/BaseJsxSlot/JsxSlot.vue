<script>
export default {
  name: 'jsx-slot',
  // this.$scopedSlots.header({ user: this.user})
  // 相当于
  // <slot name='default' :user="user"></slot>
  data() {
    return {
      user: {
        name: 'chrisworkalx'
      }
    };
  },
  render() {
    return (
      <div>
        <h1 class="bg-green">主要介绍关于jsx语法中插槽转换问题</h1>
        {this.$scopedSlots.default()}
        {this.$scopedSlots.header({ user: this.user })}
        {this.$scopedSlots.footer()}
      </div>
    );
  }
};
</script>
