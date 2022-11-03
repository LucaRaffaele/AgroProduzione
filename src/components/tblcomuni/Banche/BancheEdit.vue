<template>
  <div>
    <b-modal
      id="banche-edit"
      ref="bancheEdit"
      :title="titolo"
      title-class="text-primary"
      header-text-variant="primary"
      header-bg-variant="soft-primary"
      header-class="py-2"
      body-class="mt-n2"
      centered
      hide-footer
      size="cm-lg"
      @shown="onShow"
    >
      <b-form
        id="formBancheEdit"
        class="needs-validation"
        @submit.prevent="formSubmit"
        @keydown.prevent.f2="rsaUtility.onKeySubmit()"
        @keyup.prevent.f2="rsaUtility.onKeySubmitUp()"
      >
        <!------------------ 
            PRIMA Riga
        -------------------->
        <b-row>
          <b-col cols="3">
            <label class="mb-n2 mt-2" for="ban_codice">Codice</label>
            <ejs-numerictextbox
              id="ban_codice"
              ref="ban_codice"
              v-model="record.ban_codice"
              placeholder="Codice"
              :step="1"
              :min="1"
              :max="999999"
              decimals="0"
              format="#"
              css-class="font-weight-bold bg-light"
              :disabled="edit"
              :show-spin-button="false"
            />
          </b-col>

          <b-col cols="9">
            <label class="mb-n2 mt-2" for="ban_desc">Descrizione</label>
            <ejs-textbox
              id="ban_desc"
              ref="ban_desc"
              v-model.trim="record.ban_desc"
              type="text"
              css-class="font-weight-bold bg-light"
              placeholder="Descrizione"
              required
              maxlength="84"
              autocomplete="off"
              @blur="saveUpperCase('ban_desc')"
            />
          </b-col>
        </b-row>

        <!------------------ 
            SECONDA Riga
        -------------------->
        <b-row>
          <b-col md="8">
            <label class="mb-n2 mt-2" for="ban_indirizzo">Indirizzo</label>
            <ejs-textbox
              id="ban_indirizzo"
              ref="ban_indirizzo"
              v-model.trim="record.ban_indirizzo"
              placeholder="Indirizzo"
              type="text"
              css-class="font-weight-bold bg-light"
              maxlength="30"
              autocomplete="off"
              @blur="saveUpperCase('ban_indirizzo')"
            />
          </b-col>
        </b-row>

        <!------------------ 
            TERZA Riga
        -------------------->
        <b-row>
          <b-col cols="8">
            <label class="mb-n2 mt-2" for="ban_citta">Città</label>
            <ejs-textbox
              id="ban_citta"
              ref="ban_citta"
              v-model.trim="record.ban_citta"
              type="text"
              css-class="font-weight-bold bg-light"
              placeholder="Citta"
              maxlength="30"
              autocomplete="off"
              @blur="saveUpperCase('ban_citta')"
            />
          </b-col>

          <b-col cols="4">
            <b-row>
              <b-col cols="5">
                <label class="mb-n2 mt-2" for="ban_prov">Prov.</label>
                <ejs-textbox
                  id="ban_prov"
                  ref="ban_prov"
                  v-model.trim="record.ban_prov"
                  type="text"
                  css-class="font-weight-bold bg-light"
                  placeholder="Prov."
                  maxlength="2"
                  autocomplete="off"
                  @blur="saveUpperCase('ban_prov')"
                />
              </b-col>
              <b-col cols="7">
                <label class="mb-n2 mt-2" for="ban_cap">CAP</label>
                <ejs-textbox
                  id="ban_cap"
                  ref="ban_cap"
                  v-model.trim="record.ban_cap"
                  type="text"
                  css-class="font-weight-bold bg-light"
                  placeholder="Cap"
                  maxlength="5"
                  autocomplete="off"
                  @blur="saveUpperCase('ban_cap')"
                />
              </b-col>
            </b-row>
          </b-col>
        </b-row>

        <!------------------ 
            QUARTA Riga
        -------------------->
        <b-row cols="1" cols-md="2">
          <b-col>
            <b-row cols="3">
              <b-col>
                <label class="mb-n2 mt-2" for="ban_azi">Cod. Azienda</label>
                <ejs-textbox
                  id="ban_azi"
                  ref="ban_azi"
                  v-model.trim="record.ban_azi"
                  type="text"
                  css-class="font-weight-bold bg-light"
                  placeholder="Cod. Azieanda"
                  maxlength="5"
                  autocomplete="off"
                  @blur="saveUpperCase('ban_azi')"
                />
              </b-col>

              <b-col>
                <label class="mb-n2 mt-2" for="ban_dip">Dipendenza</label>
                <ejs-textbox
                  id="ban_dip"
                  ref="ban_dip"
                  v-model.trim="record.ban_dip"
                  type="text"
                  css-class="font-weight-bold bg-light"
                  placeholder="Dipendenza"
                  maxlength="5"
                  autocomplete="off"
                  @blur="saveUpperCase('ban_dip')"
                />
              </b-col>
            </b-row>
          </b-col>
          <b-col>
            <b-row cols="3">
              <b-col>
                <label class="mb-n2 mt-2" for="ban_abi">ABI</label>
                <ejs-textbox
                  id="ban_abi"
                  ref="ban_abi"
                  v-model.trim="record.ban_abi"
                  type="text"
                  css-class="font-weight-bold bg-light"
                  placeholder="Abi"
                  maxlength="5"
                  autocomplete="off"
                  @blur="saveUpperCase('ban_abi')"
                />
              </b-col>

              <b-col>
                <label class="mb-n2 mt-2" for="ban_cab">CAB</label>
                <ejs-textbox
                  id="ban_cab"
                  ref="ban_cab"
                  v-model.trim="record.ban_cab"
                  type="text"
                  css-class="font-weight-bold bg-light"
                  placeholder="Cab"
                  maxlength="5"
                  autocomplete="off"
                  @blur="saveUpperCase('ban_cab')"
                />
              </b-col>

              <b-col>
                <label class="mb-n2 mt-2" for="ban_cin">CIN</label>
                <ejs-textbox
                  id="ban_cin"
                  ref="ban_cin"
                  v-model.trim="record.ban_cin"
                  type="text"
                  css-class="font-weight-bold bg-light"
                  placeholder="Cin"
                  maxlength="1"
                  autocomplete="off"
                  @blur="saveUpperCase('ban_cin')"
                />
              </b-col>
            </b-row>
          </b-col>
        </b-row>

        <!------------------ 
            QUINTA Riga
        -------------------->
        <b-row cols="2">
          <b-col>
            <label class="mb-n2 mt-2" for="ban_conto">Num. Conto</label>
            <ejs-textbox
              id="ban_conto"
              ref="ban_conto"
              v-model.trim="record.ban_conto"
              type="text"
              css-class="font-weight-bold bg-light"
              placeholder="Num. Conto"
              maxlength="15"
              autocomplete="off"
              @blur="saveUpperCase('ban_conto')"
            />
          </b-col>

          <b-col>
            <label class="mb-n2 mt-2" for="ban_spor">Sportello</label>
            <ejs-textbox
              id="ban_spor"
              ref="ban_spor"
              v-model.trim="record.ban_spor"
              type="text"
              css-class="font-weight-bold bg-light"
              placeholder="Sportello"
              maxlength="30"
              autocomplete="off"
              @blur="saveUpperCase('ban_spor')"
            />
          </b-col>
        </b-row>

        <!------------------ 
            SESTA Riga
        -------------------->
        <b-row cols="2">
          <b-col>
            <label class="mb-n2 mt-2" for="ban_iban">IBAN</label>
            <ejs-textbox
              id="ban_iban"
              ref="ban_iban"
              v-model.trim="record.ban_iban"
              type="text"
              css-class="font-weight-bold bg-light"
              placeholder="Iban"
              maxlength="34"
              autocomplete="off"
              @blur="saveUpperCase('ban_iban')"
            />
          </b-col>

          <b-col>
            <label class="mb-n2 mt-2" for="ban_swift">Swift</label>
            <ejs-textbox
              id="ban_swift"
              ref="ban_swift"
              v-model.trim="record.ban_swift"
              type="text"
              css-class="font-weight-bold bg-light"
              placeholder="Swift"
              maxlength="11"
              autocomplete="off"
              @blur="saveUpperCase('ban_swift')"
            />
          </b-col>
        </b-row>

        <!------------------ 
            SETTIMA Riga
        -------------------->
        <b-row cols="2">
          <b-col>
            <label class="mb-n2 mt-2" for="ban_tel">Telefono</label>
            <ejs-textbox
              id="ban_tel"
              ref="ban_tel"
              v-model="record.ban_tel"
              css-class="font-weight-bold bg-light"
              placeholder="Tel."
              format="#"
              maxlength="13"
              :show-spin-button="false"
            />
          </b-col>

          <b-col>
            <label class="mb-n2 mt-2" for="ban_sot">Sottoconto</label>
            <ejs-numerictextbox
              id="ban_sot"
              ref="ban_sot"
              v-model="record.ban_sot"
              css-class="numericalign pr-1 font-weight-bold bg-light"
              placeholder="Sottoc."
              :step="1"
              :min="0"
              :max="999999"
              decimals="0"
              format="#"
              :show-spin-button="false"
            />
          </b-col>
        </b-row>

        <!------------------ 
            BOTTOM MODAL
        -------------------->
        <b-row class="mt-2">
          <b-col>
            <hr />
            <ejs-button
              id="submitButton"
              type="submit"
              :css-class="btn_onpress"
            >
              F2 - Salva
            </ejs-button>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import { sendAuthHeader } from "@/helpers/authservice/auth-header";
