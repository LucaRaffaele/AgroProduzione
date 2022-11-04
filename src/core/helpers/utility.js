import { dimensionConsts } from "@/core/helpers/constants.js";

export const rsaUtility = {
  GetShowedNumDoc,
  GetStoredNumDoc,
  GetFirstRegNumber,
  GetLastRegNumber,
  consoleLog,
  sqlQuote,
  formatBytes,
  intToRgbToHex,
  hexToRgbToInt,
  onDblClickOnComponent,
  onKeySubmit,
  onKeySubmitUp,
  onTextBoxBlur,
  setGridHeight,
  zeroPad
};

//integer to rgb
function intToRgbToHex(color) {
  color = Math.max(0, color);
  var b = Math.floor(color / (256 * 256));
  var g = Math.floor(color / 256) % 256;
  var r = color % 256;
  let rgb = { r: r, g: g, b: b };

  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  return (
    "#" + componentToHex(rgb.r) + componentToHex(rgb.g) + componentToHex(rgb.b)
  );
}

function hexToRgbToInt(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  let rgb = result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;

  return rgb ? rgb.r + rgb.g * 256 + rgb.b * (256 * 256) : null;
}

// Funzione per l'escape dei caratteri speciali
function sqlQuote(str, start_jolly = false, end_jolly = false, quotes = true) {
  str = str.replace("\\", "\\\\");
  str = str.replace("*", "%");
  str = str.replace("?", "_");
  str = str.replace("'", "\\'");
  str = str.replace("\b", "\\b");
  str = str.replace("\n", "\\n");
  str = str.replace("\x00", "\\0");
  str = str.replace("\r", "\\r");
  str = str.replace("\t", "\\t");
  str = str.replace("\u001A", "\\Z");

  var dest = "";

  if (quotes) dest = "'";
  if (start_jolly && !str.Contains("%") && !str.Contains("_")) {
    dest += "%";
  }

  dest += str;
  if (end_jolly && !str.Contains("%") && !str.Contains("_")) {
    dest += "%";
  }

  if (quotes) dest += "'";

  return dest;
}

//
// Funzioni per la gestione dei registri
//
const GAP_REGISTRO = 70000000;
const GAP_INTERNO = 2500000;

function GetShowedNumDoc(num) {
  var val = num % GAP_REGISTRO;
  if (val >= GAP_INTERNO) val = val % GAP_INTERNO;
  return val;
}

function GetStoredNumDoc(num, reg) {
  if (typeof reg !== "string" && typeof num !== "number")
    throw "Almeno uno dei Parametri non è valido!";
  if (reg.length() < 1 || reg.length > 2)
    throw "Lunghezza parametro reg non valida";

  //String.fromCharCode(65);

  var str = "A";
  var numero = num + (reg.charCodeAt(0) - str.charCodeAt(0)) * GAP_REGISTRO;
  if (reg.length() > 1) {
    numero +=
      GAP_INTERNO + (reg.charCodeAt(1) - str.charCodeAt(0)) * GAP_INTERNO;
  }
  return numero;
}

function GetFirstRegNumber(reg) {
  var num = 0;
  if (typeof reg === "string") {
    if (reg.length < 1) return num;
    if (reg.length == 1) {
      num = Math.trunc((reg.charCodeAt(0) - "A".charCodeAt(0)) * GAP_REGISTRO);
    } else {
      num = Math.trunc(
        (reg.charCodeAt(0) - "A".charCodeAt(0)) * GAP_REGISTRO +
          GAP_INTERNO +
          (reg.charCodeAt(1) - "A".charCodeAt(0)) * GAP_INTERNO
      );
    }
  }
  if (typeof reg === "number") {
    reg = Math.trunc(reg);
    if (reg < 26) {
      num = Math.trunc(reg * GAP_REGISTRO);
    } else {
      var mul1 = reg / 26 - 1;
      var mul2 = reg % 26;
      num = mul1 * GAP_REGISTRO + GAP_INTERNO + mul2 * GAP_INTERNO;
    }
  }
  return num;
}

