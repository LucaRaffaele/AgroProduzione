<template>
  <div @keydown="onKeydown">
    <ejs-grid
      ref="grid"
      :dataSource="data"
      locale="it-IT"
      :allowSorting="true"
      :allow-resizing="true"
      :resize-settings="{ mode: 'Auto' }"
      :allow-text-wrap="true"
      :height="height"
    >
      <!--  :recordDoubleClick="onDoubleClick" -->
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

<script>
import { dimensionConsts } from "@/core/helpers/constants.js";
import { rsaUtility } from "@/core/helpers/utility.js";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective
} from "@syncfusion/ej2-vue-grids";

import ApiService from "@/core/services/ApiService";

export default {
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
      default: dimensionConsts.DEFAULTGRID
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

  inject: ["selectArticolo"],

  data: function () {
    return {
      //TODO Attivare add-record ed edit-record
      toDeveloped: false,

      data: null,
      utilDlg: null,

      state: { skip: 0, take: this.size, requiresCounts: true },
      filterArticles: "",

      pageSettings: { pageSizes: true, pageSize: this.size },
      wrapSettings: { wrapMode: "Content" }
    };
  },

  computed: {
    height() {
      return rsaUtility.setGridHeight(this.data, this.search);
    }
  },

  created() {
    rsaUtility.consoleLog("ArticoliGrid Component - Created");
    if (!this.preload) {
      rsaUtility.consoleLog("ArticoliSearch - Created");
      return;
    }
    let state = { skip: 0, take: this.size, requiresCounts: true };
    var url =
      process.env.VUE_APP_API_URL +
      "articoli/getjoined?top=" +
      state.take +
      "&skip=" +
      state.skip;
    if (state.requiresCounts) url += "&inlinecount=true";
    url = encodeURI(url);
    rsaUtility.consoleLog("ArticoliSearch - Created-> PRELOAD URL: ", url);

    ApiService.setHeader();
    ApiService.get(url)
      .then((res) => {
        this.loaderOff();
        this.data = {
          result: res.data.Data,
          count: res.data.RecordsTotal
        };
      })
      .catch((error) => {
        this.loaderOff();
        this.handlerError(error);
      });
  },

  //FIXME: Spostare DataStateChange da created a mounted
  mounted() {
    if (Object.keys(this.records).length > 0) this.data = this.records;
    else {
      let state = { skip: 0, take: this.size, requiresCounts: true };
      this.onDataStateChange(state);
    }

    this.$nextTick().then(function () {
      this.$nextTick().then(function () {
        requestAnimationFrame(() => {
          document
            .getElementById(
              this.$refs.grid.ej2Instances.toolbarModule.searchBoxObj.searchBox
                .id
            )
            .focus();
        });
      });
    });
  },

  methods: {
    onFilterSelect(filter) {
      rsaUtility.consoleLog("Il filtro è: ", filter);
      this.filterArticles = filter;
    },

    actionBegin(args) {
      if (args.requestType === "beginEdit") {
        args.cancel = true;
      }
    },

    dataBound() {
      var gridInstance =
        document.getElementsByClassName("e-grid")[0].ej2_instances[0];
      gridInstance.gridLines = "Both";
      gridInstance.autoFitColumns();
    },

    descFormatter(field, data) {
      return data[field] + " " + data.ana_desc2.trim();
    },

    addRecord(args) {
      rsaUtility.consoleLog("Add Record", args);
      this.$refs.grid.ej2Instances.addRecord(args);
      this.$refs.grid.ej2Instances.refresh();
    },

    editRecord(args) {
      rsaUtility.consoleLog("Edit Record", args);
      this.$refs.grid.ej2Instances.updateRow(args);
      this.$refs.grid.ej2Instances.refresh();
      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i].ana_codice == args.ana_codice) {
          this.data[i] = args;
          break;
        }
      }
    },

    refreshGrid() {
      this.$refs.grid.ej2Instances.refresh();
    }
  }
};
</script>
