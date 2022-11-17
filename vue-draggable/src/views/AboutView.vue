<!-- eslint-disable global-require -->
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-dialog
      width="50%"
      title="内层 Dialog"
      :visible.sync="innerVisible"
      append-to-body>
        <editor
          v-model="content"
          @init="editorInit"
          :lang="langType"
          theme="chrome"
          width="100%"
          height="100"
        />
    </el-dialog>
    <el-button @click="handleOpenXmlDialog">打开xml弹框</el-button>
    <el-button @click="handleOpenJsonDialog">打开json弹框</el-button>
  </div>
</template>

<script>
export default {
  name: 'A-bout',
  components: {
    // eslint-disable-next-line global-require
    editor: require('vue2-ace-editor')
  },
  data() {
    return {
      content: '',
      innerVisible: false,
      langType: 'xml',
      jsonStr: {
        name: 'lilei',
        hobbies: {
          drawing: 100,
          sporting: 80
        },
        arr: [1, 2, 3]
      }
    };
  },
  methods: {
    editorInit() {
      /* eslint-disable */
      require('brace/ext/language_tools'); // language extension prerequsite...
      require('brace/mode/html');
      require('brace/mode/json');
      require('brace/mode/javascript'); // language
      require('brace/mode/less');
      require('brace/theme/chrome');
      require('brace/snippets/javascript'); // snippet
      require('brace/mode/xml'); // language
    },
    handleOpenXmlDialog() {
      this.content = `
        <?xml version="1.0" encoding="UTF-8"?>
        <definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:flowable="http://flowable.org/bpmn" xmlns:xsd="http://www.w3.org/2001/XMLSchema" targetNamespace="http://www.flowable.org/processdef">
          <process id="process_kdhpn89j" flowable:color="rgba(30, 144, 255, 1)" flowable:icon="el-icon-s-tools" />
          <bpmndi:BPMNDiagram id="BPMNDiagram_flow">
            <bpmndi:BPMNPlane id="BPMNPlane_flow" bpmnElement="process_kdhpn89j" />
          </bpmndi:BPMNDiagram>
        </definitions>
      `
      this.innerVisible = true;
    },
    handleOpenJsonDialog() {
      this.content = JSON.stringify(this.jsonStr, null, 4);
      this.langType = 'json',
      this.innerVisible = true;
    }
  }
};
</script>
