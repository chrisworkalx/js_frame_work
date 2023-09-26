<template>
  <div class="t-table" style="width: 100%">
    <div style="display: flex; justify-content: space-between">
      <el-tag>{{ dateTime }}</el-tag>
      <el-button type="primary" @click="handleWorkerExport">导出</el-button>
    </div>
    <t-table :table="table" use-virtual :columns="table.columns" />
  </div>
</template>

<script>
import FileSaver from 'file-saver';
import defaultTableMixin from './table-config.vue';
import Worker from './excel.test.worker';
export default {
  name: 'workerExportLargeFile',
  mixins: [defaultTableMixin],
  methods: {
    async handleWorkerExport() {
      const _file = await new Promise((resolve, reject) => {
        const myWorker = new Worker();

        myWorker.postMessage({
          columns: this.table.columns,
          dataSource: this.table.data
        });
        myWorker.onmessage = (e) => {
          resolve(e.data.data);
          myWorker.terminate(); // 关闭worker线程
        };
      });
      FileSaver.saveAs(_file, 'WorkerExcelJS.xlsx');
    }
  }
};
</script>

<style lang="scss" scoped></style>
