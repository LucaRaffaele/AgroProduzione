import { createApp } from "vue";
import App from "./App.vue";

/*
TIP: To get started with clean router change path to @/router/clean.ts.
 */
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import i18n from "@/core/plugins/i18n";

//imports for app initialization
import ApiService from "@/core/services/ApiService";
import { initApexCharts } from "@/core/plugins/apexcharts";
import { initInlineSvg } from "@/core/plugins/inline-svg";
import { initVeeValidate } from "@/core/plugins/vee-validate";

import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective
} from "@syncfusion/ej2-vue-grids";
import { registerLicense } from "@syncfusion/ej2-base";

// Register Syncfusion license
registerLicense(process.env.VUE_APP_APIKEY);

import "@/core/plugins/prismjs";
const app = createApp(App);

app.use(store);
app.use(router);
app.use(ElementPlus);

app
  .component("ejs-grid", GridComponent)
  .component("e-columns", ColumnsDirective)
  .component("e-column", ColumnDirective);

ApiService.init(app);
initApexCharts(app);
initInlineSvg(app);
initVeeValidate();

app.use(i18n);

app.mount("#app");
