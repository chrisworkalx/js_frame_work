<template>
  <div>
    <header>toDo</header>
    <div>
      <p>
        <input v-model="text" />
        <button @click="addList" class="add">增加</button>
      </p>
      <div v-for="item in list" :key="item.id" class="list">
        <span>{{ item.name }}</span>
        <span>{{ item.age }}</span>
        <button style="color: red" @click="del(item)" class="del">删除</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "to-do",
  data: () => ({
    text: "",
    list: [{ id: 0, name: "李洋", age: 30 }],
  }),
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      console.log(123);
      let {
        data: {
          data: { results },
        },
      } = await axios.get("http://localhost:8080/list.json");
      this.list = [
        ...this.list,
        ...results.map((item) => ({
          ...item,
          id: item.id + Math.random(),
        })),
      ];
    },
    addList() {
      this.list.push({
        id: Math.random().toFixed(2),
        name: this.text || "hahaha",
        age: Math.round(Math.random() * 20),
      });
      this.text = "";
    },
    del(item) {
      this.list = this.list.filter((list) => list.id !== item.id);
    },
  },
};
</script>
<style scoped>
.list {
  display: flex;
  height: 40px;
  margin: 10px;
  justify-content: space-around;
  align-items: center;
}
</style>
