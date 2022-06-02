<template>
  <div>
    <van-uploader
      v-model="videoList"
      :max-count="1"
      preview-size="120px"
      accept="video/*"
      :after-read="handlevideosc"
      :before-read="handlebefread"
      @click-preview="handleclicksc"
    >
      <div slot="preview-cover">
        <video
          style="width: 120px; height: 120px; object-fit: cover"
          :src="videourl"
          v-if="videourl"
        ></video>
      </div>
    </van-uploader>
    <div style="font-size: 12px; color: #777">视频大小不能超过100M</div>
    <van-dialog
      style="width: 100%; border-radius: 0; height: 200px"
      theme="default"
      v-model="showvideoplay"
      :show-cancel-button="false"
      :show-confirm-button="false"
      closeOnClickOverlay
    >
      <video
        controls
        preload="auto"
        style="width: 100%; height: 200px; object-fit: contain"
        :src="videourl"
        v-if="videourl"
      ></video>
    </van-dialog>
  </div>
</template>
<script>
export default {
  name: "vantUpload",
  data() {
    return {
      carinfo: {
        videofile: "",
        ngEcoOpenNo: "",
      },
      videoList: [],
      videourl: "",
      showvideoplay: false,
    };
  },
  methods: {
    handlebefread(e) {
      if (e.size > 104857600) {
        // this.$Message.error("选择/录制视频不能超过100M");
        return false;
      }
      return true;
    },
    handlevideosc(file) {
      // console.log(file, '====file')
      this.videourl = file.content;
    },
    handleclicksc(file) {
      this.showvideoplay = true;
    },
    handleconfirpop() {
      if (this.videoList.length > 0) {
        this.carinfo.videofile = this.videoList[0].content;
      }
      //这里写提交后台代码
    },
    handleplay(item) {
      this.show = true;
      this.videoList = [];
      this.carinfo.ngEcoOpenNo = item.ngEcoOpenNo;
    },
  },
};
</script>
