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
      :toolbar="toolbar"
      :toolbarClick="onToolbarClicked"
      :allowPaging="true"
      :pageSettings="pageSettings"
      :actionBegin="actionBegin"
      :recordDoubleClick="onDoubleClick"
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
          field="tab_codice"
          headerText="Codice"
          textAlign="Left"
          width="150"
          hideAtMedia="(min-width: 800px)"
          :is-primary-key="true"
        ></e-column>

        <e-column
          field="tab_desc"
          headerText="Descrizione"
          textAlign="Left"
          :valueAccessor="descFormatter"
          width="180"
        ></e-column>

        <e-column
          headerText="Comandi"
          textAlign="Left"
          width="80"
          :commands="commands"
        ></e-column>
        <!-- template="selectButtonTemplate" -->
      </e-columns>
    </ejs-grid>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import ApiService from "@/core/services/ApiService";
import { rsaConsoleLog } from "@/core/helpers/utility";
import { Page, Toolbar } from "@syncfusion/ej2-vue-grids";

/* const selectButtonTemplate = {
  template: `<a href="#" class="btn btn-icon btn-dark"
  ><i class="bi bi-droplet-half fs-3 me-2"></i></a
>`
}; */

export default defineComponent({
  name: "operatori-grid",

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
    grid: [Page, Toolbar]
  },

  setup(props, { emit }) {
    const dataTable = ref();

    const state = ref({ skip: 0, take: props.size, requiresCounts: true });

    onMounted(() => {
      rsaConsoleLog("ArticoliGrid mounted");
      onDataStateChange(state.value);
    });

    const onDataStateChange = (state) => {
      rsaConsoleLog("*** Result -> ", state);
      const slug =
        "getjoined?top=" +
        state.take +
        "&skip=" +
        state.skip +
        "&inlinecount=true";
      ApiService.setHeader();
      ApiService.get("tabelle/gettype/21")
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

    const commands = ref([
      {
        id: "select-button",
        title: "Seleziona l'articolo",
        buttonOption: {
          cssClass: "e-info",
          iconCss: "fa-solid fa-arrow-right"
        }
      }
    ]);

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

    const toolbar = ref(["Search"]);

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
      return data[field] + " " + data.tab_desc.trim();
    };

    return {
      dataTable,
      dataBound,
      editSettings,
      onToolbarClicked,
      pageSettings,
      actionBegin,
      onDoubleClick,
      wrapSettings,
      descFormatter,
      onDataStateChange,
      toolbar,
      commands
    };
  }
});
</script>
