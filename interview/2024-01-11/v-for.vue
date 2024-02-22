<template>
  <div>
    <comp-one
      :value="componeValue"
      @input="(v) => (componeValue = v)"
    ></comp-one>
    <comp-two v-model="isChecked"></comp-two>
    {{ isChecked ? '命中' : '失败' }}
    <div
      v-for="(item, index) in list"
      :key="index"
      :class="[active === index ? 'active' : '']"
    >
      <span>{{ item }}</span>
      <button @click="changeBgColor(index)">改变颜色</button>
      <button @click="handleDelete(item)">删除</button>
    </div>

    {{ type }}

    <component :is="type">
      <span>123</span>
    </component>
  </div>
</template>

<script>
import AMixin from './mixin/a.mixin.js';
import BMixin from './mixin/b.mixin.js';

const CompOne = {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  render(h) {
    console.log(this.value, '===');
    return h('div', null, [
      h('h1', null, [this.title]),
      h('div', null, [
        h('input', {
          domProps: {
            value: this.value
          },
          on: {
            input: (e) => {
              this.$emit('input', e.target.value);
            }
          }
        })
      ])
    ]);
  },
  data() {
    return {
      title: 'CompOne'
    };
  }
};
const CompTwo = {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  render(h) {
    return h('div', null, [
      h('h1', null, [this.title]),
      h('div', null, [
        h('input', {
          domProps: {
            type: 'checkbox',
            checked: this.checked
          },
          on: {
            change: (e) => {
              this.$emit('change', e.target.checked);
            }
          }
        })
      ])
    ]);
  },
  data() {
    return {
      title: 'CompTwo'
    };
  }
};
export default {
  mixins: [AMixin, BMixin],
  components: {
    CompOne,
    CompTwo
  },
  data() {
    return {
      componeValue: 'hello',
      isChecked: false,
      active: 0,
      list: [1, 2, 3]
    };
  },
  mounted() {
    console.log('this is demo');
  },
  computed: {
    type() {
      return 'comp-one';
    }
  },
  methods: {
    changeBgColor(index) {
      this.active = index;
    },
    handleDelete(item) {
      const index = this.list.findIndex((i) => i === item);
      if (index > -1) {
        this.list.splice(index, 1);
      }
    }
  }
};
</script>

<style scoped>
.active {
  background-color: #f40;
  color: #fff;
}
</style>
