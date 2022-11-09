<template>
  <div>
    <ejs-grid
      ref="grid"
      :dataSource="dataTable"
      locale="it-IT"
      :allowSorting="true"
      :data-bound="dataBound"
      :allow-resizing="true"
      :resize-settings="{ mode: 'Auto' }"
      :edit-settings="editSettings"
      :toolbar="toolbarOptions"
      :toolbar-click="onToolbarClicked"
      :allow-paging="true"
      :page-settings="pageSettings"
      :action-begin="actionBegin"
      :record-double-click="onDoubleClick"
      :allow-excel-export="true"
      :allow-pdf-export="true"
      :allow-text-wrap="true"
      :text-wrap-settings="wrapSettings"
      :data-state-change="onDataStateChange"
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
    </ejs-grid>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import ApiService from "@/core/services/ApiService";
import { rsaConsoleLog } from "@/core/helpers/utility";

export default defineComponent({
  name: "articoli-grid",

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
    const dataTable = ref();

    const state = ref({ skip: 0, take: props.size, requiresCounts: true });

    onMounted(() => {
      rsaConsoleLog("ArticoliGrid mounted");
      onDataStateChange(state);
    });

    const onDataStateChange = (state) => {
      rsaConsoleLog("*** Result -> ", state);
      const url =
        "articoli/getjoined?top=" +
        state.take +
        "&skip=" +
        state.skip +
        "&inlinecount=true";
      ApiService.setHeader();
      ApiService.get(url)
        .then(({ data }) => {
          rsaConsoleLog("*** Result -> ", data.RecordsTotal);
          if (data.RecordsTotal > 0) {
            dataTable.value = {
              result: data.Data,
              count: data.RecordsTotal
            };
          }
        })
        .catch(({ response }) => {
          rsaConsoleLog("Error--------------- ", response);
        });
    };

    const dataBound = () => {
      rsaConsoleLog(
        "-> dataBound document",
        document.getElementsByClassName("e-grid")[0]
      );
      /* const gridInstance =
        document.getElementsByClassName("e-grid")[0].ej2_instances[0];
      gridInstance.gridLines = "Both";
      gridInstance.autoFitColumns(); */
    };

    const editSettings = ref({
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      showDeleteConfirmDialog: false,
      newRowPosition: "Top",
      mode: "Dialog"
    });

    const toolbarOptions = ref([
      {
        text: "F2 - OK",
        tooltipText: "Seleziona il record",
        prefixIcon: "mdi mdi-check text-info bx-sm mb-1",
        id: "Seleziona"
      },
      {
        text: "F4 - Modifica",
        tooltipText: "Modifica record",
        prefixIcon: "mdi mdi-pencil-outline text-warning bx-sm mb-1",
        id: "Modifica"
      },
      {
        text: "F3 - Nuovo",
        tooltipText: "Inserisci un nuovo record",
        prefixIcon: "mdi mdi-plus text-success bx-sm mb-1",
        id: "Aggiungi"
      },

      "Search"
    ]);

    const onToolbarClicked = (args) => {
      rsaConsoleLog("-> onToolbarClicked args ", args);
    };

    const pageSettings = ref({ pageSizes: true, pageSize: props.size });
    const wrapSettings = ref({ wrapMode: "Content" });

    const actionBegin = (args) => {
      if (args.requestType === "beginEdit") {
        args.cancel = true;
      }
    };

    const onDoubleClick = (args) => {
      rsaConsoleLog("Double click", args);
      /* if (this.search) {
        if (this.multiselection) this.selectArticolo([args.rowData]);
        else this.selectArticolo(args.rowData);
        this.$bvModal.hide("articoli-search");
      } else {
        rsaUtility.consoleLog(
          "ArticoliGrid emit edit-articolo onDoubleClick",
          args.rowData
        );
        if (!this.toDeveloped) this.$emit("edit-articolo", true, args.rowData);
      } */
    };

    const descFormatter = (field, data) => {
      return data[field] + " " + data.ana_desc2.trim();
    };

    return {
      dataTable,
      dataBound,
      editSettings,
      toolbarOptions,
      onToolbarClicked,
      pageSettings,
      actionBegin,
      onDoubleClick,
      wrapSettings,
      descFormatter,
      onDataStateChange
    };
  }
});
</script>
