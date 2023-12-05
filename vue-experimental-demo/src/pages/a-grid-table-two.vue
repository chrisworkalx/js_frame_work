<template>
  <div style="height: 100vh; width: 100%">
    <ag-grid-vue
      style="width: 100%; height: 100%"
      class="ag-theme-alpine"
      :columnDefs="columnDefs"
      @grid-ready="onGridReady"
      :defaultColDef="defaultColDef"
      :enableRangeSelection="true"
      :rowSelection="rowSelection"
      :statusBar="statusBar"
      :rowData="rowData"
    ></ag-grid-vue>
  </div>
</template>

<script>
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AgGridVue } from 'ag-grid-vue3';
import { createApp, onBeforeMount, ref } from 'vue';

const VueExample = {
  components: {
    'ag-grid-vue': AgGridVue
  },
  setup(props) {
    const columnDefs = ref([
      { field: 'athlete', minWidth: 200 },
      { field: 'age', filter: 'agNumberColumnFilter' },
      { field: 'country', minWidth: 200 },
      { field: 'year' },
      { field: 'date', minWidth: 180 },
      { field: 'sport', minWidth: 200 },
      { field: 'gold' },
      { field: 'silver' },
      { field: 'bronze' },
      { field: 'total' }
    ]);
    const gridApi = ref();
    const gridColumnApi = ref();
    const defaultColDef = ref({
      flex: 1,
      minWidth: 100,
      filter: true,
      resizable: true
    });
    const rowSelection = ref(null);
    const statusBar = ref(null);
    const rowData = ref(null);

    onBeforeMount(() => {
      rowSelection.value = 'multiple';
      statusBar.value = {
        statusPanels: [
          // { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
          { statusPanel: 'agTotalRowCountComponent', align: 'center' }
          // { statusPanel: 'agFilteredRowCountComponent' },
          // { statusPanel: 'agSelectedRowCountComponent' },
          // { statusPanel: 'agAggregationComponent' }
        ]
      };
    });

    const onGridReady = (params) => {
      gridApi.value = params.api;
      gridColumnApi.value = params.columnApi;

      const updateData = (data) => params.api.setRowData(data);

      fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    };

    return {
      columnDefs,
      gridApi,
      gridColumnApi,
      defaultColDef,
      rowSelection,
      statusBar,
      rowData,
      onGridReady
    };
  }
};

export default {
  ...VueExample
};
</script>

<style lang="scss" scoped></style>
