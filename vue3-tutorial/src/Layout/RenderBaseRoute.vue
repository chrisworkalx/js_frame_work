<template>
  <a
    href="javascript:void 0;"
    @click.prevent="handleExpandMenu"
    :class="['overlay-menu', isDown ? 'down-arrow' : '']"
    >{{ subTitle }}</a
  >
  <Transition>
    <div
      class="wrapperMenu"
      :style="{ height: isDown ? allSubMenusHeight + 'px' : 0 }"
    >
      <app-link
        v-for="item in menus"
        :to="'/' + item.path"
        :key="item.path"
        ref="collectMenus"
        >{{ '跳转到➡️' + item.path }}</app-link
      >
    </div>
  </Transition>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  type: {
    type: String,
    required: true
  },
  subTitle: {
    type: String,
    required: true
  }
});

const collectMenus = ref([]);

const allSubMenusHeight = ref(0);

const store = useStore();

const isDown = ref(false);

const menus = computed(() => {
  return store.state.menus.filter((item) => item.type === props.type);
});

const handleExpandMenu = () => {
  isDown.value = !isDown.value;
};

onMounted(() => {
  // console.log('collectMenus.value', collectMenus.value);

  allSubMenusHeight.value = collectMenus.value.reduce((prev, next) => {
    // console.log(next, '===next');
    return prev + (next?.getOffsetHeight() || next.height);
  }, allSubMenusHeight.value);
});
</script>

<style lang="scss" scoped>
.overlay-menu {
  position: relative;
  display: inline-block;
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: green;
  &::after {
    content: '▶️';
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 10px;
    top: 0;
    font-size: 20px;
    transition: transform 0.5s ease;
    transform-origin: center;
  }
  &.down-arrow {
    &::after {
      transform: rotate(90deg);
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.wrapperMenu {
  display: flex;
  flex-direction: column;
  height: 0;
  overflow: hidden;
  transition: all 0.5s linear;
}
</style>
