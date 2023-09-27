<template>
  <div>
    <button @click="show = !show">Toggle render</button>
    <transition name="slide-fade">
      <p v-if="show">hello</p>
    </transition>
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__heartBeat"
      leave-active-class="animate__bounceOut"
    >
      <p v-if="show">animate.css</p>
    </transition>
    <hr class="mb-20" />
    <button v-on:click="add()">Add</button>
    <transition-group name="card" tag="ul">
      <li class="card" v-for="item in items" :key="item.id">
        Id: {{ item.id }}
      </li>
    </transition-group>
    <hr class="mb-20" />
  </div>
</template>

<script>
export default {
  name: 'transition-base-demo',
  data() {
    return {
      show: true,
      items: [
        {
          id: 1
        },
        {
          id: 2
        }
      ]
    };
  },
  methods: {
    add: function () {
      this.items.push({
        id: Math.random()
      });
    }
  }
};
</script>

<style lang="scss" scoped>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
  // animation: move 1s;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  // animation: move 1s reverse;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

@keyframes move {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0px);
  }
}

.card {
  transition: all 0.5s;
}
.card-enter, .card-leave-to
/* .card-leave-active for <2.1.8 */ {
  opacity: 0;
  transform: scale(0);
}
.card-enter-to {
  opacity: 1;
  transform: scale(1);
}

.card-leave-active {
  /*position: absolute;*/
}

.card-move {
  opacity: 1;
  transition: all 0.5s;
}
.mb-20 {
  margin-bottom: 20px;
}
</style>
