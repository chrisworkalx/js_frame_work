<template>
  <div>
    <h1>Cropper-Image</h1>
    <div class="imgBox">
      <img class="image" ref="img" :src="logoSrc" />
    </div>

    <div style="background: #fff">
      <img
        style="border: solid 1px #ccc; border-radius: 50%"
        :src="rightSrc"
        v-if="rightSrc"
      />
    </div>

    <div style="display: flex; gap: 10px">
      <el-button type="primary" @click="handleToolbarAction('zoom', 0.1)"
        >放大</el-button
      >
      <el-button type="primary" @click="handleToolbarAction('zoom', -0.1)"
        >缩小</el-button
      >
      <el-button type="primary" @click="handleToolbarAction('rotate', 45)"
        >rotate顺时针</el-button
      >
      <el-button type="primary" @click="handleToolbarAction('rotate', -45)"
        >rotate逆时针</el-button
      >
      <el-button type="primary" @click="handleToolbarAction('scaleX')"
        >scaleX放大</el-button
      >
      <el-button type="primary" @click="handleToolbarAction('scaleY')"
        >scaleY放大</el-button
      >
      <el-button type="primary" @click="handleToolbarAction('reset')"
        >重置</el-button
      >
    </div>
  </div>
</template>

<script>
import Logo from '@/assets/logo.png';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

/**
 * debounce防抖函数
 */
function debounce(fn, t = 200) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.call(this, ...arguments);
    }, t);
  };
}

let scaleX = 1;
let scaleY = 1;
export default {
  name: 'CropperImage',
  data() {
    return {
      logoSrc: Logo,
      rightSrc: null,
      cropper: null
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      //全局去设置一些参数
      // Cropper.setDefaults({
      //   viewMode: 3
      // });

      /**
       * image ==> img元素或者canvas标签
       */
      const self = this;
      const image = this.$refs.img;
      this.cropper = new Cropper(image, {
        // aspectRatio: 16 / 9,//取景框宽高比
        // background: false, //网格背景图
        autoCropArea: 0.6, // 取景框占整个图片的面积
        // dragMode: 'move', //可以拖动元素
        // movable: false, //是否可以拖动图片
        // cropBoxMovable: false, //取景框是否可以拖动
        minContainerWidth: 200, //image 区域container最小宽度
        minContainerHeight: 200, //image 区域container最小高度
        // toggleDragModeOnDblclick: false, //Enable to toggle drag mode between "crop" and "move" when clicking twice on the cropper.
        ready() {
          console.log('ready for move');
        },
        crop(event) {
          // console.log(event.detail.x, '=====x');
          // console.log(event.detail.y, '===y');
          // console.log(event.detail.width, '=====width');
          // console.log(event.detail.height, '======height');
          // console.log(event.detail.rotate, '======rotate');
          // console.log(event.detail.scaleX, '======scaleX');
          // console.log(event.detail.scaleY, '=========scaleY');
          // console.log('self', self);
          self.cropped.call(self);
        },
        zoom() {
          console.log('here-----');
        }
      });

      console.log('cropper.getData()', this.cropper.getData());
    },
    handleToolbarAction(actionName, n) {
      if (actionName === 'scaleX') {
        scaleX = n = scaleX === -1 ? 1 : -1;
      }
      if (actionName === 'scaleY') {
        scaleY = n = scaleY === -1 ? 1 : -1;
      }
      this.cropper[actionName](n);
    },

    cropped: debounce.call(this, function () {
      let canvas = this.getRoundedCanvas();

      canvas.toBlob((blob) => {
        if (!blob) {
          return;
        }

        let fileReader = new FileReader();

        fileReader.readAsDataURL(blob);

        fileReader.onloadend = (e) => {
          // console.log('e.target.result', e.target.result);
          this.rightSrc = e.target.result;
        };
      }, 'image/png');
    }),

    getRoundedCanvas() {
      const sourceCanvas = this.cropper.getCroppedCanvas({
        width: 200,
        height: 200
      });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const width = sourceCanvas.width;
      const height = sourceCanvas.height;
      canvas.width = width;
      canvas.height = height;
      context.imageSmoothingEnabled = true;
      context.drawImage(sourceCanvas, 0, 0, width, height);
      context.globalCompositeOperation = 'destination-in';
      context.beginPath();
      context.arc(
        width / 2,
        height / 2,
        Math.min(width, height) / 2,
        0,
        2 * Math.PI,
        true
      );
      context.fill();
      return canvas;
    }
  }
};
</script>

<style lang="scss" scoped>
.imgBox {
  width: 400px;
  height: 300px;
  margin: 100px auto;
  // border: solid 4px #ccc;
  // padding: 10px;
  // overflow: hidden;
  img.image {
    // width: 100%;
    // height: 100%;
    display: block;
    max-width: 100%;
  }
}
</style>
