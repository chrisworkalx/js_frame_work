<!-- eslint-disable no-plusplus -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div class="row">
    <div class="col-2">
      <div class="form-group">
        <div
          class="btn-group-vertical buttons"
          role="group"
          aria-label="Basic example"
        >
          <button class="btn btn-secondary" @click="add">Add</button>
          <button class="btn btn-secondary" @click="replace">Replace</button>
        </div>

        <div class="form-check">
          <input
            id="disabled"
            type="checkbox"
            v-model="enabled"
            class="form-check-input"
          />
          <label class="form-check-label" for="disabled">DnD enabled</label>
        </div>
      </div>
    </div>

    <div class="col-6">
      <h3>Draggable {{ draggingInfo }}</h3>

      <draggable
        :list="list"
        :disabled="!enabled"
        class="list-group"
        ghost-class="ghost"
        :move="checkMove"
        @start="dragging = true"
        @end="dragging = false"
      >
        <div
          class="list-group-item"
          v-for="element in list"
          :key="element.name"
        >
          {{ element.name }}
        </div>
      </draggable>
    </div>

    <rawDisplayer class="col-3" :value="list" title="List" />
    <hr />
    <div style="display: flex">
      <draggable v-model="myArray" style="flex: 5">
        <transition-group>
          <div
            v-for="element in myArray"
            :key="element.id"
            style="
              padding: 4px;
              background: #f40;
              color: #fff;
              margin: 10px;
              cursor: pointer;
            "
          >
            {{ element.name }}
          </div>
        </transition-group>
        <button slot="footer">Add</button>
      </draggable>
      <rawDisplayer class="col-3" :value="myArray" title="myArray" />
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import rawDisplayer from '@/components/rawDisplayer.vue';

let id = 1;
export default {
  name: 's-imple',
  display: 'Simple',
  order: 0,
  components: {
    draggable,
    rawDisplayer
  },
  data() {
    return {
      enabled: true,
      list: [
        { name: 'John', id: 0 },
        { name: 'Joao', id: 1 },
        { name: 'Jean', id: 2 }
      ],
      myArray: [
        { name: 'John', id: 0 },
        { name: 'Joao', id: 1 },
        { name: 'Jean', id: 2 }
      ],
      dragging: false
    };
  },
  computed: {
    draggingInfo() {
      return this.dragging ? 'under drag' : '';
    }
  },
  methods: {
    add() {
      id += 1;
      this.list.push({ name: `Juan ${id}`, id });
    },
    replace() {
      id += 1;
      this.list = [{ name: 'Edgard', id }];
    },
    checkMove(e) {
      window.console.log(`Future index: ${e.draggedContext.futureIndex}`);
    }
  }
};
</script>
<style scoped>
.buttons {
  margin-top: 35px;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.col-3 {
  flex: 3;
}
</style>
