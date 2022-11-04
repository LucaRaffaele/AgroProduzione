<template>
  <div @keydown="onKeydown">
    <banche-edit
      ref="dialogBan"
      :edit="edit"
      :data-record="dataRecord"
      @add-record="addRecord"
      @edit-record="editRecord"
    ></banche-edit>

    <ejs-grid
      ref="grid"
      :data-source="data"
      locale="it-IT"
      :allow-sorting="true"
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
      :height="height"
    >
      <e-columns>
        <e-column
          field="ban_codice"
          header-text="Codice"
          text-align="Right"
          width="110"
          :is-primary-key="true"
        ></e-column>

        <e-column
          field="ban_desc"
          header-text="Descrizione"
          text-align="Left"
          width="250"
        ></e-column>
        <e-column
          field="ban_indirizzo"
          header-text="Indirizzo"
          text-align="Left"
          width="180"
        ></e-column>
        <e-column
          field="ban_citta"
          header-text="Città"
          text-align="Left"
          width="140"
        ></e-column>
        <e-column
          field="ban_iban"
          header-text="IBAN"
          text-align="Left"
          width="240"
        ></e-column>
      </e-columns>
    </ejs-grid>
  </div>
</template>

<script>
import axios from "axios";
import { authHeader } from "@/helpers/authservice/auth-header";
import { userService } from "@/helpers/authservice/user.service";
import {
  Sort,
  Edit,
  Toolbar,
  Page,
  ExcelExport,
  PdfExport
} from "@syncfusion/ej2-vue-grids";
import { DialogUtility } from "@syncfusion/ej2-popups";
import { layoutMethods, notificationMethods } from "@/state/helpers";
import { dimensionConsts } from "@/core/helpers/constants.js";
import { rsaUtility } from "@/core/helpers/utility.js";
const BancheEdit = () =>
  import(
    /* webpackChunkName: "tblcomuni" */ "@/components/tblcomuni/Banche/BancheEdit"
  );

