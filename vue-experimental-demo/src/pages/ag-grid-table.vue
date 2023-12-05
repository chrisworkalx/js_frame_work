<template>
  <div style="height: 100%">
    <div class="test-container">
      <div class="test-header">
        <label>
          <input
            type="radio"
            name="filter"
            id="everyone"
            v-on:change="externalFilterChanged('everyone')"
          />
          Everyone
        </label>
        <label>
          <input
            type="radio"
            name="filter"
            id="below25"
            v-on:change="externalFilterChanged('below25')"
          />
          Below 25
        </label>
        <label>
          <input
            type="radio"
            name="filter"
            id="between25and50"
            v-on:change="externalFilterChanged('between25and50')"
          />
          Between 25 and 50
        </label>
        <label>
          <input
            type="radio"
            name="filter"
            id="above50"
            v-on:change="externalFilterChanged('above50')"
          />
          Above 50
        </label>
        <label>
          <input
            type="radio"
            name="filter"
            id="dateAfter2008"
            v-on:change="externalFilterChanged('dateAfter2008')"
          />
          After 01/01/2008
        </label>
      </div>
      <ag-grid-vue
        style="width: 100%; height: 600px"
        class="ag-theme-alpine"
        :columnDefs="columnDefs"
        @grid-ready="onGridReady"
        :defaultColDef="defaultColDef"
        :animateRows="true"
        :isExternalFilterPresent="isExternalFilterPresent"
        :doesExternalFilterPass="doesExternalFilterPass"
        :rowData="rowData"
        :statusBar="statusBar"
      ></ag-grid-vue>
    </div>
  </div>
</template>

<script>
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridVue } from 'ag-grid-vue3';
import { onBeforeMount, ref } from 'vue';

window.asDate = function asDate(dateAsString) {
  var splitFields = dateAsString.split('/');
  return new Date(
    Number.parseInt(splitFields[2]),
    Number.parseInt(splitFields[1]) - 1,
    Number.parseInt(splitFields[0])
  );
};

var dateFilterParams = {
  comparator: (filterLocalDateAtMidnight, cellValue) => {
    var cellDate = asDate(cellValue);
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
    return 0;
  }
};

var ageType = 'everyone';

export default {
  name: 'App',
  components: {
    AgGridVue
  },
  setup() {
    const columnDefs = ref([
      { field: 'athlete', minWidth: 180 },
      { field: 'age', filter: 'agNumberColumnFilter', maxWidth: 80 },
      { field: 'country' },
      { field: 'year', maxWidth: 90 },
      {
        field: 'date',
        filter: 'agDateColumnFilter',
        filterParams: dateFilterParams
      },
      { field: 'gold', filter: 'agNumberColumnFilter' },
      { field: 'silver', filter: 'agNumberColumnFilter' },
      { field: 'bronze', filter: 'agNumberColumnFilter' }
    ]);
    const gridApi = ref();
    const gridColumnApi = ref();
    const defaultColDef = ref({
      flex: 1,
      minWidth: 120,
      filter: true
    });

    const statusBar = ref({
      statusPanels: [
        {
          statusPanel: 'agTotalAndFilteredRowCountComponent',
          align: 'left'
        }
      ]
    });
    const rowData = ref(null);

    onBeforeMount(() => {});

    const externalFilterChanged = (newValue) => {
      ageType = newValue;
      gridApi.value.onFilterChanged();
    };
    const onGridReady = (params) => {
      console.log('params', params);
      gridApi.value = params.api;
      gridColumnApi.value = params.columnApi;

      const updateData = (data) => {
        // console.log('data', data);
        // document.querySelector('#everyone').checked = true;
        rowData.value = data;
      };

      fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    };
    const isExternalFilterPresent = () => {
      // if ageType is not everyone, then we are filtering
      return ageType !== 'everyone';
    };
    const doesExternalFilterPass = (node) => {
      console.log('here------');
      if (node.data) {
        switch (ageType) {
          case 'below25':
            return node.data.age < 25;
          case 'between25and50':
            return node.data.age >= 25 && node.data.age <= 50;
          case 'above50':
            return node.data.age > 50;
          case 'dateAfter2008':
            return asDate(node.data.date) > new Date(2008, 1, 1);
          default:
            return true;
        }
      }
      return true;
    };

    return {
      columnDefs,
      gridApi,
      gridColumnApi,
      defaultColDef,
      isExternalFilterPresent,
      doesExternalFilterPass,
      rowData,
      onGridReady,
      externalFilterChanged
    };
  }
};
</script>
