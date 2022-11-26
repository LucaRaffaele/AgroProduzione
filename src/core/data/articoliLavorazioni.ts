interface IArticoliLavorazione {
  lar_codice?: number;
  lar_tipo_lav?: number;
  lar_anno_lav?: number;
  lar_codice_lav?: number;
  lar_art: string;
  lar_colli: number;
  lar_qta: number;
  lar_costo?: number;
  lar_tipo_art: number;
  lar_partita?: number;
  lar_imballo?: boolean;
  lar_user?: string;
  lar_created_at?: Date | null;
  lar_last_update?: Date | null;
  ana_desc1: string;
}
enum TipoArticoli {
  PRODOTTO_FINALE,
  SCARTO_I,
  SCARTO_II,
  SCARTO_EXTRA,
  SCARTO_NON_UTILIZZABILE,
  RIMANENZA
}

export { IArticoliLavorazione, TipoArticoli };
