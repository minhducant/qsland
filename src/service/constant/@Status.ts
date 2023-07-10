import { AppLang } from '@assets/langs'

export const STATUS_OF_ME = {
  0: { label: AppLang('khach_hang_khong_quan_tam'), color: 'pink' },
  1: { label: AppLang('khach_hang_quan_tam'), color: 'pink' },
  2: { label: AppLang('sai_so_dien_thoai'), color: 'pink' },
  3: { label: AppLang('khong_nghe_may'), color: 'pink' },
}
export const STATUS_OF_DENY = {
  0: { label: AppLang('khach_hang_khong_quan_tam'), color: 'pink' },
  1: { label: AppLang('khach_hang_quan_tam'), color: 'pink' },
  2: { label: AppLang('sai_so_dien_thoai'), color: 'pink' },
  3: { label: AppLang('khong_nghe_may'), color: 'pink' },
}
export const STATUS_OF_ALLOCATION = {
  0: { label: AppLang('vi_pham'), color: 'red' },
  1: { label: AppLang('da_duyet'), color: 'blue' },
  2: { label: AppLang('cho_duyet'), color: 'green' },
  3: { label: AppLang('tu_choi'), color: 'yellow' },
  5: { label: AppLang('da_phat'), color: 'yellow' },
  6: { label: AppLang('da_tha'), color: 'yellow' },
}
/**
 * Loại kháchh hàng: create_type
 */
export const TYPE_RECEIPT: any = {
  0: { label: 'null' },
  /**
   * Khách hàng được phân phổ
   */
  1: { label: AppLang('phan_bo'), label2: 'Nhận phân bổ', color: '#E5A630' },
  /**
   * Khách hàng cá nhân thêm
   */
  2: { label: AppLang('ngay_tao'), label2: 'Ngày tạo', color: '#3091E5' },
}
/**
 * Trạng thái chăm sóc khách hàng: interactive_status
 */
export const STATUS_INTERACTIVE: any = {
  1: { label: 'KH Mới', color: '#E53030' },
  2: { label: 'Đang liên hệ', color: '#E26900' },
  3: { label: 'Đang chăm sóc', color: '#A702DF' },
  4: { label: 'Tiếp cận', color: '#019689' },
  5: { label: 'Tiềm năng', color: '#03CB03' },
  6: { label: 'Không nhu cầu', color: '#545B5D' },
  7: { label: 'Giao Dịch', color: '#BE980F' },
}
/////
export const STATUS_ALLOCATION: any = {
  1: { label: 'Chờ phân bổ', color: '#E53030' },
  2: { label: 'Đã phân bổ', color: '#03CB03' },
  3: { label: 'Đã chăm sóc', color: '#A702DF' },
  4: { label: 'Thu hồi', color: '#545B5D' },
}
export const ALLOCATION_STATUS = {
  cho_phan_bo: { id: 1, label: 'Chờ phân bổ', color: '#E53030' },
  da_phan_bo: { id: 2, label: 'Đã phân bổ', color: '#03CB03' },
  da_cham_soc: { id: 3, label: 'Đã chăm sóc', color: '#A702DF' },
  thu_hoi: { id: 4, label: 'Thu hồi', color: '#545B5D' },
}

export const STATUS_DENY = {
  1: { name: 'Vi phạm', color: '#E53030', label: 'Vi phạm', },
  2: { name: 'Chờ duyệt', color: '#BE980F', label: 'Chờ duyệt', },
  3: { name: 'Đã duyệt', color: '#03CB03', label: 'Đã duyệt', },
  4: { name: 'Từ chối', color: '#545B5D', label: 'Từ chối', },
  5: { name: AppLang('da_phat'), label: AppLang('da_phat'), color: 'yellow' },
  6: { name: AppLang('da_tha'), label: AppLang('da_tha'), color: 'yellow' },
}
/**
 * # Hình thức chăm sóc :interactive_form
 */
export const TYPE_INTERACTIVE: any = {
  1: { label: 'Email' },
  2: { label: 'Gọi điện' },
  3: { label: 'Tin nhắn (SMS)' },
  4: { label: 'Gặp mặt' },
}


/**
 * Trạng thái lịch sử chăm sóc khách hàng: action
 */
export const STATUS_HISTORY: any = {
  cham_soc: { label: 'Chăm sóc', color: 'pink' },
  gui_giai_trinh: { label: 'Gửi giải trình', color: 'pink' },
  thu_hoi: { label: 'Thu hồi', color: 'red' },
  phan_bo: { label: 'Phân bổ', color: 'green' },
  vi_pham: { label: 'Vi phạm', color: 'pink' },
  duyet_vi_pham: { label: 'Duyệt vi phạm', color: 'pink' },
}
/**
 * Giới tính khách hàng
 * - aaa
 * # bbb
 * # ccc
 */
export const GENDER: any = {
  1: { label: 'Nam' },
  2: { label: 'Nữ' },
  3: { label: 'Khác' },
}
export const COUNTY: any = {
  viet_nam: { label: 'Việt Nam' },
  nuoc_ngoai: { label: 'Nước ngoài' },
}
export const GENDER_LIST = Object.entries(GENDER).map(([id, value]: any) => ({
  id,
  ...value,
}))
export const COUNTY_LIST = Object.entries(COUNTY).map(([id, value]: any) => ({
  id,
  ...value,
}))
export const STATUS_INTERACTIVE_LIST = Object.entries(STATUS_INTERACTIVE)
  .map(([id, value]: any) => ({ id, ...value }))
  .filter(({ id }) => id != 1 && id != 7)
export const TYPE_INTERACTIVE_LIST = Object.entries(TYPE_INTERACTIVE).map(
  ([id, value]: any) => ({ id, ...value }),
)
export const STATUS_ME = {
  1: { name: 'KH Mới', color: '#E53030' },
  2: { name: 'Đang liên hệ', color: '#E26900' },
  3: { name: 'Đang chăm sóc', color: '#A702DF' },
  4: { name: 'Tiếp cận', color: '#019689' },
  5: { name: 'Tiềm năng', color: '#03CB03' },
  6: { name: 'Không nhu cầu', color: '#545B5D' },
  7: { name: 'Giao Dịch', color: '#BE980F' },
}
