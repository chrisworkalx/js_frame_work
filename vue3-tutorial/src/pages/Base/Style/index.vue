<template>
  <h1>这是样式绑定页面</h1>

  <left-title title="<red>:class={} </red>对象用法">
    <div>
      <p :class="{ activeColor: isActive }">
        这是一段文字
        <el-button type="primary" @click="handleChangeTextColor"
          >toggle改变颜色</el-button
        >
      </p>
    </div>
  </left-title>
  <left-title title="以对象形式传入<red>:class='classObject'</red>">
    <div :class="classObject" style="padding: 10px">这是一行文本hello</div>
  </left-title>
  <left-title
    title="以计算属性传入对象形式传入<red>:class='classObject2'</red>"
  >
    <div :class="classObject2" style="padding: 10px">这是一行文本world</div>
  </left-title>
  <left-title title="绑定数组<red>:class=[activeClass, errorClass]</red>">
    <div :class="[activeClass, errorClass]" style="padding: 10px">
      这是一行文本javascript
    </div>
  </left-title>
  <left-title
    title="如果你也想在数组中有条件地渲染某个 class，你可以使用三元表达式：<red>:class=[isActive ? activeClass : '', errorClass]</red>"
  >
    <div
      :class="[isActive ? activeClass : '', errorClass]"
      style="padding: 10px"
    >
      这是一行文本三元表达式
    </div>
  </left-title>
  <left-title title="数组嵌套对象表示">
    <div :class="[{ active: isActive }, errorClass]" style="padding: 10px">
      :class="[{ active: isActive }, errorClass]"
    </div>
  </left-title>
  <left-title title="自定义组件使用class">
    <StyleComp class="manual-style" />
  </left-title>
  <left-title title="动态绑定style">
    <template #default>
      <div :style="{ color: activeColor, fontSize: fontSize + 'px' }">
        自定义style
      </div>
      <div :style="{ 'font-size': fontSize + 'px' }">内敛样式</div>
    </template>
  </left-title>
  <left-title title="动态绑定style">
    <div :style="styleObject">:style="styleObject"</div>
  </left-title>
  <left-title title="多个对象内联样式绑定">
    <div :style="[baseStyles, overridingStyles]">
      :style="[baseStyles, overridingStyles]"
    </div>
  </left-title>
  <left-title title="样式多值">
    <div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }">
      <span>aaaaa===>></span>
      <span>{{ ' <<=====bbbbb ' }}</span>
    </div>
  </left-title>

  <left-title title="v-bind(变量)">
    <div class="v-bind" v-pre>
      const isRedColor = ref('#f40') .v-bind: v-bind(isRedColor)sss
    </div>
  </left-title>
</template>

<script>
export default { name: 'Style' };
</script>

<script setup>
import { ref, reactive, computed } from 'vue';
import StyleComp from './StyleComp.vue';
const isActive = ref(false);

const handleChangeTextColor = () => {
  isActive.value = !isActive.value;
};

const classObject = reactive({
  active: true,
  'text-danger': false
});

const isActive2 = ref(true);
const error = ref({
  type: 'fatal'
});

const classObject2 = computed(() => ({
  active: isActive2.value && !error.value,
  'text-danger': error.value && error.value.type === 'fatal'
}));

const activeClass = ref('active');
const errorClass = ref('text-danger');

const activeColor = ref('red');
const fontSize = ref(30);

const styleObject = reactive({
  color: 'red',
  fontSize: '13px'
});

const overridingStyles = ref({
  backgroundColor: '#f40',
  color: '#fff'
});

const isRedColor = ref('#f40');
</script>

<style lang="scss" scoped>
.activeColor {
  color: green;
}
.active {
  background-color: aqua;
}
.text-danger {
  color: red;
}
.manual-style {
  background-color: bisque;
}
.v-bind {
  color: v-bind(isRedColor);
}
</style>
