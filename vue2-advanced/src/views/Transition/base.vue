<template>
  <div>
    <custom></custom>
  </div>
</template>

<script>
export default {
  name: 'transition-base',
  components: {
    custom: {
      data() {
        return {
          isShow: false,
          list: [1, 2, 3, 4]
        };
      },
      render() {
        return (
          <div class="customer">
            <el-button
              type="primary"
              onClick={() => (this.isShow = !this.isShow)}
            >
              原生实现
            </el-button>
            <div style="overflow: hidden">
              <el-card
                class={[
                  'box-card',
                  this.isShow
                    ? 'animate__heartBeat come'
                    : 'animate__bounceOut go'
                ]}
                scopedSlots={{
                  default: () => (
                    <div class="card-content">
                      {this.list.map((item, index) => (
                        <el-tag key={index}>{item}</el-tag>
                      ))}
                    </div>
                  )
                }}
              />
            </div>
          </div>
        );
      }
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep {
  .customer {
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    .box-card {
      width: 100%;
      transition: all 1s;
      transform: translateY(-100%);
      box-sizing: border-box;
      .card-content {
        display: flex;
        gap: 10px;
      }
      &.come {
        // animation: show 1s;
        transform: translateY(0px);
        height: 100%;
      }
      &.go {
        // reverse 反方向
        // animation: hide 1s linear 0.5s;
        transform: translateY(-100%);
        height: 0;
      }
    }
    @keyframes show {
      from {
        transform: translateY(-100%);
      }
      to {
        transform: translateY(0px);
      }
    }
    @keyframes hide {
      // from {
      //   transform: translateY(0px);
      // }
      to {
        transform: translateY(-100%);
      }
    }
  }
}
</style>