function GetLastRegNumber(reg) {
  return GetFirstRegNumber(reg) + GAP_INTERNO - 1;
}

function consoleLog(message = "Rsa Console: ", args = "") {
  if (process.env.NODE_ENV === "development") console.log(message, args);
}

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

function onDblClickOnComponent(
  _refs,
  component,
  suffix = "",
  disabled = false
) {
  if (disabled) {
    consoleLog(`- Double Click is Disabled!`);
    return;
  }
  consoleLog(`- Double Click on ${component} Component`);
  if (component.substring(0, 7) === "tabelle")
    _refs[component + suffix].$refs.tabelleSearch.show();
  else _refs[component + suffix].$refs[component].show();
}

function onKeySubmit(idButton = "submitButton") {
  let element = document.getElementById(idButton);
  element.focus();
  element.classList.add("e-ripple", "e-active");
  element.click();
}

function onKeySubmitUp(idButton = "submitButton") {
  let element = document.getElementById(idButton);
  element.classList.remove("e-ripple", "e-active");
}

function onTextBoxBlur(obj, field) {
  obj[field] = obj[field].toUpperCase();
}

function setGridHeight(grid, search) {
  if (!grid) return dimensionConsts.HEIGHTGRIDWRAPPER;
  if (Array.isArray(grid)) {
    if (search && grid.length >= dimensionConsts.SEARCHGRID) return "100%";
    if (!search && grid.length >= 15)
      return `${Math.round(
        window.innerHeight - (window.innerHeight * 30) / 100
      )}`;
  } else {
    if (!grid.result) return dimensionConsts.HEIGHTGRIDWRAPPER;
    if (search && grid.result.length >= dimensionConsts.SEARCHGRID)
      return "100%";
    if (!search && grid.result.length >= 15)
      return `${Math.round(
        window.innerHeight - (window.innerHeight * 30) / 100
      )}`;
  }
  return dimensionConsts.HEIGHTGRIDWRAPPER;
}

function zeroPad(num, places) {
  return String(num).padStart(places, "0");
}

//----- Constanti Formato Numeri --------//
export const format = {
  qta: {
    grid: { format: "N3" },
    input: "n3"
  },
  prezzo: {
    grid: { format: "C5" },
    input: "c5"
  },
  tot: {
    grid: { format: "C2" },
    input: "c2"
  }
};

/************************************
 **** Documenti - Id e Title ********
 ************************************/
export const documenti = {
  0: {
    title: "Fatture",
    label: "Fattura",
    fromLabel: "Scontrino",
    endpoints: 404
  },
  1: {
    title: "Bolle Accompagnamento",
    label: "Bolla Accomp.",
    fromLabel: "Scontrino",
    endpoints: 450
  },
  2: {
    title: "Documenti di Trasporto",
    label: "Ddt.",
    fromLabel: "Fattura",
    endpoints: 427
  },
  3: {
    title: "Buoni di Consegna",
    label: "Buono di Con.",
    fromLabel: "Scontrino",
    endpoints: 400
  },
  4: {
    title: "Fatture accompagnatorie",
    label: "Fattura Accomp.",
    fromLabel: "Scontrino",
    endpoints: 451
  },
  5: {
    title: "Ricevute Fiscali",
    label: "Ric. Fiscale",
    fromLabel: "Scontrino",
    endpoints: 460
  },
  6: {
    title: "Preventivi",
    label: "Preventivo",
    fromLabel: "Vostra Rich.",
    endpoints: 470
  },
  7: {
    title: "Ordini Clienti",
    label: "Ordine Cli.",
    fromLabel: "Doc. Rif",
    endpoints: 502
  },

  9: {
    title: "Ordini Fornitori",
    label: "Ordine For.",
    fromLabel: "Doc. Rif",
    endpoints: 503
  },

  13: {
    title: "Fatture Pro Forma",
    label: "Fat. ProForma",
    fromLabel: "Doc. Rif",
    endpoints: 440
  }
};

