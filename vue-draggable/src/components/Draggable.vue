<template>
  <main>
    <div class="mt-5 container">
      <div style="display: flex; width: 100%; gap: 100px">
        <div class="col-5" style="flex: 1">
          <h4 class="mb-3">容器 A</h4>
          <draggable
            class="draggable-list"
            :list="list1"
            :group="{ name: 'my-group', pull: 'clone', put: false }"
          >
            <div class="list-item" v-for="element in list1" :key="element.name">
              {{ element.name }}
            </div>
          </draggable>
        </div>

        <div class="col-5" style="flex: 1">
          <h4 class="mb-3">容器 B</h4>
          <draggable class="draggable-list" :list="list2" group="my-group">
            <div class="list-item" v-for="element in list2" :key="element.name">
              {{ element.name }}
            </div>
          </draggable>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
/**
 * group
    要实现两个或多个区域内组件的拖拽，
    各区域的 group 对象名需要命名一致。
    可以写成 group：‘kalacloud-group’ 或者 group:{name:'kalacloud-group'}

  clone
  clone 是 group 中的一个十分有用的功能。打开后，拖拽时可将被拖拽组件复制到另一个区域。

  group 里的 pull: 'clone' 开启后，表示拖拽后克隆拖拽组件。
  put: false 用来定义是否可以往此容器中放置组件，true 表示可以，false 表示不行。

 */
import Draggable from 'vuedraggable';

export default {
  name: 'DraggAble',
  components: {
    draggable: Draggable
  },
  data() {
    return {
      list1: [{ name: '方块A：拖动我试试' }],
      list2: [{ name: '方块B：请拖动我试试' }]
    };
  }
};
</script>
<style scoped>
.draggable-list {
  background: #3f51b5;
  color: #fff;
  border: 1px solid;
  height: 50vh;
}
.list-item {
  margin: 10px;
  padding: 40px;
  cursor: pointer;
  font-size: 18px;
  border-radius: 5px;
  background: #f44336;
  display: inline-block;
}
</style>
