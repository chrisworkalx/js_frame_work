<template>
  <div>
    <h1>关于watch方面的</h1>
    <p>{{ combineText }}</p>
    <hr />
    <el-select v-model="form.text1">
      <el-option
        v-for="item in option1"
        :key="item.value"
        :value="item.value"
        :label="item.name"
      />
    </el-select>
    <el-select v-model="form.text2">
      <el-option
        v-for="item in option2"
        :key="item.value"
        :value="item.value"
        :label="item.name"
      />
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'I-watch',
  data() {
    return {
      form: {
        text1: '',
        text2: ''
      },
      option1: [
        { name: '篮球', value: 'basketball' },
        { name: '足球', value: 'footballball' },
        { name: '羽毛球', value: 'badminton' }
      ],
      option2: [
        { name: '苹果', value: 'apple' },
        { name: '橙子', value: 'orange' },
        { name: '香蕉', value: 'banana' }
      ],
      list: []
    };
  },
  props: {
    text1: {
      type: String,
      default: ''
    },
    text2: {
      type: String,
      default: ''
    }
  },
  created() {
    this.form.text1 = this.text1;
    this.form.text2 = this.text2;
  },
  computed: {
    combineText() {
      return `${this.form.text1}/${this.form.text2}`;
    }
  },
  methods: {
    createRandomTime() {
      return Math.round(Math.random() * 2000);
    }
  },
  watch: {
    'form.text1': function (n, o) {
      console.log(n, o, '---text1');
      this.list.push(
        () =>
          new Promise((res) => {
            setTimeout(res, this.createRandomTime(), 'text1');
          })
      );
    },
    'form.text2': function (n, o) {
      console.log(n, o, '====text2');
      this.list.push(
        () =>
          new Promise((res) => {
            setTimeout(res, this.createRandomTime(), 'text2');
          })
      );
    },
    list: {
      handler(n, o) {
        // eslint-disable-next-line no-param-reassign
        n = n.map((i) => {
          if (i) {
            return i();
          }
          return new Promise((res) =>
            // eslint-disable-next-line no-promise-executor-return
            setTimeout(res, this.createRandomTime(), 'default')
          );
        });
        Promise.race(n).then((res) => {
          console.log('res', res);
        });
      },
      deep: true
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped></style>
