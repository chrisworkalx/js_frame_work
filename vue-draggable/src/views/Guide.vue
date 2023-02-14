<!--
 * @Description  :
 * @Version      : 1.0
 * @Author       : mingfei.yao
 * @Date         : 2023-02-10 19:07:12
 * @LastEditors  : mingfei.yao
 * @LastEditTime : 2023-02-10 19:13:35
 * @FilePath     : \\vue-draggable\\src\\views\\Guide.vue
 * @Copyright (C) 2023 mingfei.yao. All rights reserved.
 -->
<template>
  <h1>222</h1>
  <!-- <div data-title="Welcome!" data-intro="Hello World! 👋" class="card-demo">
    <div class="card shadow--md">
      <div class="card__image" data-intro="Intro.js can highlight on elements">
        <img src="..." alt="Image alt text" title="Logo Title Text 1" />
      </div>
      <div
        class="card__body"
        data-title="Farewell!"
        data-intro="And this is the last step!"
      >
        <h4>Quaco Lighthouse</h4>
        <small>
          The Quaco Head Lighthouse is a well maintained lighthouse close to St.
          Martins. It is a short, beautiful walk to the lighthouse along the
          seashore.
        </small>
      </div>
    </div>
  </div> -->
</template>

<script>
import introJs from 'intro.js';
import 'intro.js/introjs.css';

export default {
  name: 'g-uide',
  mounted() {
    introJs().start();
  }
};
</script>

<style lang="scss" scoped></style>
