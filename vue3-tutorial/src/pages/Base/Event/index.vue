<template>
  <h1>这是事件使用页面</h1>

  <left-title title="事件对象获取">
    <button @click="getEvent">SubmitA</button>
    <!-- 使用特殊的 $event 变量 -->
    <button @click="warn('Form cannot be submitted yet--AAAA.', $event)">
      SubmitB
    </button>

    <!-- 使用内联箭头函数 -->
    <button
      @click="(event) => warn('Form cannot be submitted yet--BBBB.', event)"
    >
      SubmitC
    </button>
  </left-title>

  <left-title title="不用stop修饰符 打印inner middle outer">
    <div class="wrapper center" @click="handleWrapperClick">
      <div class="middle center" @click="handleMiddleClick">
        <div class="inner" @click="handleInnerClick"></div>
      </div>
    </div>
  </left-title>

  <left-title title="事件修饰符">
    <left-title title="stop修饰符">
      <div class="wrapper center" @click="handleWrapperClick">
        <div class="middle center" @click.stop="handleMiddleClick">
          <div class="inner" @click.stop="handleInnerClick"></div>
        </div>
      </div>
    </left-title>

    <left-title
      title="<red>prevent</red>修饰符提交事件将不再重新加载页面，只会触发submit事件"
    >
      <!-- 提交事件将不再重新加载页面 -->
      <form @submit.prevent="onSubmit" method="get" action="/">
        姓名<input name="name" value="小明" /> 年龄<input
          name="age"
          value="20"
        />
        <input type="submit" value="提交" />
      </form>
    </left-title>
    <left-title title="<red>prevent</red>阻止默认事件">
      <!-- 修饰语可以使用链式书写 -->
      <a @click.stop.prevent="doThat" href="https://www.baidu.com">去百度</a>
    </left-title>

    <left-title title="self修饰符">
      <!-- 仅当 event.target 是元素本身时才会触发事件处理器 -->
      <!-- 例如：事件处理器不来自子元素 -->
      <div @click.self="doThat" class="wrapper center">
        <div class="inner"></div>
      </div>
    </left-title>
    <left-title title="注意">
      使用修饰符时需要注意调用顺序，因为相关代码是以相同的顺序生成的。因此使用
      @click.prevent.self 会阻止元素及其子元素的所有点击事件的默认行为，而
      @click.self.prevent 则只会阻止对元素本身的点击事件的默认行为。
    </left-title>
  </left-title>

  <left-title title="capture属性">
    <!-- 添加事件监听器时，使用 `capture` 捕获模式 -->
    <!-- 例如：指向内部元素的事件，在被内部元素处理前，先被外部处理 -->
    <left-title title="capture用法">
      1. 添加事件监听器时，使用 `capture` 捕获模式 2.
      例如：指向内部元素的事件，在被内部元素处理前，先被外部处理 3.
      内部元素设置capture这个属性，会优先触发外部事件
    </left-title>
    <left-title title="会打印 outer middle inner">
      <div @click.capture="doThis" class="wrapper center">
        <div class="middle center" @click.capture="() => console.log('middle')">
          <div
            class="inner center"
            @click.capture="() => console.log('inner')"
          ></div>
        </div>
      </div>
    </left-title>
  </left-title>

  <left-title title="按键修饰@keyup.enter">
    <!-- 仅在 `key` 为 `Enter` 时调用 `submit` -->
    <input @keyup.enter="() => console.log('enter')" />
  </left-title>

  <left-title title="组合键形式">
    <!-- Alt + Enter -->
    <input @keyup.alt.enter="() => console.log('keyup.alt.enter')" />

    <!-- Ctrl + 点击 -->
    <div @click.ctrl="() => console.log('Ctrl + 点击')" class="inner">
      Do something
    </div>
  </left-title>
</template>

<script>
export default { name: 'Event' };
</script>

<script setup>
const getEvent = (e) => {
  console.log('e.target.innerHTML', e.target.innerHTML);
};
function warn(message, event) {
  // 这里可以访问原生事件
  if (event) {
    event.preventDefault();
  }
  alert(message);
}

const handleWrapperClick = () => {
  console.log('outer');
};

const handleMiddleClick = () => {
  console.log('middle');
};

const handleInnerClick = () => {
  console.log('inner');
};

const onSubmit = () => {
  console.log('onSubmit');
};

const doThat = () => {
  console.log('默认事件');
};

const doThis = () => {
  console.log('outer');
};
</script>

<style lang="scss" scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrapper {
  width: 200px;
  height: 200px;
  background-color: #f40;
}
.middle {
  width: 100px;
  height: 100px;
  background-color: #f99;
}
.inner {
  width: 50px;
  height: 50px;
  background-color: blue;
}
</style>
