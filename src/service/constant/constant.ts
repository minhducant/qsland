import { Log } from '@utils/Log';
import { isObject } from 'underscore';
export const convertId = (data: any, key = "id") => {
    if (isObject(data)) {
        return Object.fromEntries(Object.values(data).map(item => [item[key], item]))
    }
}
/** @link https://docs.google.com/spreadsheets/d/1hxi4AwrQevp6HVkagL-6Xgs3LmkMXwNh_vnn3X2iIoY/edit#gid=1879495494 */

const APP = {
    TINH_TRANG_DU_AN: {
        dat_coc: { id: 1, name: "Đặt cọc", color: '#ee6883' },
        gom_cho: { id: 2, name: "Gom chỗ", color: '#50d3ea' },
        ban_let: { id: 3, name: "Bán lẻ", color: '#781669' }
    },
    LOAI_HINH_DU_AN: {
        thuong: { id: 1, name: 'Thường', color: 'black' },
        noi_bat: { id: 0, name: 'Nổi bật', color: 'black' },
    },
    PHAN_KHUC_DU_AN: {
        thuong: { id: 1, name: 'Chung cư', color: 'black' },
        noi_bat: { id: 0, name: 'LKBT', color: 'black' },
    },
    YEU_CAU_DAT_COC: {
        cho_duyet: { id: 1, name: 'Chờ duyệt lock' },
        dat_lock: { id: 1, name: 'Đã lock' },
        da_huy: { id: 1, name: 'Đã hủy' },
        yeu_cau_huy: { id: 1, name: 'Yêu cầu hủy' },
        tao_bill: { id: 1, name: 'Tạo bill' },
        da_duyet_look: { id: 1, name: 'Đã duyệt lock' },
        thu_hoi: { id: 1, name: 'Thu hồi' },
    },
    TINH_TRANG_HOP_DONG: {
        khach_hang_tu_choi_giao_dich: { id: -4, name: "KH từ chối GD" },
        dieu_phoi_kinh_doanh_huy: { id: -2, name: "ĐPKD hủy" },
        giam_doc_kinh_doanh_huy: { id: -1, name: "GĐKD hủy" },
        cho_giam_doc_san_duyet: { id: 1, name: "Chờ GĐS duyệt" },
        cho_dieu_phoi_kd_duyet: { id: 2, name: "Chờ ĐPKD duyệt" },
        cho_khach_hang_xac_nhan: { id: 3, name: "Chờ KH xác nhận" },
        kh_da_duyet_yc_tao_thanh_toan: { id: 4, name: "KH đã duyệt - YC tạo TT" },
        cho_ke_toan_thu_tien: { id: 5, name: "Chờ KT thu tiền" },
        cho_thu_ky_san_duyet: { id: 6, name: "Chờ TKS duyệt" },
        dat_cho: { id: 7, name: "Đặt chỗ" },
        cho_dieu_phoi_kd_xac_nhan_coc: { id: 8, name: "Chờ ĐPKD XN cọc" },
        dat_coc: { id: 9, name: "Đặt cọc" },
        cho_dvkh_xac_nhan: { id: 10, name: 'Chờ DVKH xác nhận' },
        ky_hop_dong_mua_ban: { id: 11, name: "Ký HĐMB" },
        huy_hop_dong: { id: 0, name: "Huỷ" }
    },
    TINH_TRANG_SAN_PHAM: {
        CBA: { step: 'lock', id: "CBA", name: 'Chưa ở bán' },
        MBA: { step: 'trong', id: "MBA", name: 'Mở bán' },
        CHLOCK: { step: 'lock', id: "CHLOCK", name: 'Chờ duyệt lock' },
        LOCKED: { step: 'lock', id: "LOCKED", name: 'Lock thành công' },
        ADD_CUSTOMER: { step: 'lock', id: "ADD_CUSTOMER", name: 'Đã thêm thông tin KH' },
        CUSTOMER_CONFIRM: { step: 'lock', id: "CUSTOMER_CONFIRM", name: 'Khách hàng đã xác nhận' },
        DCH: { step: 'lock', id: "DCH", name: 'Đặt chỗ' },
        CDDCO: { step: 'lock', id: "CDDCO", name: 'Chờ duyệt đặt cọc' },
        DCO: { step: 'dat_coc', id: "DCO", name: 'Đặt cọc' },
        HDO: { step: 'hdmb', id: "HDO", name: 'Hợp đồng mua bán' },
        HUY: { step: 'lock', id: "HUY", name: 'Chủ đầu tư thu hồi' },
        KHAC: { step: 'lock', id: "KHAC", name: 'Khác' },
    },
    NHOM_TINH_TRANG_SAN_PHAM: {
        trong: { name: "Trống", color: "#FFFFFF" },
        lock: { name: "Lock", color: "#FEA837" },
        dat_coc: { name: "Đặt cọc", color: '#FF0035' },
        hdmb: { name: "HDMB", color: "#8B939C" },
    },
    GIAI_DOAN_SAN_PHAM: {
        dat_coc: { id: 1, name: "Đặt cọc" },
        dat_cho: { id: 2, name: "Đặt chỗ" },
        gom_cho: { id: 3, name: "Gom chỗ" }
    },
    TYPE_PAYMENT: {
        tien_mat: { id: 1, name: "Tiền mặt" },
        chuyen_khoan: { id: 2, name: "Chuyển khoản" }
    },
    PAYMENT_HISTORY: {
        cho_duyet_bill: { id: 0, name: "Chưa xác nhận" },
        chua_xac_nhan: { id: 1, name: "Chưa xác nhận" },
        thanh_cong: { id: 2, name: "Thanh toán thành công" },
        that_bai: { id: 3, name: "Thanh toán thất bại" }
    },
    /** @link https://docs.google.com/spreadsheets/d/1Q0UlbbE-NG9vsNXpCc-2ndZrU_d5j01eIiV8vKnWp8A/edit#gid=224366892&range=F28 */
    TYPE_MONEY: {
        phan_tram: { id: 0 },
        gia: { id: 1 }

    },
    TYPE_NEWS: {
        thong_diep: { name: 'Thông điệp', id: 1 },
        vinh_danh: { name: 'Vinh danh', id: 2 },
        //
        sk_noi_bo: { name: 'Sự kiện nội bộ', id: 3 },
        //
        sk_mo_ban: { name: 'Sự kiện mở bán', id: 4 },
        tin_noi_bo: { name: 'Tin nội bộ', id: 5 },
        tin_du_an: { name: 'Tin dự án', id: 6 },
    },


}
export const TYPE_NEWS = APP.TYPE_NEWS
export const LOAI_HINH_DU_AN = APP.LOAI_HINH_DU_AN
export const TINH_TRANG_HOP_DONG = convertId(APP.TINH_TRANG_HOP_DONG)
export const TINH_TRANG_BILL = APP.TINH_TRANG_HOP_DONG
export const PHAN_KHUC_DU_AN = APP.PHAN_KHUC_DU_AN
export const TINH_TRANG_DU_AN = APP.TINH_TRANG_DU_AN
export const NHOM_TINH_TRANG_SAN_PHAM = APP.NHOM_TINH_TRANG_SAN_PHAM
export const TINH_TRANG_SAN_PHAM = APP.TINH_TRANG_SAN_PHAM
export const TYPE_PAYMENT = Object.values(APP.TYPE_PAYMENT)
export const GIAI_DOAN_SAN_PHAM = Object.values(APP.GIAI_DOAN_SAN_PHAM)
export const PAYMENT_HISTORY = convertId(APP.PAYMENT_HISTORY)
