interface ILavorazione {
  ana_desc1: string;
  lav_anno: number;
  lav_art?: string;
  lav_art_colli?: number;
  lav_art_qta?: number;
  lav_bytes_size?: number;
  lav_codice: number;
  lav_created_at?: string;
  lav_last_update?: string;
  lav_ord_anno?: number;
  lav_ord_num?: number;
  lav_ord_tipo?: number;
  lav_rtf?: string;
  lav_start?: string | Date | null;
  lav_stop?: string | Date | null;
  lav_tes_anno?: number;
  lav_tes_num?: number;
  lav_tipo?: number;
  lav_user?: "";
}

export { ILavorazione };
