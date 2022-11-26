interface ILavorazione {
  lav_tipo: number;
  lav_anno: number;
  lav_codice?: number;
  ana_desc1: string;
  lav_art: string;
  img_data?: string | null;
  lav_art_colli: number;
  lav_art_qta: number;
  lav_rtf?: string;
  lav_bytes_size?: number;
  lav_created_at?: string | Date | null;
  lav_last_update?: string | Date | null;
  lav_ord_anno?: number;
  lav_ord_num?: number;
  lav_ord_tipo?: number;
  lav_start?: string | Date | null;
  lav_stop?: string | Date | null;
  lav_tes_anno?: number;
  lav_tes_num?: number;
  lav_user?: "";
}

export { ILavorazione };
