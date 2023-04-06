<!--
 * @Description  :
 * @Version      : 1.0
 * @Author       : mingfei.yao
 * @Date         : 2023-02-15 11:56:47
 * @LastEditors  : mingfei.yao
 * @LastEditTime : 2023-02-15 15:23:18
 * @FilePath     : \\vue-draggable\\src\\views\\El-Select.vue
 * @Copyright (C) 2023 mingfei.yao. All rights reserved.
 -->
<template>
  <div>
    <el-select v-model="value" clearable placeholder="请选择">
      <template #empty>
        <add-button
          @openDialog="isCreateFormVisible = true"
          @confirmDialog="isCreateFormVisible = false"
          @closeDialog="isCreateFormVisible = false"
          :cliamant-options="cliamantOptions"
        ></add-button>
      </template>
      <add-button
        @openDialog="isCreateFormVisible = true"
        @confirmDialog="isCreateFormVisible = false"
        @closeDialog="isCreateFormVisible = false"
        :cliamant-options="cliamantOptions"
      ></add-button>
      <!-- <el-option
        v-for="item in cliamantOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      > -->
      <el-option
        v-for="item in cliamantOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      <div style="margin: 10px;">
        <span>{{ item.label }}</span>
      <span @click.stop="handleClick" class="edit-btn">
        <i class="el-icon-edit"></i>
      </span>
      </div>
    </el-option>
      </el-option>
    </el-select>
    <el-dialog
      title="提示"
      :visible.sync="isCreateFormVisible"
      width="30%"
      center
    >
      <span>需要注意的是内容是默认不居中的</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isCreateFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="isCreateFormVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'e-select',
  components: {
    addButton: {
      name: 'addButton',
      props: {
        cliamantOptions: {
          type: Array,
          default: () => []
        }
      },
      methods: {
        openDialog() {
          this.$emit('openDialog');
        },
        confirmDialog() {
          this.$emit('confirmDialog');
        },
        closeDialog() {
          this.$emit('closeDialog');
        }
      },
      mounted() {
        console.log(this);
      },
      render(h) {
        return h(
          'div',
          {
            class: {
              addButton: true,
              // hideBottom: !this.cliamantOptions.length
              hideBottom: true
            }
          },
          [
            h(
              'el-button',
              {
                on: {
                  click: this.openDialog
                }
              },
              ['新增']
            )
          ]
        );
      }
    }
  },
  data() {
    return {
      cliamantOptions: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      isCreateFormVisible: false,
      value: ''
    };
  },
  methods: {
    openCreateFormDialog() {
      this.isCreateFormVisible = true;
    },

    handleClick() {
      console.log('hello');
    }
  }
};
</script>
<style scoped lang="scss">
.addButton {
  padding: 4px;
  margin-bottom: 4px;
  // border-bottom: solid #ccc 1px;
}
.hideBottom {
  border-bottom: none !important;
}
.edit-btn {
  margin-left: 60px;

  display: inline-block;
  width: 60px;
  background: #f40;
  height: 100%;
  line-height: 1;
  color: #fff;
}
</style>
