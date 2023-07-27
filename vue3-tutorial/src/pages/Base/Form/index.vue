<template>
  <h1>这是表单页面</h1>

  <left-title title="基本实现v-model">
    <p>
      原生实现：<input
        :value="text"
        @input="(event) => (text = event.target.value)"
      />
    </p>
    <p>v-model：<input v-model="text" /></p>
  </left-title>

  <left-title title="复选框">
    <input type="checkbox" id="checkbox" v-model="checked" />
    <label for="checkbox">{{ checked }}</label>
  </left-title>
  <left-title title="复选框多选">
    <div>Checked names: {{ checkedNames }}</div>

    <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
    <label for="jack">Jack</label>

    <input type="checkbox" id="john" value="John" v-model="checkedNames" />
    <label for="john">John</label>

    <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
    <label for="mike">Mike</label>
  </left-title>
  <left-title title="单选框实现">
    <div>Picked: {{ picked }}</div>

    <input type="radio" id="one" value="One" v-model="picked" />
    <label for="one">One</label>

    <input type="radio" id="two" value="Two" v-model="picked" />
    <label for="two">Two</label>
  </left-title>

  <left-title title="select 单选">
    <div>Selected: {{ selected }}</div>

    <select v-model="selected">
      <option disabled value="">Please select one</option>
      <option value="A01">A</option>
      <option value="B02">B</option>
      <option value="C03">C</option>
    </select>
  </left-title>
  <left-title title="select 复选">
    <div>Selected: {{ multiSelected }}</div>

    <select v-model="multiSelected" multiple style="width: 100px">
      <option value="A01">A</option>
      <option value="B02">B</option>
      <option value="C03">C</option>
    </select>
  </left-title>

  <left-title title="v-for版本select单选实现">
    <div>Selected: {{ selectedTwo }}</div>
    <select name="ceshi" id="" v-model="selectedTwo">
      <option v-for="item in options" :value="item.value" :key="item.value">
        {{ item.text }}
      </option>
    </select>
  </left-title>

  <left-title title="vue表单特殊绑定">
    静态绑定<input
      type="checkbox"
      v-model="toggle"
      true-value="yes"
      false-value="no"
    />
    动态绑定<input
      type="checkbox"
      v-model="dynamicToggle"
      :true-value="yes"
      :false-value="no"
    />
  </left-title>

  <left-title title="修饰符">
    <left-title title="对于输入框input组件等 lazy相当于change事件触发">
      <!-- 在 "change" 事件后同步更新而不是 "input" -->
      <input v-model.lazy="msg" />
    </left-title>
    <left-title
      title="number修饰, 如果你想让用户输入自动转换为数字，你可以在 v-model 后添加 .number 修饰符来管理输入："
    >
      <input v-model.number="cstNum" />
      <div>
        如果该值无法被 parseFloat() 处理，那么将返回原始值。 number
        修饰符会在输入框有 type="number" 时自动启用
      </div>
    </left-title>
    <left-title title="trim修饰">
      <input v-model.trim="cstTrim" />
      <div>
        如果你想要默认自动去除用户输入内容中两端的空格，你可以在 v-model 后添加
        .trim 修饰符：
      </div>
    </left-title>
  </left-title>
</template>

<script>
export default { name: 'Form' };
</script>

<script setup>
import { ref, reactive, watch } from 'vue';

const text = ref('');

const checked = ref(false);

const checkedNames = ref([]);

watch(checkedNames, (n) => {
  console.log(n);
});

const picked = ref('');

watch(picked, (n, o) => {
  console.log('n', n);
  console.log('o', o);
});

const selected = ref('');

const multiSelected = ref(['A01', 'B02']);

const selectedTwo = ref('A');

const options = ref([
  { text: 'One', value: 'A' },
  { text: 'Two', value: 'B' },
  { text: 'Three', value: 'C' }
]);

const toggle = ref('yes');

const dynamicToggle = ref('');

const yes = ref('good');
const no = ref('bad');

watch(dynamicToggle, (n) => {
  console.log('n', n);
});

const msg = ref('');
const cstNum = ref('');
const cstTrim = ref('');

watch(msg, (n) => {
  console.log('n', n);
});

watch(cstNum, (n) => console.log(n));
watch(cstTrim, (n) => console.log(n));
</script>

<style lang="scss" scoped></style>
