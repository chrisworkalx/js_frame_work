<template>
  <a v-if="isExternalLink" v-bind="$attrs" :href="to" target="_blank">
    <slot />
  </a>
  <router-link v-else v-bind="$props" custom>
    <template #default="{ isActive, href, navigate }">
      <a
        v-bind="$attrs"
        :href="href"
        @click="navigate"
        :class="isActive ? activeClass : inactiveClass"
      >
        <slot />
      </a>
    </template>
  </router-link>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  name: 'AppLink',
  inheritAttrs: false,

  props: {
    // 如果使用 TypeScript，请添加 @ts-ignore
    ...RouterLink.props,
    height: {
      type: Number,
      default: 40
    },
    activeClass: {
      type: String,
      default: 'activeClass'
    },
    inactiveClass: {
      type: String,
      default: 'inactiveClass'
    }
  },

  computed: {
    isExternalLink() {
      return typeof this.to === 'string' && this.to.startsWith('http');
    }
  },
  mounted() {
    // console.log('this.$el', this.$el);
  }
};
</script>

<style scoped>
.activeClass {
  display: inline-block;
  background-color: #f40;
  text-decoration: none;
  color: #fff;
  padding: 6px;
  margin-bottom: 4px;
}

.inactiveClass {
  display: inline-block;
  /* background-color: #ccc; */
  text-decoration: none;
  color: #666;
  padding: 6px;
  margin-bottom: 4px;
}
</style>
