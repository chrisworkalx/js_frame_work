<template>
  <div>
    <p>
      <input
        type="file"
        name="video"
        id="video-input"
        accept="video/*"
        capture="user"
        @change="e => videoChange(e)"
      />
      <span id="info"></span>
    </p>
    <video id="video" width="300" height="300" controls autoplay></video>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    videoChange(e) {
      console.log(e, '===e')
      var file = document.getElementById("video-input").files[0];
      var fileSize = Math.round(file.size / 1024).toFixed();
      document.getElementById("info").innerHTML +=
        "所录视频大小约为：" + (fileSize / 1024).toFixed(2) + "Mb";
      var url = URL.createObjectURL(file);
      console.log(url);
      document.getElementById("video").src = url;
    },
  },
};
</script>