<template>
  <div>
    <h3>{{ title }}</h3>
    <Comp />
    <portal to="destination">
      <p class="portal">来自slot-demo2的投喂 传送门</p>
    </portal>
  </div>
</template>

<script>
const Comp = {
  render(h) {
    return h(
      'div',
      {
        style: {
          backgroundColor: '#f40',
          color: '#fff'
        }
      },
      [
        h(
          'span',
          {
            props: {
              name: 'default'
            }
          },
          this.name
        )
      ]
    );
  },
  data() {
    return {
      name: 'what are you doing?'
    };
  }
};
export default {
  sendToSlotOne: '传送给slot-demo1的自定义参数',
  data() {
    return {
      title: `slot-demo2`,
      params: {
        text: 'hello, slot1, this is slot2'
      }
    };
  },
  components: {
    Comp
  },
  created() {
    this.$emit('update', Comp);
    console.log(this.$slots.default);
  }
};
</script>

<style lang="scss" scoped>
.portal {
  background-color: darkorange;
  color: #fff;
}
</style>
