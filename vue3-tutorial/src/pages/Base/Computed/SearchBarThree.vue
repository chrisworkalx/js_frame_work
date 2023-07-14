<template>
  <el-input v-model="model.keyword" :placeholder="modelValue.placeholder">
    <template #prepend>
      <el-select
        v-model="model.selectedValue"
        placeholder="Select"
        style="width: 85px"
      >
        <el-option
          v-for="item in model.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </template>
    <template #append>
      <el-button :icon="Search" />
    </template>
  </el-input>
</template>

<script setup>
import { computed } from 'vue';
import { Search } from '@element-plus/icons-vue';
const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
});

// 定义一个 emit 事件
const emit = defineEmits(['update:modelValue']);
// 写一个计算属性，同时提供 get 和 set
// const model = computed({
//   get() {
//     return props.modelValue;
//   },
//   set(val) {
//     //因为侦测的是model，所以只有修改model的时候才会触发，并不是某一个属性
//     console.log('val >>> ', val);
//     emit('update:modelValue', val);
//   }
// });

const model = computed({
  get() {
    // 我们这里返回一个代理对象，代理 props.modelValue 这个属性
    return new Proxy(props.modelValue, {
      // 因为这是一个代理对象，那么将来修改代理对象的某个值时
      // 就会运行这个 set 函数
      // 函数中可以拿到
      //   obj：改动的对象
      //   name：改动的属性名
      //   val：改动的属性值
      set(obj, name, val) {
        console.log('Emit >>> ', name, val);
        // 当我们想改的一个对象的属性时并不去真正的修改
        // 而是在这里也触发 emit，然后生成一个新的对象
        emit('update:modelValue', {
          ...obj, // 展开以前对象的值
          [name]: val // 将其中的修改的属性修改为新的值
        });
        return true; // 最后返回一个 true
      }
    });
  },
  set(val) {
    console.log('set---');
    emit('update:modelValue', val);
  }
});
</script>

<style lang="scss" scoped></style>
