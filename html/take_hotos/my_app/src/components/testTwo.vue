<template>
  <div>
    <h1>---------------------------------------------------------</h1>
    {{ a.b }}
    <p>
      <button @click="jump">跳转</button>
    </p>
  </div>
</template>

<script>
export default {
  name: "testTwo",
  data() {
    return {
      a: {},
    };
  },
  created() {
    this.a.b = 1;
  },
  mounted() {
    this.a.b = 3;
    // console.log(this, "===this");
    setTimeout(() => {
      this.a.b = "你好";
      this.$forceUpdate();
    }, 0);
  },
  methods: {
    postUrl(url, params) {
      var form = document.createElement("form");
      form.action = url;
      form.target = "_target";
      form.method = "post";
      form.style.dispaly = "none";
      var item = {
        name: "假装有参数",
        value: "假装有值",
      };
      params = params !== undefined ? params : item;
      //添加参数
      for (var i in params) {
        var opt = document.createElement("input");
        opt.type = "hidden";
        opt.name = params[i].name;
        opt.value = params[i].value;
        form.appendChild(opt);
      }
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
      return form;
    },
    jump() {
      // console.log(111111);
      //调用
      var a = [
        {
          name: "username",
          value: "alley",
        },
        {
          name: "password",
          value: "123456",
        },
      ];
      this.postUrl("http://localhost:3000/test", a);
    },
  },
};
</script>