import { layoutMethods, notificationMethods } from "@/state/helpers";
import { rsaUtility } from "@/helpers/utility.js";
import { userService } from "@/helpers/authservice/user.service";

export default {
  name: "BancheEdit",

  emit: ["add-record", "edit-record"],

  props: {
    edit: {
      type: Boolean,
      required: true
    },
    dataRecord: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      rsaUtility,
      btn_onpress: "e-primary",
      record: this.dataRecord
    };
  },

  computed: {
    titolo: function () {
      if (!this.edit) return "Inserimento Banche";
      return "Modifica Banche";
    }
  },

  watch: {
    dataRecord(val) {
      this.record = val;
    }
  },

  mounted: function () {
    rsaUtility.consoleLog("BancheEdit - mounted");
  },

  methods: {
    ...layoutMethods,
    ...notificationMethods,

    saveUpperCase(field) {
      rsaUtility.onTextBoxBlur(this.record, field);
    },

    onShow(args) {
      rsaUtility.consoleLog("OnShow", args);
      let self = this;
      this.$nextTick().then(function () {
        self.$refs.ban_desc.focusIn();
      });
    },

    // eslint-disable-next-line no-unused-vars
    formSubmit(e) {
      if (this.record.ban_codice <= 0) {
        this.$refs.ban_codice.focusIn();
        return;
      }
      this.record.ban_desc = this.record.ban_desc.trim().toUpperCase();
      if (this.record.ban_desc == "") {
        this.$refs.ban_desc.focusIn();
        return;
      }

      let obj = {
        RecordsTotal: 1,
        Data: [this.record]
      };
      if (!this.edit) {
        let url = userService.getApipath() + "banche/post";
        rsaUtility.consoleLog("BancheEdit emit add-record: " + url, obj);
        this.loaderOn();
        this.clear();
        axios
          .post(url, obj, { headers: sendAuthHeader() })
          .then((res) => {
            this.loaderOff();
            if (res.data.RecordsTotal > 0) {
              rsaUtility.consoleLog("record creato");
              this.$emit("add-record", res.data.Data[0]);
              this.record.ban_codice =
                parseInt([res.data.Data[0].ban_codice], 10) + 1;
              this.record.ban_desc = "";
              this.record.ban_indirizzo = "";
              this.record.ban_citta = "";
              this.record.ban_prov = "";
              this.record.ban_cap = "";
              this.record.ban_azi = "";
              this.record.ban_dip = "";
              this.record.ban_abi = "";
              this.record.ban_cab = "";
              this.record.ban_cin = "";
              this.record.ban_conto = "";
              this.record.ban_spor = "";
              this.record.ban_iban = "";
              this.record.ban_tel = "";
              this.record.ban_sot = null;
              this.$refs.ban_desc.focusIn();
            }
          })
          .catch((error) => {
            this.loaderOff();
            this.handlerError(error);
          });
      } else {
        let url =
          userService.getApipath() + "banche/put/" + this.record.ban_codice;
        rsaUtility.consoleLog("BancheEdit emit edit-record: " + url, obj);
        this.loaderOn();
        this.clear();
        axios
          .put(url, obj, { headers: sendAuthHeader() })
          .then((res) => {
            this.loaderOff();
            if (res.data.RecordsTotal > 0) {
              this.$emit("edit-record", res.data.Data[0]);
              this.record = res.data.Data[0];
              this.$refs.ban_desc.focusIn();
            }
          })
          .catch((error) => {
            this.loaderOff();
            this.handlerError(error);
          });
      }
    }
  }
};
</script>
