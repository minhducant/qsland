export enum Permission {
  duyet_vi_pham,
  hien_email_sdt,
  danh_sach_khach_hang_vi_pham,
  danh_sach_chien_dich,
  gui_vi_pham
}
function extra(list: any[] | 'all' = [], type: "list" | 'remove' = "list") {
  if (list == "all") return Object.keys(Permission)
  switch (type) {
    case 'list':
      return list
    case 'remove':
      return Object.keys(Permission).filter(i => list.find(j => j == i) == undefined)
    default:
      return []
  }
}
const user___permission__example = ['quan_ly_chien_dich', 'truong_nhom']
export function checkRoleUser(permission: keyof Permission) {
  let __check = false
  if (Object.keys(Permission).find(key => permission !== undefined)) {
    user___permission__example.forEach(i => {
      if (i == permission) __check == true
    })
  }
  return __check
}
export const GroupPermission = {
  nhan_ven: extra([Permission.gui_vi_pham]),
  quan_ly_chien_dich: extra([Permission.duyet_vi_pham]),
  truong_nhom: [],
  truong_phong: [],
  giam_doc_san: [],
  thu_ky_don_vi: [],
  dieu_phoi_kinh_doanh: [],
  dich_vu_khach_hang: [],
  ke_toan: [],
  quan_ly_ro_hang: [],
  admin: extra([Permission.duyet_vi_pham], 'remove'),
  hcns: [],
}
export const GroupDetail = {
  nhan_ven: { desc: 'Nhân viên' },
  quan_ly_chien_dich: {
    desc: 'Người quản lý chiến dịch',
  },
  truong_nhom: { desc: 'Trưởng nhóm' },
  truong_phong: { desc: 'Trưởng phòng' },
  giam_doc_san: { desc: 'Giám đốc sàn' },
  thu_ky_don_vi: { desc: 'Thư ký đơn vị' },
  dieu_phoi_kinh_doanh: { desc: 'Điều phối kinh doanh' },
  dich_vu_khach_hang: { desc: 'Dịch vụ khách hàng' },
  ke_toan: { desc: 'Kế toán' },
  quan_ly_ro_hang: { desc: 'Người quản lý rổ hàng' },
  admin: { desc: 'Admin' },
  hcns: { desc: 'HCNS' },
}
