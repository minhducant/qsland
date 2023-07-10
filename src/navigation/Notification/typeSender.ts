export const TYPE_SENDER: any = {

  1: { name: 'y_kien', navigation: 'screen_feedback_detail' },
  3: { name: 'thong_bao', navigation: 'screen_notify_details' },
  4: { name: 'bai_post', navigation: 'screen_post_detail' },
  6: { name: 'tin_hay', navigation: 'screen_news_details' },
  7: { name: 'su_kien', navigation: 'screen_event_details' },
  8: { name: 'yeu_cau', navigation: 'screen_request_detail' },
  9: { name: 'check_list', navigation: 'screen_work_detail' },
  11: { name: 'tai_chinh', navigation: 'screen_finance_details' },
}
export const TYPE_REQUEST: any = {
  1: { note: 'đăng_ký_phương_tiện', navigation: 'screen_request_detail', type: 'phuong_tien' },
  2: { note: 'huỷ_phương_tiện', navigation: 'screen_request_detail', type: 'phuong_tien' },
  3: { note: 'cấp_lại_thẻ_phương_tiện', navigation: 'screen_request_detail', type: 'phuong_tien' },
  4: { note: 'thang_máy_chuyển_đồ', navigation: 'screen_request_detail', type: 'thang_may' },
  5: { note: 'đăng_ký_sửa_chữa', navigation: 'screen_request_detail', type: 'sua_chua' },
  6: { note: 'tiện_ích_cộng_đồng', navigation: 'screen_request_detail', type: 'tien_ich' },
}
