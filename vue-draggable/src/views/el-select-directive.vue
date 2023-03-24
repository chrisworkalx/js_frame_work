<!--
 * @Description  :自定义select指令
 * @Version      : 1.0
 * @Author       : mingfei.yao
 * @Date         : 2023-03-23 10:19:08
 * @LastEditors  : mingfei.yao
 * @LastEditTime : 2023-03-24 13:51:17
 * @FilePath     : \\vue-draggable\\src\\views\\el-select-directive.vue
 * @Copyright (C) 2023 mingfei.yao. All rights reserved.
 -->

 <template>
  <div>
    <el-select
    ref="cstSelectRef"
    v-model="model"
    @change="handleChange"
    @focus="handleFocus"
    @clear="handleClear"
    placeholder="请选择"
    v-lazy-scroll-load="loadConfig"
    filterable
    clearable
    :filter-method="handleFilterMethod"
    @visible-change="handleVisibleChange">
      <el-option
        v-for="item in loadConfig.options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
 </template>

<script>
import { debounce } from '@/directives/lazy-scroll-load/lazy-load';

const bigList = Array(20000).fill('').map((_, index) => ({
  id: index,
  label: `第${index + 1}个节点`,
  value: index
}));

export default {
  name: 'El-select-directive',
  data() {
    return {
      model: '',
      bigList,
      filterList: bigList,
      size: 20,
      start: 0,
      end: 20,
      isFiltered: false,
      mark: Date.now()
    };
  },
  computed: {
    loadConfig() {
      return {
        value: this.model,
        start: this.start,
        end: this.end,
        bigList: this.bigList,
        mark: this.mark,
        filterList: this.filterList,
        options: this.getOptions(),
        loadData: this.loadData,
        distance: 20,
        isFiltered: this.isFiltered,
        disabled: false,
        scrollBody: '.el-scrollbar__wrap',
        transformBody: '.el-select-dropdown__list',
        childNode: '.el-select-dropdown__item',
        callback: (newStartIndex, cb) => {
          this.start = newStartIndex;
          this.end = this.start + this.size;
          cb('哈喽');
        }
      };
    }
  },
  watch: {

  },
  methods: {
    loadData() {
    },
    handleChange(v) {
      this.loadConfig.disabled = true;
      this.$emit('change', v);
      this.$nextTick(() => {
        this.$refs.cstSelectRef.blur();
      });
    },
    handleVisibleChange(show) {
      if (!show) {
        this.$nextTick(() => {
          this.$refs.cstSelectRef.blur();
        });
      }
      this.$emit('visible-change', show);
    },
    getOptions() {
      let list = [];
      if (this.isFiltered) {
        list = this.filterList;
      } else {
        list = this.bigList;
      }

      const lastIndex = list.length > this.end ? this.end : list.length;
      console.log('this.start', this.start);
      console.log('this.end', this.end);
      console.log('lastIndex', lastIndex);
      console.log('list', list);
      return list.slice(this.start, lastIndex);
    },
    handleFilterMethod: debounce(function (v) {
      this.mark = Date.now();
      if (v) {
        this.isFiltered = true;
        const arr = this.bigList.filter((item) => item.label.includes(v));
        this.filterList = arr;
        this.start = 0;
        this.end = this.size;
      } else {
        this.filterList = [];
        this.start = 0;
        this.end = this.size;
        this.isFiltered = false;
      }
    }),
    handleClear() {
      this.mark = Date.now();
      this.loadConfig.disabled = false;
      this.start = 0;
      this.end = this.size;
      this.filterList = [];
      this.isFiltered = false;
    },
    handleFocus(e) {
      if (!this.model) {
        this.loadConfig.disabled = false;
        this.mark = Date.now();
      } else {
      }
      this.$emit('focus', e);
    }
  }
};
</script>

 <style lang="scss" scoped>

 </style>
