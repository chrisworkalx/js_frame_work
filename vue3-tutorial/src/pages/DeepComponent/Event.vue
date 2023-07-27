<template>
  <form action="#" method="get" @submit.prevent="submitForm(email, password)">
    <input type="text" name="email" v-model="email" />
    <input type="password" name="password" v-model="password" />
    <input type="submit" value="提交" />
  </form>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const emit = defineEmits({
  // 没有校验
  click: null,

  // 校验 submit 事件
  submit: ({ email, password }) => {
    if (email && password) {
      return true;
    } else {
      console.warn('Invalid submit event payload!');
      return false;
    }
  }
});

function submitForm(email, password) {
  emit('submit', { email, password });
}
</script>
