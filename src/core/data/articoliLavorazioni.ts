interface IArticoliLavorazione {
  ana_desc1: string;
  ana_codice: string;
  tipo: number;
  qta?: number;
  colli?: number;
}

/* {
  "lar_codice": 1,
  "lar_tipo_lav": 0,
  "lar_anno_lav": 2022,
  "lar_codice_lav": 1,
  "lar_art": "",
  "lar_colli": 0,
  "lar_qta": 0,
  "lar_costo": 0,
  "lar_tipo_art": 0,
  "lar_partita": 0,
  "lar_imballo": false,
  "lar_user": "",
  "lar_created_at": null,
  "lar_last_update": null,
  "ana_desc1": ""
}
] */

export { IArticoliLavorazione };
