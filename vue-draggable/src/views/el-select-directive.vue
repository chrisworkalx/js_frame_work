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
    <!-- <el-select
      ref="cstSelectRef"
      v-model="model"
      @change="handleChange"
      @focus="handleFocus"
      @clear="handleClear"
      @blur="handleBlur"
      placeholder="请选择"
      v-lazy-scroll-load="loadConfig"
      filterable
      clearable
      :filter-method="handleFilterMethod"
      @visible-change="handleVisibleChange"
    >
      <el-option
        v-for="item in loadConfig.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select> -->
    <el-select
      ref="cstSelectRef"
      v-model="model2"
      @change="handleChange"
      @focus="handleFocus"
      @clear="handleClear"
      @blur="handleBlur"
      placeholder="请选择"
      v-lazy-scroll-load="loadConfig2"
      filterable
      clearable
      :filter-method="handleFilterMethod"
      @visible-change="handleVisibleChange"
    >
      <el-option
        v-for="item in loadConfig.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-select v-model="textModel">
      <el-option
        v-for="item in kk"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { debounce } from '@/directives/lazy-scroll-load/lazy-load';

const bigList = Array(20000)
  .fill('')
  .map((_, index) => ({
    id: index,
    label: `第${index + 1}个节点`,
    value: index
  }));

const kk = bigList.slice(0, 200);

export default {
  name: 'El-select-directive',
  data() {
    return {
      textModel: '',
      kk,
      model: '',
      model2: '',
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
        rowHeight: 34,
        distance: 20,
        isFiltered: this.isFiltered,
        disabled: false,
        scrollBody: '.el-scrollbar__wrap',
        transformBody: '.el-select-dropdown__list',
        childNode: '.el-select-dropdown__item',
        callback: (newStartIndex, domProps, cb) => {
          console.log('newStartIndex', newStartIndex);
          this.start = newStartIndex;
          this.end = this.start + this.size;
          cb('哈喽');
        }
      };
    },
    loadConfig2() {
      return {
        value: this.model2,
        start: this.start,
        end: this.end,
        bigList: this.bigList,
        mark: this.mark,
        filterList: this.filterList,
        options: this.getOptions(),
        loadData: this.loadData,
        rowHeight: 34,
        distance: 20,
        isFiltered: this.isFiltered,
        disabled: false,
        scrollBody: '.el-scrollbar__wrap',
        transformBody: '.el-select-dropdown__list',
        childNode: '.el-select-dropdown__item',
        callback: (newStartIndex, domProps, cb) => {
          console.log('newStartIndex', newStartIndex);
          this.start = newStartIndex;
          this.end = this.start + this.size;
          cb('哈喽');
        }
      };
    }
  },
  watch: {},
  methods: {
    loadData() {},
    handleChange(v) {
      this.loadConfig.disabled = true;
      this.$emit('change', v);
      this.$nextTick(() => {
        this.$refs.cstSelectRef.blur();
      });
    },
    handleBlur() {
      // console.log('---isBlured');
    },
    handleVisibleChange(show) {
      if (!show) {
        this.$nextTick(() => {
          this.$refs.cstSelectRef.blur();
        });
      } else {
        this.mark = Date.now();
      }
      this.$emit('visible-change', show);
    },
    getOptions() {
      let list = [];
      console.log('this.isFiltered', this.isFiltered);
      console.log('this.filterList', this.filterList);
      if (this.isFiltered) {
        list = this.filterList;
      } else {
        list = this.bigList;
      }
      return list.slice(this.start, this.end);
    },
    handleFilterMethod: debounce(function (v) {
      this.mark = Date.now();
      this.isFiltered = true;
      this.start = 0;
      this.end = this.size;
      if (v) {
        const arr = this.bigList.filter((item) => item.label.includes(v));
        this.filterList = arr;
      } else {
        console.log('not--filtered');
        this.filterList = this.bigList;
        this.start = 0;
        this.end = this.size;
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
      if (!this.loadConfig2.value) {
        console.log('focused');
        this.loadConfig.disabled = false;
        this.mark = Date.now();
        this.filterList = this.bigList;
      } else {
      }
      this.$emit('focus', e);
    }
  }
};
</script>

<style lang="scss" scoped></style>
