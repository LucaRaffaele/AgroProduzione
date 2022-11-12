<template>
  <div>
    <ejs-grid
      ref="grid"
      :dataSource="dataTable"
      locale="it-IT"
      :allowSorting="true"
      :dataBound="dataBound"
      :allowResizing="true"
      :resizeSettings="{ mode: 'Auto' }"
      :editSettings="editSettings"
      :toolbar="toolbarOptions"
      :toolbarClick="onToolbarClicked"
      :allowPaging="true"
      :pageSettings="pageSettings"
      :actionBegin="actionBegin"
      :recordDoubleClick="onDoubleClick"
      :allowExcelExport="true"
      :allowPdfExport="true"
      :allowTextWrap="true"
      :textWrapSettings="wrapSettings"
      :dataStateChange="onDataStateChange"
      :height="500"
    >
      <e-columns>
        <e-column
          field=""
          header-text=""
          text-align="Center"
          width="60"
        ></e-column>
        <e-column
          field="ana_codice"
          headerText="Codice"
          textAlign="Left"
          width="150"
          hideAtMedia="(min-width: 800px)"
          :is-primary-key="true"
        ></e-column>

        <e-column
          field="ana_desc1"
          headerText="Descrizione"
          textAlign="Left"
          :valueAccessor="descFormatter"
          width="180"
        ></e-column>

        <e-column
          field="ana_cod_fornitore"
          headerText="Cod. Art. Forn."
          textAlign="Left"
          hideAtMedia="(min-width: 1200px)"
          width="120"
        ></e-column>

        <e-column
          field="ana_gruppo"
          headerText="Gruppo."
          textAlign="Left"
          hideAtMedia="(min-width: 800px)"
          width="150"
        ></e-column>

        <e-column
          field="for_desc"
          headerText="Fornitore"
          textAlign="Left"
          hideAtMedia="(min-width: 800px)"
          width="220"
        ></e-column>

        <e-column
          field="mar_desc"
          headerText="Marchio"
          textAlign="Left"
          hideAtMedia="(min-width: 800px)"
          width="180"
        ></e-column>

        <e-column
          field="mer_desc"
          headerText="Cat. Merceologica"
          textAlign="Left"
          hideAtMedia="(min-width: 800px)"
          width="180"
        ></e-column>
        <e-column headerText="Comandi" textAlign="Left" width="80"></e-column>
      </e-columns>
    </ejs-grid>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import ApiService from "@/core/services/ApiService";
import { rsaConsoleLog } from "@/core/helpers/utility";
import { Page } from "@syncfusion/ej2-vue-grids";

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

  provide: {
    grid: [Page]
  },

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
