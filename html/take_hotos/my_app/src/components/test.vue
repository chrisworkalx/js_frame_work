 <template>
  <div>
    <h1>{{ pageName }}</h1>
    <br />
    <button @click="getSelfproto">获取当前页面信息</button>
    <br />
    <button @click="getParentproto">获取父级页面信息</button>
    <!-- <div v-html="html"></div> -->
    <a :href="href" ref="jumpNode">{{href}}</a>
  </div>
</template>

<script>
import axios from 'axios';
const domainURI = (str) => {  
  const durl=/https?:\/\/([^\/]+)\//i;  
  let domain = str.match(durl) || [];  
  return domain[1];  
}

//获取父级页面路由信息
const getParentUrl = () => {
  let url = '';
  let origin = '';
  if (parent !== window) {
    try {
      url = parent.location.href;
      origin = parent.location.origin;
    } catch (e) {
      url = document.referrer;
      origin = domainURI(document.referrer)
    }
  }
  return {
    url,
    origin
  };
}
export default {
  name: "Test",
  data() {
    return {
      pageName: "我是test页面",
      html: '',
      href: ''
    };
  },
  mounted() {
    const isOpenUrl  = false;
    const token = '123szerx';
    // const url = isOpenUrl ? `https://api.megvii.com/faceid/lite/do?token=${token}` : '/api/faceid'
    const url = '/api/faceid/lite/do'
    axios.get(url, {
      params: {
        token
      }
    })
    .then(s => {
      // console.log(s.data, '====s');
      // document.write(s.data)
      // this.html= '<h1>就将计就计</h1>';
      this.html= s.data;
    })
    this.href = url;
    setTimeout(() => {
      this.$nextTick(() => {
      // this.$refs.jumpNode.click();
    })
    }, 3000)
  },
  methods: {
    getSelfproto() {
      const { pathname, hostname, port } = window.location;
      // console.log("pathname", pathname);
      // console.log("hostname", hostname);
      // console.log("port", port);
      // console.log(window.location);
    },
    getParentproto() {
      // console.log(top.location, '====父级的页面信息')
      // console.log("获取父级页面信息");
    //   console.log(parent);
      // console.log(this.getParentUrl(), '====页面是谁')
    },
    getParentUrl() {
      var url = null;
      if (parent !== window) {
        try {
          url = parent.location.href;
        } catch (e) {
          url = document.referrer;
        }
      }
      return url;
    },
    
  },
};
</script>

<style>
</style>