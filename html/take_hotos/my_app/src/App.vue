<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <br>
    <VantUpload></VantUpload>
    <br>
    <Test />
    <br>
    <testTwo />
    <br>
    <br>
    <br>
    <br>
    <br>
    <iframe
        scrolling="no"
        id="iframeA"
        src="http://localhost:8999/#/externalPayment"
        style="width: 100%; height: 100vh"
        frameborder="0"
      ></iframe>
  </div>
</template>

<script>
// console.log(window.parent.aaa(), '===kkkkkk')
import VantUpload from './components/VantUpload.vue';
import HelloWorld from './components/HelloWorld.vue';
import testTwo from './components/testTwo.vue';
import Test from './components/test.vue'
export default {
  name: 'App',
  components: {
    HelloWorld,
    VantUpload,
    Test,
    testTwo
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
