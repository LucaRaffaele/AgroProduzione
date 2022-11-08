<template>
  <div>
    <ejs-grid :dataSource="data">
      <e-columns>
        <e-column
          field="OrderID"
          headerText="Order ID"
          textAlign="Right"
          width="100"
        ></e-column>
        <e-column
          field="CustomerID"
          headerText="Customer ID"
          width="120"
        ></e-column>
        <e-column
          field="ShipCountry"
          headerText="Ship Country"
          width="150"
        ></e-column>
      </e-columns>
    </ejs-grid>
    <!-- <ejs-grid
      ref="grid"
      :dataSource="data"
      locale="it-IT"
      :allowSorting="true"
      :allow-resizing="true"
      :resize-settings="{ mode: 'Auto' }"
      :allow-text-wrap="true"
      :height="500"
    >
      <e-columns>
        <e-column
          field="ana_codice"
          header-text="Codice"
          text-align="Left"
          width="150"
          :is-primary-key="true"
        ></e-column>

        <e-column
          field="ana_desc1"
          header-text="Descrizione"
          text-align="Left"
          :value-accessor="descFormatter"
          width="250"
        ></e-column>

        <e-column
          field="ana_cod_fornitore"
          header-text="Cod. Art. Forn."
          text-align="Left"
          width="120"
        ></e-column>

        <e-column
          field="ana_gruppo"
          header-text="Gruppo."
          text-align="Left"
          width="150"
        ></e-column>

        <e-column
          field="for_desc"
          header-text="Fornitore"
          text-align="Left"
          width="220"
        ></e-column>

        <e-column
          field="mar_desc"
          header-text="Marchio"
          text-align="Left"
          width="180"
        ></e-column>

        <e-column
          field="mer_desc"
          header-text="Cat. Merceologica"
          text-align="Left"
          width="180"
        ></e-column>
      </e-columns>
    </ejs-grid> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective
} from "@syncfusion/ej2-vue-grids";
import ApiService from "@/core/services/ApiService";
import { rsaConsoleLog } from "@/core/helpers/utility";

export default defineComponent({
  name: "ArticoliGrid",
  components: {
    "ejs-grid": GridComponent,
    "e-columns": ColumnsDirective,
    "e-column": ColumnDirective
  },
  props: {
    search: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: 20
    },
    filter: {
      type: String,
      default: ""
    },
    records: {
      type: Object,
      default: () => {
        return {};
      }
    },
    multiselection: {
      type: Boolean,
      default: false
    },
    filterToolbar: {
      type: Boolean,
      default: false
    }
  },

  emit: ["edit-articolo"],
  /* 
  provide: {
    grid: [Sort, Edit, Toolbar, Page, ExcelExport, PdfExport, Resize]
  }, */

  setup(props, { emit }) {
    const data = ref<Array<any>>([
      {
        OrderID: 10248,
        CustomerID: "VINET",
        ShipCountry: "France"
      },
      {
        OrderID: 10249,
        CustomerID: "TOMSP",
        ShipCountry: "Germany"
      }
    ]);

    const state = ref({ skip: 0, take: props.size, requiresCounts: true });

    onMounted(() => {
      rsaConsoleLog("ArticoliGrid mounted");
      // onDataStateChange(state);
    });

    const onDataStateChange = (state) => {
      const url =
        "articoli/getjoined?top=" + state.take + "&skip=" + state.skip;

      ApiService.setHeader();
      ApiService.get(url)
        .then(({ data }) => {
          rsaConsoleLog("*** Result -> ", data);
          if (data.RecordsTotal > 0) {
            data.value = {
              result: data.Data,
              count: data.RecordsTotal
            };
          }
        })
        .catch(({ response }) => {
          rsaConsoleLog("Error--------------- ", response);
        });
    };

    const descFormatter = (field, data) => {
      return data[field] + " " + data.ana_desc2.trim();
    };

    return {
      data,
      descFormatter,
      onDataStateChange
    };
  }
});
</script>
