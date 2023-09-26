<template>
  <div class="t-table" style="width: 100%">
    <div style="display: flex; justify-content: space-between">
      <el-tag>{{ dateTime }}</el-tag>
      <el-button type="primary" @click="handleExport">导出</el-button>
    </div>
    <t-table
      :table="table"
      use-virtual
      :maxHeight="400"
      :columns="table.columns"
    />
  </div>
</template>

<script>
import ExcelJS from 'exceljs';
import FileSaver from 'file-saver';
import defaultTableMixin from './table-config.vue';
export default {
  name: 'regularExportLargeFile',
  mixins: [defaultTableMixin],
  methods: {
    handleExport() {
      // 主线程导出Excel
      // 创建工作簿
      const workbook = new ExcelJS.Workbook();
      // 添加工作表
      const worksheet = workbook.addWorksheet('sheet1');

      // 设置表格内容
      const _titleCell = worksheet.getCell('A1');
      _titleCell.value = 'Hello ExcelJS!';

      const workBookColumns = this.table.columns.map((item) => ({
        header: item.label,
        key: item.key,
        width: 32
      }));
      worksheet.columns = workBookColumns;
      worksheet.addRows(this.table.data);

      // 导出表格
      workbook.xlsx.writeBuffer().then((buffer) => {
        let _file = new Blob([buffer], {
          type: 'application/octet-stream'
        });
        FileSaver.saveAs(_file, 'ExcelJS.xlsx');
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
