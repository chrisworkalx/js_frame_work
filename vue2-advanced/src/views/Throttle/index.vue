<script>
export default {
  name: 'Throttle',
  data() {
    return {
      count: 0,
      title: '',
      config: {
        click: { time: 1000 },
        blur: { time: 5000 }
      }
    };
  },
  methods: {
    handleClick() {
      this.count++;
    },
    handleClickTwo() {
      console.log('第二个点击');
    },
    handleChange(v) {
      this.title = v;
    }
  },
  render() {
    return (
      <div>
        <my-throttle time={1000} events="click">
          <el-button type="primary" onClick={this.handleClick}>
            {this.count}
          </el-button>
        </my-throttle>
        <divider title="单个throttle"></divider>
        <my-throttle time={2000} events="blur">
          <el-input
            style={{ marginTop: '20px' }}
            value={this.title}
            onInput={this.handleChange}
            onBlur={() => console.log('失去焦点')}
          />
        </my-throttle>
        <divider title="单个throttle"></divider>
        <my-throttle time={1000} events="click">
          <el-button type="primary" onClick={this.handleClick}>
            {this.count}
          </el-button>
        </my-throttle>
        <divider title="监听多个slot"></divider>
        <multi-throttle time={3000} events={this.config}>
          <el-button type="primary" onClick={this.handleClick}>
            {this.count}
          </el-button>
          <button onClick={this.handleClickTwo}>{this.count}</button>
          <el-input
            style={{ marginTop: '20px' }}
            value={this.title}
            onInput={this.handleChange}
            onBlur={() => console.log('失去焦点')}
          />
        </multi-throttle>
        <hr />
      </div>
    );
  }
};
</script>

<style lang="scss" scoped></style>