export default {
  name: "BancheGrid",

  components: {
    BancheEdit
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
    records: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },

  emit: ["refreshRecords"],

  inject: ["selectBanca"],

  data() {
    return {
      auth: {},
      data: [{}],
      utilDlg: null,

      edit: false,
      dataRecord: {},
      indexEditRow: 0,

      pageSettings: { pageSizes: true, pageSize: this.size },
      wrapSettings: { wrapMode: "Content" }
    };
  },

  computed: {
    height() {
      return rsaUtility.setGridHeight(this.data, this.search);
    },
    editSettings() {
      return {
        allowEditing: this.auth.admin ? true : this.auth.aut_update,
        allowAdding: this.auth.admin ? true : this.auth.aut_insert,
        allowDeleting: this.auth.admin ? true : this.auth.aut_delete,
        showDeleteConfirmDialog: false,
        newRowPosition: "Top",
        mode: "Dialog"
      };
    },
    toolbarOptions: function () {
      if (this.search) {
        let toolbar = ["Search"];
        if (this.auth.aut_update || this.auth.admin)
          toolbar.unshift({
            text: "F4 - Modifica",
            tooltipText: "Modifica record",
            prefixIcon: "mdi mdi-pencil-outline text-warning bx-sm mb-1",
            id: "Modifica"
          });
        if (this.auth.aut_insert || this.auth.admin)
          toolbar.unshift({
            text: "F3 - Nuovo",
            tooltipText: "Inserisci un nuovo record",
            prefixIcon: "mdi mdi-plus text-success bx-sm mb-1",
            id: "Aggiungi"
          });
        toolbar.unshift({
          text: "F2 - OK",
          tooltipText: "Seleziona il record",
          prefixIcon: "mdi mdi-check text-info bx-sm mb-1",
          id: "Seleziona"
        });
        return toolbar;
      } else {
        let toolbar = [
          {
            text: "Esp. Excel",
            tooltipText: "Esportazione su file Excel",
            prefixIcon: "mdi mdi-microsoft-excel text-success bx-sm mb-1",
            id: "Excel"
          },

          {
            text: "Esp. Pdf",
            tooltipText: "Esportazione su file PDF",
            prefixIcon: "mdi mdi-file-pdf-outline text-danger bx-sm mb-1",
            id: "Pdf"
          },

          "Search"
        ];
        if (this.auth.aut_delete || this.auth.admin)
          toolbar.unshift({
            text: "F6 - Elimina",
            tooltipText: "Elimina record",
            prefixIcon: "mdi mdi-trash-can-outline text-danger bx-sm mb-1",
            id: "Elimina"
          });
        if (this.auth.aut_update || this.auth.admin)
          toolbar.unshift({
            text: "F4 - Modifica",
            tooltipText: "Modifica record",
            prefixIcon: "mdi mdi-pencil-outline text-warning bx-sm mb-1",
            id: "Modifica"
          });
        if (this.auth.aut_insert || this.auth.admin)
          toolbar.unshift({
            text: "F3 - Nuovo",
            tooltipText: "Inserisci un nuovo record",
            prefixIcon: "mdi mdi-plus text-success bx-sm mb-1",
            id: "Aggiungi"
          });
        return toolbar;
      }
    }
  },

  created() {
    rsaUtility.consoleLog("BancheGrid Component - Created");

    if (userService.isAdmin()) {
      this.auth = { admin: true };
    } else {
      for (let authorization of userService.getAuthorization()) {
        if (authorization.aut_end == 200) this.auth = authorization;
      }
    }
    rsaUtility.consoleLog("BancheGrid Authorization: ", this.auth);

    if (this.records && this.records.length > 0) this.data = this.records;
    else {
      var url = userService.getApipath() + "banche/get";
      rsaUtility.consoleLog("BancheGrid get ", url);
      this.loaderOn();
      this.clear();
      axios
        .get(url, { headers: authHeader() })
        .then((res) => {
          this.loaderOff();
          rsaUtility.consoleLog("BancheGrid get result", res.data.Data);
          this.data = res.data.Data;
        })
        .catch((error) => {
          this.loaderOff();
          this.handlerError(error);
        });
    }
  },

  provide: {
    grid: [Sort, Edit, Toolbar, Page, ExcelExport, PdfExport]
  },

  methods: {
    ...layoutMethods,
    ...notificationMethods,

    actionBegin(args) {
      if (args.requestType === "beginEdit") {
        args.cancel = true;
      }
    },

    onElimina() {
      this.utilDlg.hide();
      this.utilDlg = null;
      let sel_rows = this.$refs.grid.ej2Instances.getSelectedRecords();
      if (sel_rows.length > 0) {
        let url =
          userService.getApipath() + "banche/delete/" + sel_rows[0].ban_codice;
        rsaUtility.consoleLog(
          "BancheGrid onElimina url " + url + "\n Row to be deleted: ",
          sel_rows[0]
        );
        this.loaderOn();
        this.clear();
        axios
          .delete(url, { headers: authHeader() })
          .then((res) => {
            this.loaderOff();
            rsaUtility.consoleLog("onElimina result", res);
            this.$refs.grid.ej2Instances.deleteRecord(sel_rows[0]);
            this.$refs.grid.ej2Instances.refresh();
          })
          .catch((error) => {
            this.loaderOff();
            this.handlerError(error);
          });
      }
    },

    onAnnullacancelClick() {
      rsaUtility.consoleLog("Operazione annullata");

      this.utilDlg.hide();
      this.utilDlg = null;
    },

    onToolbarClicked(args) {
      if (args.item.id === "Aggiungi") {
        rsaUtility.consoleLog("BancheGrid Toolbar click Aggiungi", args);
        let url = userService.getApipath() + "banche/blank";
        rsaUtility.consoleLog("BAncheGrid blank url ", url);
        this.loaderOn();
        this.clear();
        axios
          .get(url, { headers: authHeader() })
          .then((res) => {
            this.loaderOff();
            if (res.data.RecordsTotal > 0) {
              rsaUtility.consoleLog(res.data.Data[0]);
              this.edit = false;
              this.dataRecord = res.data.Data[0];
              this.$bvModal.show("banche-edit");
            }
          })
          .catch((error) => {
            this.loaderOff();
            this.handlerError(error);
          });
      }

      if (args.item.id === "Modifica") {
        rsaUtility.consoleLog("BancheGrid Toolbar click Modifica", args);
        let sel_rows = this.$refs.grid.ej2Instances.getSelectedRecords();
        if (sel_rows.length > 0) {
          rsaUtility.consoleLog("inviato per la modifica", sel_rows[0]);
          this.edit = true;
          this.dataRecord = sel_rows[0];
          this.indexEditRow =
            this.$refs.grid.ej2Instances.getSelectedRowIndexes()[0];
          this.$bvModal.show("banche-edit");
        } else
          DialogUtility.alert({
            title: "Attenzione!",
            content: "E' necessario selezionare una riga!",
            position: { X: "center", Y: "center" }
          });
      }

      if (args.item.id === "Elimina" && !this.search) {
        rsaUtility.consoleLog("BancheGrid Toolbar click Elimina", args);
        let sel_rows = this.$refs.grid.ej2Instances.getSelectedRecords();

        if (sel_rows.length > 0) {
          this.utilDlg = DialogUtility.confirm({
            title: "Attenzione!",
            content: "Vuoi annullare la cancellazione del record?",
            position: { X: "center", Y: "center" },
            okButton: { text: "Si", click: this.onAnnullacancelClick },
            cancelButton: { text: "No", click: this.onElimina },
            showCloseIcon: true,
            closeOnEscape: true,
            animationSettings: { effect: "Zoom" }
          });
        } else
          DialogUtility.alert({
            title: "Attenzione!",
            content: "E' necessario selezionare una riga!",
            position: { X: "center", Y: "center" }
          });
      }

      if (args.item.id === "Seleziona" && this.search) {
        rsaUtility.consoleLog("BancheGrid Toolbar click Seleziona", args);
        let sel_rows = this.$refs.grid.ej2Instances.getSelectedRecords();
        if (sel_rows.length > 0) {
          rsaUtility.consoleLog("Selezionato da toolboard o F2");
          this.selectBanca(sel_rows[0]);
          this.$bvModal.hide("banche-search");
        }
      }

      if (args.item.id === "Excel" && !this.search) {
        rsaUtility.consoleLog("BancheGrid Toolbar click Excel");
        let excelExportProperties = {
          fileName: "banche.xlsx"
        };
        this.$refs.grid.ej2Instances.excelExport(excelExportProperties);
      }

      if (args.item.id === "Pdf" && !this.search) {
        rsaUtility.consoleLog("BancheGrid Toolbar click Pdf");
        let pdfExportProperties = {
          fileName: "banche.pdf"
        };
        this.$refs.grid.ej2Instances.pdfExport(pdfExportProperties);
      }
    },

    onKeydown(args) {
      if (args.key === "F2")
        this.onToolbarClicked({ item: { id: "Seleziona" } });
      if (args.key === "F3")
        this.onToolbarClicked({ item: { id: "Aggiungi" } });
      if (args.key === "F4")
        this.onToolbarClicked({ item: { id: "Modifica" } });
      if (args.key === "F6") this.onToolbarClicked({ item: { id: "Elimina" } });
    },

    addRecord(args) {
      rsaUtility.consoleLog("Add Record", args);
      this.$refs.grid.ej2Instances.addRecord(args);
      this.data =
        this.$refs.grid.ej2Instances.getDataModule().dataManager.dataSource.json;
      this.$emit("refreshRecords", this.data);
    },

    editRecord(args) {
      rsaUtility.consoleLog("Edit Record", args);
      this.$refs.grid.ej2Instances.updateRow(this.indexEditRow, args);
      this.data =
        this.$refs.grid.ej2Instances.getDataModule().dataManager.dataSource.json;
      this.$emit("refreshRecords", this.data);
      this.indexEditRow = 0;
    },

    onDoubleClick(args) {
      rsaUtility.consoleLog("Double click", args);
      if (this.search) {
        this.selectBanca(args.rowData);
        this.$bvModal.hide("banche-search");
      } else {
        rsaUtility.consoleLog("inviato per la modifica", args.rowData);
        this.edit = true;
        this.dataRecord = args.rowData;
        this.indexEditRow = args.rowIndex;
        this.$bvModal.show("banche-edit");
      }
    }
  }
};
</script>
