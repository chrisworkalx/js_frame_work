<template>
  <div class="alert">
    <div
      class="alert-main"
      ref="toast"
      :style="{ top: index * 40 + 'px' }"
      v-for="(item, index) in notices"
      :key="item.name"
    >
      <div class="alert-content">{{ item.content }}</div>
    </div>
  </div>
</template>

<script>
let seed = 0;

function getUuid() {
  return 'alert_' + seed++;
}

export default {
  name: 'Toast',
  mounted() {
    // console.log(this.$refs.toast, '===kkkk');
  },
  data() {
    return {
      notices: []
    };
  },
  methods: {
    add(notice) {
      console.log('notice----', notice);
      const name = getUuid();

      let _notice = Object.assign(
        {
          name: name
        },
        notice
      );

      this.notices.push(_notice);

      // 定时移除，单位：秒
      const duration = notice.duration;
      setTimeout(() => {
        this.remove(name);
      }, duration * 1000);
    },
    remove(name) {
      const notices = this.notices;

      for (let i = 0; i < notices.length; i++) {
        if (notices[i].name === name) {
          this.notices.splice(i, 1);
          break;
        }
      }
    }
  }
};
</script>

<style scoped>
.alert {
  /* position: fixed;
  width: 100vw;
  height: 100vh;
  background: transparent;
  left: 0;
  top: 0;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  align-items: center; */
  .alert-main {
    position: absolute;
    left: 50%;
    margin: 10px;
    display: inline-block;
    background-color: skyblue;
    padding: 4px 10px;
  }
}
</style>