/*** 
#define TIPO_FAT 0 // Fatture
#define TIPO_BOL 1 // Bolle Accompagnamento
#define TIPO_DDT 2 // Documenti di Trasporto
#define TIPO_BUO 3 // Buoni di Consegna
#define TIPO_ACC 4 // Fatture accompagnatorie
#define TIPO_RIC 5 // Ricevute Fiscali
#define TIPO_PRE 6 // Preventivi
#define TIPO_ORD 7 // Ordini Clienti
#define TIPO_FAR 8 // Fatture - Fatture Ric. Fiscale
#define TIPO_OFO 9 // Richiesta offerta a Fornitori
#define TIPO_AUF 10 // Autofatture
#define TIPO_RIO 11 // Richieste Offerta
#define TIPO_DRI 12 // DDT consegna Conto Terzi
#define TIPO_FPF 13 // Emissione Fatture Pro Forma
#define TIPO_ANO 14 // Anomalie da Ordini a Fornitore - Carichi
#define TIPO_AIN 15 // Anomalie da DDT Interni - Carichi
#define TIPO_PRL 16 // Documenti di prelievo merci
#define TIPO_POR 17 // Righe Documenti di PREORDINE
#define TIPO_PER 18 // Righe Documenti di PERMUTA PREORDINE
*/

/************************************
 **** Tabelle Comuni- Id e Title ****
 ************************************/
export const tabelle = {
  1: { title: "Gruppi Aziende", name: "gruppi_aziende", endpoints: 271 },
  2: { title: "Tipi Attività", name: "tipi_attivita", endpoints: 270 },
  3: { title: "Nature Giuridiche", name: "nature_giuridiche", endpoints: 274 },
  7: { title: "Famiglie", name: "famiglie", endpoints: 212 },
  8: { title: "Settori", name: "settori", endpoints: 219 },
  11: { title: "Listini", name: "listini", endpoints: 161 },
  12: { title: "Gruppi Articoli", name: "gruppi_articoli", endpoints: 224 },
  13: { title: "Sottogruppi", name: "sottogruppi", endpoints: 225 },
  16: { title: "Origine Merci", name: "origine_merci", endpoints: 266 },
  21: { title: "Operatori", name: "operatori", endpoints: 268 },
  // 25: { title: "Listini Fornitori", name: "listini_fornitori", endpoints: 163 },
  26: {
    title: "Causali Cessazione Rapporto",
    name: "causali_cessazione",
    endpoints: 264
  },
  57: { title: "Tipo Involucro", name: "tipi_involucro", endpoints: 232 },
  59: { title: "Gruppo Mix", name: "gruppo_mix", endpoints: 238 }
};
/*  
#define TAB_TIC  4 // Tipo Contabilita

#define TAB_COL  5  // Colori Interni
#define TAB_FON  6  // Tipi di Fondo

#define TAB_TOM  9  // Tipi Tomaia
#define TAB_COF 10  // Colori Fornitore  

#define TAB_GIR 14  // Giri Agenti      
#define TAB_RUB 15  // Categorie Rubrica
#define TAB_CAL 17  // Tabelle Calibri
#define TAB_CON 18  // Tabella Gruppi Conti      - Non Utilizzato da V2003 B21
#define TAB_STT 19  // Tabella Sottogruppi Conti - Non Utilizzato da V2003 B21
#define TAB_BAN 20  // Bancone
#define TAB_FIS 22  // Categorie Fiscali
#define TAB_AUT 23  // Autori
#define TAB_CED 24  // Case Editrici
#define TAB_LFO 25  // Listini Fornitori  
#define TAB_MOD 27  // Tabelle Modelli Banchi
#define TAB_CAT 28  // Tabella Categorie Banchi
#define TAB_MAR 29  // Tabella Marche Banchi
#define TAB_PIL 30  // Tabella Autisti
#define TAB_MEZ 31  // Tabella Mezzi di trasporto
#define TAB_UFF 32  // Uffici Doganali
#define TAB_TRI 33  // Tabella Tributi
#define TAB_PER 34  // Tabella Periodi Movimentazione Imposta
#define TAB_TES 35  // Tipo di tessuto
#define TAB_PRD 36  // Periodi
#define TAB_DOC 37  // Tipi di Documento
#define TAB_FIR 38  // Tabella Firme

//FACILECRM/////////////////////////////////////
#define TAB_TTK 43  // Tipo ticket - FACILECRM
#define TAB_STK 44  // Stato ticket - FACILECRM
#define TAB_LAB 45  // Descrizioni colori labels calendario
#define TAB_TCT 46  // Tipo contratto - FACILECRM
#define TAB_SCT 47  // Stato contratto - FACILECRM
#define TAB_MLS 48  // Gruppi mailing list/sms per comunicazioni ai clienti
#define TAB_STK2 54  // Stato 2 ticket - FACILECRM
////////////////////////////////////////////////

#define TAB_CNT 56      // Tipo Contenitore - Utilizzata per BOLLICINE Esportazione Peroni
#define TAB_INV 57      // Tipo Involucro   - Utilizzata per BOLLICINE Esportazione Peroni

#define TAB_MAT 58      // Materiale    
#define TAB_MIX 59      // Gruppo Mix
#define TAB_GRF 60      // Gruppi Fornitori

 */

