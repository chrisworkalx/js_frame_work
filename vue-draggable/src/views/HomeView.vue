<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Draggable />
  </div>
</template>

<script>
// @ is an alias to /src
import Draggable from '../components/Draggable.vue';

export default {
  name: 'HomeView',
  components: {
    Draggable
  }
};
</script>
