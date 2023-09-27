<template>
  <div>
    <el-row style="margin-bottom: 20px">
      <el-col :span="12">
        <el-button type="primary" @click="add">增加form</el-button>
      </el-col>
      <el-col :span="12">
        <el-button type="primary" @click="deleteItem">删除form</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="8">
      <el-form ref="form" label-width="80px">
        <el-col :span="8" v-for="item in defaultFormItems" :key="item.id">
          <el-form-item :label="item.name">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <transition
          v-if="false"
          @beforeEnter="$collapse.beforeEnter"
          @enter="$collapse.enter"
          @afterEnter="handleCollapseAfter"
          @beforeLeave="handleCollapseBeforeLeave"
          @leave="$collapse.leave"
          @afterLeave="$collapse.afterLeave"
        >
          <div v-if="isCollapse">
            <el-col :span="8" v-for="item in hiddenFormItems" :key="item.id">
              <el-form-item :label="item.name">
                <el-input></el-input>
              </el-form-item>
            </el-col>
          </div>
        </transition>

        <my-collapse-transition
          @afterEnter="handleAfterEnter"
          @beforeLeave="handleBeforeLeave"
        >
          <div v-if="isCollapse">
            <el-col :span="8" v-for="item in hiddenFormItems" :key="item.id">
              <el-form-item :label="item.name">
                <el-input></el-input>
              </el-form-item>
            </el-col>
          </div>
        </my-collapse-transition>
        <el-col :span="8" :offset="finalOffset">
          <el-form-item label="更多查询条件" labelWidth="200">
            <i
              class="el-icon-arrow-down arrow-icon"
              @click="isCollapse = !isCollapse"
              :class="[isCollapse ? 'forward-45' : '']"
            ></i>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'transition-collapse',
  data() {
    return {
      isCollapse: false,
      defaultFormItems: [
        {
          name: '账户名称',
          id: 'userAccount'
        },
        {
          name: '所属公司',
          id: 'relatedCorp'
        },
        {
          name: '账户开户',
          id: 'bankId'
        }
      ],
      hiddenFormItems: [
        {
          name: '姓名',
          id: 'name'
        },
        {
          name: '年龄',
          id: 'age'
        },
        {
          name: '性别',
          id: 'sex'
        },
        {
          name: '爱好',
          id: 'hobby'
        }
      ],
      offset: 16
    };
  },
  methods: {
    getRandomIndex(arr) {
      return Math.floor(Math.random() * arr.length);
    },
    add() {
      const randomIndex = this.getRandomIndex(this.defaultFormItems);
      const name = '项目' + (this.defaultFormItems.length + 1);
      const item = {
        name,
        id: name
      };
      this.defaultFormItems.splice(randomIndex, 0, item);
      this.$nextTick(() => {
        this.finalOffset = this.calculateOffset();
      });
    },
    deleteItem() {
      const randomIndex = this.getRandomIndex(this.defaultFormItems);
      this.defaultFormItems.splice(randomIndex, 1);
      this.$nextTick(() => {
        this.finalOffset = this.calculateOffset();
      });
    },
    handleCollapseAfter(el) {
      this.$collapse.afterEnter(el);
      this.finalOffset = this.calculateOffset();
    },
    handleCollapseBeforeLeave(el) {
      this.finalOffset = this.calculateOffset();
      this.$collapse.beforeLeave(el);
    },
    handleAfterEnter(el) {
      console.log('after-enter');
      this.finalOffset = this.calculateOffset();
    },

    handleBeforeLeave(el) {
      console.log('before-leave');
      this.finalOffset = this.calculateOffset();
    },
    calculateOffset() {
      const getAllLen = this.isCollapse
        ? this.defaultFormItems.length + this.hiddenFormItems.length
        : this.defaultFormItems.length;
      const leftGrid = getAllLen % 3;
      if (leftGrid > 0) {
        return (2 - leftGrid) * 8;
      }
      return 2 * 8;
    }
  },
  computed: {
    finalOffset: {
      get() {
        return this.offset;
      },
      set(v) {
        this.offset = v;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.bg-grey {
  background-color: grey;
}

.arrow-icon {
  cursor: pointer;
  transition: all 0.5s ease;
}
.forward-45 {
  transform: rotate(180deg);
}
.flex-row {
  display: flex;
  gap: 4px;
}
</style>
