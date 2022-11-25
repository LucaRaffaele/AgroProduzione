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
      :command-click="commandClick"
      :height="500"
    >
      <e-columns>
        <e-column
          field="ana_desc1"
          headerText="Descrizione"
          textAlign="Left"
          :template="descTemplate"
          width="250"
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

        <e-column
          field=""
          headerText="Comandi"
          textAlign="Left"
          width="80"
          :commands="commands"
        ></e-column>
      </e-columns>
    </ejs-grid>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import ApiService from "@/core/services/ApiService";
import { rsaConsoleLog } from "@/core/helpers/utility";
import { Page, Toolbar, CommandColumn } from "@syncfusion/ej2-vue-grids";
import { createApp } from "vue";
const app = createApp({});

/* <a href="#" class="btn btn-icon btn-dark"
  ><i class="bi bi-droplet-half fs-3 me-2"></i></a
> */
// Template declaration
var descVue = app.component("descTemplate", {
  template: ` <div class='d-flex'>
                <div class="symbol symbol-50px me-2">
                  <span class="symbol-label">
                    <img
                      v-if="data.img_data"
                      :src="'data:image/jpeg;base64,'+ data.img_data "
                      class="h-75 align-self-end"
                      alt=""
                    />
                    <img
                      v-else
                      src="media/svg/blank.svg"
                      class="h-75 align-self-end"
                      alt=""
                    />
                  </span>
                </div>
                <div>
                  <span id="Emptext">{{data.ana_desc1 + " " + data.ana_desc2.trim()}}</span>
                </div>
              </div>`,
  data: () => ({})
});

/* var buttonVue = app.component("buttonTemplate", {
  template: `<div>
                <button
                  type="button"
                  class="btn btn-sm btn-light-primary px-3"
                >
                <a @click="onClickSelectButton">
                  <span class="svg-icon svg-icon-2 svg-icon-primary mx-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="currentColor"/>
<path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="currentColor"/>
</svg>
                  </span>
                  </a>
                </button>
              </div>`,
  data: () => ({}),
  methods: {
    onClickSelectButton() {
      console.log("test");
    }
  }
}); */
// btn-active-color-primary
// @click="showDetails(prodotto)"

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

  emits: ["edit-articolo", "select-row"],

  provide: {
    grid: [Page, Toolbar, CommandColumn]
  },

  setup(props, { emit }) {
    const dataTable = ref();

    const descTemplate = () => {
      return {
        template: descVue
      };
    };

    /* const buttonTemplate = () => {
      return {
        template: buttonVue
      };
    }; */

    const state = ref({ skip: 0, take: props.size, requiresCounts: true });

    onMounted(() => {
      rsaConsoleLog("ArticoliGrid mounted");
      onDataStateChange(state.value);
    });

    const onDataStateChange = (state) => {
      const slug =
        "getjoined?top=" +
        state.take +
        "&skip=" +
        state.skip +
        "&inlinecount=true";
      ApiService.setHeader();
      ApiService.get("articoli", slug)
        .then(({ data }) => {
          rsaConsoleLog(
            "***ArticoliGRID getjoined Result -> ",
            data.RecordsTotal
          );
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

    const onDoubleClick = (args) => {
      rsaConsoleLog("Double click", args.rowData);
      emit("select-row", args.rowData);
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

    const commandClick = (args) => {
      if (args.commandColumn.id == "select-button") {
        rsaConsoleLog("onClickSelectButton", args);
        emit("select-row", args.rowData);
      }
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

    // :class="{'e-userimg': true, 'sf-grid-icon-Male': data.EmployeeImg == usermale, 'sf-grid-icon-FeMale': data.EmployeeImg == userfemale}"
    return {
      dataTable,
      dataBound,
      editSettings,
      onToolbarClicked,
      pageSettings,
      actionBegin,
      onDoubleClick,
      wrapSettings,
      descTemplate,
      onDataStateChange,
      toolbar,
      commands,
      commandClick
    };
  }
});
</script>
