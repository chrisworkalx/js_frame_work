<template>
  <div class="count">
    <span class="left-label" @click="handleClick" v-html="compileTitle"></span>
    <div :class="[props.isShowBorder && isHasChildDOM ? 'isShowBorder' : '']">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeftTitle'
};
</script>

<script setup>
import { computed, useSlots, ref } from 'vue';
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  isShowBorder: {
    type: Boolean,
    default: true
  }
});

const slots = useSlots();

const len = ref(Object.keys(slots).length);

const isHasChildDOM = computed(() => {
  return len.value > 0;
});

// Object.keys(slots).forEach((k) => {
//   console.log(k, '---k');
// });

// console.log('slots', slots);

const reg = /<(red|green|blue|random)>(.*?)<\/\1>/g;

const getRandomNum = () => Math.floor(Math.random() * 255);

const randomColor = () =>
  `rgb(${getRandomNum()}, ${getRandomNum()}, ${getRandomNum()})`;

const compileTitle = computed(() => {
  return props.title.replace(reg, (_, $1, $2) => {
    const random_color = $1.includes('random') ? randomColor() : $1;
    return `<span style="color: ${random_color};font-size: 20px;">${$2}</span>`;
  });
});

const emit = defineEmits(['test']);

const handleClick = () => {
  emit('test');
};
</script>

<style lang="scss" scoped>
.count {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  .left-label {
    color: skyblue;
    background-color: antiquewhite;
    border-radius: 4px;
    padding: 4px;
  }
  &:hover {
    color: #f40;
  }
  .isShowBorder {
    border: dashed 1px #f99;
    padding: 10px;
  }
}
</style>
