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
      },
      tip: `消息提示zdsakjhdskadjhlksajdlksjalkdjslakdjslakjdls jsakhdjksahdsak季后赛看到后就开始疯狂解释
      的文案消息提示的文案消息提示的文案消息提示的文案消息提示的文案消息提示的文案消息提示的文案消息提示的文案消息提示的文案消息提示的文案`
    };
  },
  render() {
    return (
      <div>
        <h1 class="bg-green">主要介绍关于jsx语法中插槽转换问题</h1>
        <el-alert type="info" show-icon title={this.tip} closable={false} />
        {this.$scopedSlots.default()}
        {this.$scopedSlots.header({ user: this.user })}
        {this.$scopedSlots.footer()}
      </div>
    );
  }
};
</script>