//----- Elenco Registri --------//
export const registri = [
  "TUTTI",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "AA",
  "AB",
  "AC",
  "AD",
  "AE",
  "AF",
  "AG",
  "AH",
  "AI",
  "AJ",
  "AK",
  "AL",
  "AM",
  "AN",
  "AO",
  "AP",
  "AQ",
  "AR",
  "AS",
  "AT",
  "AU",
  "AV",
  "AW",
  "AX",
  "AY",
  "AZ",
  "BA",
  "BB",
  "BC",
  "BD",
  "BE",
  "BF",
  "BG",
  "BH",
  "BI",
  "BJ",
  "BK",
  "BL",
  "BM",
  "BN",
  "BO",
  "BP",
  "BQ",
  "BR",
  "BS",
  "BT",
  "BU",
  "BV",
  "BW",
  "BX",
  "BY",
  "BZ",
  "CA",
  "CB",
  "CC",
  "CD",
  "CE",
  "CF",
  "CG",
  "CH",
  "CI",
  "CJ",
  "CK",
  "CL",
  "CM",
  "CN",
  "CO",
  "CP",
  "CQ",
  "CR",
  "CS",
  "CT",
  "CU",
  "CV",
  "CW",
  "CX",
  "CY",
  "CZ",
  "DA",
  "DB",
  "DC",
  "DD",
  "DE",
  "DF",
  "DG",
  "DH",
  "DI",
  "DJ",
  "DK",
  "DL",
  "DM",
  "DN",
  "DO",
  "DP",
  "DQ",
  "DR",
  "DS",
  "DT",
  "DU",
  "DV",
  "DW",
  "DX",
  "DY",
  "DZ",
  "EA",
  "EB",
  "EC",
  "ED",
  "EE",
  "EF",
  "EG",
  "EH",
  "EI",
  "EJ",
  "EK",
  "EL",
  "EM",
  "EN",
  "EO",
  "EP",
  "EQ",
  "ER",
  "ES",
  "ET",
  "EU",
  "EV",
  "EW",
  "EX",
  "EY",
  "EZ",
  "FA",
  "FB",
  "FC",
  "FD",
  "FE",
  "FF",
  "FG",
  "FH",
  "FI",
  "FJ",
  "FK",
  "FL",
  "FM",
  "FN",
  "FO",
  "FP",
  "FQ",
  "FR",
  "FS",
  "FT",
  "FU",
  "FV",
  "FW",
  "FX",
  "FY",
  "FZ",
  "GA",
  "GB",
  "GC",
  "GD",
  "GE",
  "GF",
  "GG",
  "GH",
  "GI",
  "GJ",
  "GK",
  "GL",
  "GM",
  "GN",
  "GO",
  "GP",
  "GQ",
  "GR",
  "GS",
  "GT",
  "GU",
  "GV",
  "GW",
  "GX",
  "GY",
  "GZ",
  "HA",
  "HB",
  "HC",
  "HD",
  "HE",
  "HF",
  "HG",
  "HH",
  "HI",
  "HJ",
  "HK",
  "HL",
  "HM",
  "HN",
  "HO",
  "HP",
  "HQ",
  "HR",
  "HS",
  "HT",
  "HU",
  "HV",
  "HW",
  "HX",
  "HY",
  "HZ",
  "IA",
  "IB",
  "IC",
  "ID",
  "IE",
  "IF",
  "IG",
  "IH",
  "II",
  "IJ",
  "IK",
  "IL",
  "IM",
  "IN",
  "IO",
  "IP",
  "IQ",
  "IR",
  "IS",
  "IT",
  "IU",
  "IV",
  "IW",
  "IX",
  "IY",
  "IZ",
  "JA",
  "JB",
  "JC",
  "JD",
  "JE",
  "JF",
  "JG",
  "JH",
  "JI",
  "JJ",
  "JK",
  "JL",
  "JM",
  "JN",
  "JO",
  "JP",
  "JQ",
  "JR",
  "JS",
  "JT",
  "JU",
  "JV",
  "JW",
  "JX",
  "JY",
  "JZ",
  "KA",
  "KB",
  "KC",
  "KD",
  "KE",
  "KF",
  "KG",
  "KH",
  "KI",
  "KJ",
  "KK",
  "KL",
  "KM",
  "KN",
  "KO",
  "KP",
  "KQ",
  "KR",
  "KS",
  "KT",
  "KU",
  "KV",
  "KW",
  "KX",
  "KY",
  "KZ",
  "LA",
  "LB",
  "LC",
  "LD",
  "LE",
  "LF",
  "LG",
  "LH",
  "LI",
  "LJ",
  "LK",
  "LL",
  "LM",
  "LN",
  "LO",
  "LP",
  "LQ",
  "LR",
  "LS",
  "LT",
  "LU",
  "LV",
  "LW",
  "LX",
  "LY",
  "LZ",
  "MA",
  "MB",
  "MC",
  "MD",
  "ME",
  "MF",
  "MG",
  "MH",
  "MI",
  "MJ",
  "MK",
  "ML",
  "MM",
  "MN",
  "MO",
  "MP",
  "MQ",
  "MR",
  "MS",
  "MT",
  "MU",
  "MV",
  "MW",
  "MX",
  "MY",
  "MZ",
  "NA",
  "NB",
  "NC",
  "ND",
  "NE",
  "NF",
  "NG",
  "NH",
  "NI",
  "NJ",
  "NK",
  "NL",
  "NM",
  "NN",
  "NO",
  "NP",
  "NQ",
  "NR",
  "NS",
  "NT",
  "NU",
  "NV",
  "NW",
  "NX",
  "NY",
  "NZ",
  "OA",
  "OB",
  "OC",
  "OD",
  "OE",
  "OF",
  "OG",
  "OH",
  "OI",
  "OJ",
  "OK",
  "OL",
  "OM",
  "ON",
  "OO",
  "OP",
  "OQ",
  "OR",
  "OS",
  "OT",
  "OU",
  "OV",
  "OW",
  "OX",
  "OY",
  "OZ",
  "PA",
  "PB",
  "PC",
  "PD",
  "PE",
  "PF",
  "PG",
  "PH",
  "PI",
  "PJ",
  "PK",
  "PL",
  "PM",
  "PN",
  "PO",
  "PP",
  "PQ",
  "PR",
  "PS",
  "PT",
  "PU",
  "PV",
  "PW",
  "PX",
  "PY",
  "PZ",
  "QA",
  "QB",
  "QC",
  "QD",
  "QE",
  "QF",
  "QG",
  "QH",
  "QI",
  "QJ",
  "QK",
  "QL",
  "QM",
  "QN",
  "QO",
  "QP",
  "QQ",
  "QR",
  "QS",
  "QT",
  "QU",
  "QV",
  "QW",
  "QX",
  "QY",
  "QZ",
  "RA",
  "RB",
  "RC",
  "RD",
  "RE",
  "RF",
  "RG",
  "RH",
  "RI",
  "RJ",
  "RK",
  "RL",
  "RM",
  "RN",
  "RO",
  "RP",
  "RQ",
  "RR",
  "RS",
  "RT",
  "RU",
  "RV",
  "RW",
  "RX",
  "RY",
  "RZ",
  "SA",
  "SB",
  "SC",
  "SD",
  "SE",
  "SF",
  "SG",
  "SH",
  "SI",
  "SJ",
  "SK",
  "SL",
  "SM",
  "SN",
  "SO",
  "SP",
  "SQ",
  "SR",
  "SS",
  "ST",
  "SU",
  "SV",
  "SW",
  "SX",
  "SY",
  "SZ",
  "TA",
  "TB",
  "TC",
  "TD",
  "TE",
  "TF",
  "TG",
  "TH",
  "TI",
  "TJ",
  "TK",
  "TL",
  "TM",
  "TN",
  "TO",
  "TP",
  "TQ",
  "TR",
  "TS",
  "TT",
  "TU",
  "TV",
  "TW",
  "TX",
  "TY",
  "TZ",
  "UA",
  "UB",
  "UC",
  "UD",
  "UE",
  "UF",
  "UG",
  "UH",
  "UI",
  "UJ",
  "UK",
  "UL",
  "UM",
  "UN",
  "UO",
  "UP",
  "UQ",
  "UR",
  "US",
  "UT",
  "UU",
  "UV",
  "UW",
  "UX",
  "UY",
  "UZ",
  "VA",
  "VB",
  "VC",
  "VD",
  "VE",
  "VF",
  "VG",
  "VH",
  "VI",
  "VJ",
  "VK",
  "VL",
  "VM",
  "VN",
  "VO",
  "VP",
  "VQ",
  "VR",
  "VS",
  "VT",
  "VU",
  "VV",
  "VW",
  "VX",
  "VY",
  "VZ",
  "WA",
  "WB",
  "WC",
  "WD",
  "WE",
  "WF",
  "WG",
  "WH",
  "WI",
  "WJ",
  "WK",
  "WL",
  "WM",
  "WN",
  "WO",
  "WP",
  "WQ",
  "WR",
  "WS",
  "WT",
  "WU",
  "WV",
  "WW",
  "WX",
  "WY",
  "WZ",
  "XA",
  "XB",
  "XC",
  "XD",
  "XE",
  "XF",
  "XG",
  "XH",
  "XI",
  "XJ",
  "XK",
  "XL",
  "XM",
  "XN",
  "XO",
  "XP",
  "XQ",
  "XR",
  "XS",
  "XT",
  "XU",
  "XV",
  "XW",
  "XX",
  "XY",
  "XZ",
  "YA",
  "YB",
  "YC",
  "YD",
  "YE",
  "YF",
  "YG",
  "YH",
  "YI",
  "YJ",
  "YK",
  "YL",
  "YM",
  "YN",
  "YO",
  "YP",
  "YQ",
  "YR",
  "YS",
  "YT",
  "YU",
  "YV",
  "YW",
  "YX",
  "YY",
  "YZ",
  "ZA",
  "ZB",
  "ZC",
  "ZD",
  "ZE",
  "ZF",
  "ZG",
  "ZH",
  "ZI",
  "ZJ",
  "ZK",
  "ZL",
  "ZM",
  "ZN",
  "ZO",
  "ZP",
  "ZQ",
  "ZR",
  "ZS",
  "ZT",
  "ZU",
  "ZV",
  "ZW",
  "ZX",
  "ZY",
  "ZZ"
];

/* Css responsive appunti */
/*
html {
  font-size: 1rem;
  }
  
  @include media-breakpoint-up(sm) {
  html {
  font-size: 1.2rem;
  }
  }
  
  @include media-breakpoint-up(md) {
  html {
  font-size: 1.4rem;
  }
  }
  
  @include media-breakpoint-up(lg) {
  html {
  font-size: 1.6rem;
  }
  } 
*/
