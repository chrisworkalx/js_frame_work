<script setup>
import { computed } from 'vue';

const props = defineProps({
  firstName: String,
  lastName: String,
  firstNameModifiers: { default: () => ({}) },
  lastNameModifiers: { default: () => ({}) }
});

const emit = defineEmits(['update:firstName', 'update:lastName']);

let elepha = '🐘'.replace(/\s+/g, '');
function emitValue(e) {
  let value = e.target.value.replace(/\s+/g, '');
  console.log('value', value);
  let firstName = value.split(/[🌞🌛]/g)[0];
  console.log('firstName', firstName);
  let lastName = value.split(/[✨🪐]/g)[1];
  console.log('lastName', lastName);

  emit('update:firstName', firstName);
  emit('update:lastName', lastName);
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const complexValue = computed({
  get() {
    const firstName = props.firstNameModifiers.capitalize
      ? capitalizeFirstLetter(props.firstName) + '🌞'
      : props.firstName + '🌛';
    const lastName = props.lastNameModifiers.uppercase
      ? '✨' + props.lastName.toUpperCase()
      : '🪐' + props.lastName;
    console.log('getter');
    return firstName + lastName;
  },
  set(value) {
    console.log('setter');
    console.log('value', value);
    emitValue({ target: { value } });
  }
});
</script>

<template>
  <input type="text" v-model="complexValue" />
</template>
