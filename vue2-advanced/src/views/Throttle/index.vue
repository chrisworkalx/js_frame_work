<script>
import { debounce } from 'lodash';
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
    },
    handleDebounce: debounce(() => {
      console.log('常规点击防抖');
    }, 1000)
  },
  render() {
    return (
      <div>
        <divider title="原生debounce实现"></divider>
        <el-button type="info" onClick={this.handleDebounce}>
          常规防抖
        </el-button>
        <divider title="my-throttle组件：click事件"></divider>
        <my-throttle time={1000} events="click">
          <el-button type="primary" onClick={this.handleClick}>
            {this.count}
          </el-button>
        </my-throttle>
        <divider title="my-throttle组件：blur事件"></divider>
        <my-throttle time={2000} events="blur">
          <el-input
            style={{ marginTop: '20px' }}
            value={this.title}
            onInput={this.handleChange}
            onBlur={() => console.log('失去焦点')}
          />
        </my-throttle>
        <divider title="multi-throttle组件：内嵌一个slot"></divider>
        <multi-throttle time={4000} events="click">
          <el-button type="primary" onClick={this.handleClick}>
            {this.count}
          </el-button>
        </multi-throttle>
        <divider title="multi-throttle组件：内嵌多个组件"></divider>
        <multi-throttle time={3000} events={this.config}>
          <div>
            ElButton组件按钮1:
            <el-button type="primary" onClick={this.handleClick}>
              {this.count}
            </el-button>
          </div>
          <div>
            原生组件-按钮2:
            <button
              style={{ padding: '4px 10px' }}
              onClick={this.handleClickTwo}
            >
              {this.count}
            </button>
          </div>

          <div>
            <span>ElInput组件-Blur：</span>
            <el-input
              style={{ marginTop: '20px' }}
              value={this.title}
              onInput={this.handleChange}
              onBlur={() => console.log('失去焦点')}
            />
          </div>
        </multi-throttle>
        <hr />
      </div>
    );
  }
};
</script>

<style lang="scss" scoped></style>
