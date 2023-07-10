import store from "@service/store"
import React from 'react'

import { Text } from "react-native"
const B = ({ children }: any) => <Text style={{ fontWeight: 'bold' }}>{children}</Text>
const H1 = ({ children }: any) => <Text >{children}</Text>
import { isObject } from "underscore"

export const NotifyTask = {
  them_cong_viec: '',
  cap_nhat_cong_viec: '',
  gui_duyet: ({ ten_cong_viec, ten_nguoi_gui_duyet }: any) => `Bạn nhận được yêu cầu duyệt công việc ${ten_cong_viec} từ ${ten_nguoi_gui_duyet}`,
  phe_duyet_lam_lai: ({ ten_nguoi_duyet }: any) => `Công việc ten_cv bị yêu cầu làm lại bởi ${ten_nguoi_duyet}`,
  phe_duyet_thanh_cong: ({ ten_nguoi_duyet }: any) => `Yêu cầu duyệt công việc ten_cv của bạn đã được xác nhận hoàn thành bởi ${ten_nguoi_duyet}`,
  tu_xac_nhan_hoan_thanh: ({ ten_cong_viec }: any) => `Công việc ${ten_cong_viec} đã được hoàn thành`,
  gui_chuyen_ca: ({ ten_nguoi_gui_yc }: any) => `Bạn nhận được 1 yêu cầu chuyển từ ${ten_nguoi_gui_yc} `,
  duyet_thanh_cong_nguoi_cu: ({ ten_truong_bo_phan, ten_cong_viec }: any) => `Thông báo đến người mới:${ten_truong_bo_phan} đã thêm bạn vào 1 công việc: ${ten_cong_viec}`,
  duyet_thanh_cong_nguoi_moi: ({ ten_truong_bo_phan, ten_cong_viec }: any) => `Thông báo đến người gửi: Yêu cầu đổi người thực hiện công việc ${ten_cong_viec} của bạn đã được chấp nhận bởi ${ten_truong_bo_phan}`,
  duyet_ca_that_bai: ({ ten_truong_bo_phan, ten_cong_viec }: any) => `Yêu cầu đổi người thực hiện công việc ${ten_cong_viec} của bạn đã bị từ chối bởi ${ten_truong_bo_phan}`,
  them_quyen_nguoi_moi: ({ ten_nguoi_sua }: any) => `Bạn vừa được cấp quyền ten_quyen ở công việc ten_cv bởi ${ten_nguoi_sua}`,
  xoa_quyen: ({ ten_nguoi_xóa }: any) => `Bạn đã bị xóa khỏi công việc ten_cv bởi ${ten_nguoi_xóa}`,
  chinh_sua_truy_cap: ({ ten_quyen, ten_cong_viec, ten_nguoi_sua }: any) => `Bạn vừa được cấp quyền ${ten_quyen} ở công việc ${ten_cong_viec} bởi ${ten_nguoi_sua}`,
  nhuong_quyen: ({ ten_quyen, ten_nguoi_sua, ten_cong_viec }: any) => `Bạn vừa được nhượng quyền ${ten_quyen} ở công việc ${ten_cong_viec} bởi ${ten_nguoi_sua}`,
  huy_cong_viec: ({ ten_cv, ten_nguoi_huy }: any) => `Công việc ${ten_cv} đã bị hủy bởi ${ten_nguoi_huy}`,
  binh_luan_cong_viec: ({ ten_nguoi_cmt, noi_dung_cmt }: any) => `${ten_nguoi_cmt} đã bình luận vào 1 công việc mà bạn đang tham gia: ${noi_dung_cmt}`,
}

export const getTitleTaskNotify = (action: keyof typeof NotifyTask, data: any, task: paramsTask, dataUser: any) => {
  if (!isObject(data) && !NotifyTask[action]) return <H1>Dữ liệu cũ bỏ qua</H1>
  const userName = dataUser?.full_name || 'Username'
  const info = {
    ten_nguoi_tao_cv: userName,
    ten_nguoi_gui_duyet: userName,
    ten_nguoi_duyet: userName,
    ten_cong_viec: task?.title || 'Tên công việc',
    ten_nguoi_gui_yc: userName,
    ten_truong_bo_phan: userName,
    ten_nguoi_sua: userName,
    ten_nguoi_xóa: userName,
    ten_quyen: data.content,
    ten_nguoi_huy: userName,
    ten_nguoi_cmt: userName,
    // noi_dung_cmt: '?',
  }
  switch (action) {//<B></B>
    case 'them_cong_viec':
      return <H1><B>{info['ten_nguoi_tao_cv']}</B>{` Đã thêm bạn vào một công việc `}<B>{info['ten_cong_viec']}</B></H1>
    case 'cap_nhat_cong_viec':
      return <H1><B>{info['ten_nguoi_sua']}</B>{` Đã cập nhật công việc `}<B>{info['ten_cong_viec']}</B></H1>
    case 'gui_duyet':
      return <H1>{`Bạn nhận được yêu cầu duyệt công việc `}<B>{info['ten_cong_viec']}</B> từ <B>{info['ten_nguoi_gui_duyet']}</B></H1>
    case 'phe_duyet_lam_lai':
      return <H1>Công việc <B>{info['ten_cong_viec']}</B> bị yêu cầu làm lại bởi <B>{info['ten_nguoi_duyet']}</B></H1>
    case 'phe_duyet_thanh_cong':
      return <H1>Yêu cầu duyệt công việc <B>{info['ten_cong_viec']}</B> của bạn đã được xác nhận hoàn thành bởi <B>{info['ten_nguoi_duyet']}</B></H1>
    case 'tu_xac_nhan_hoan_thanh':
      return <H1>Công việc <B>{info['ten_cong_viec']}</B> đã được hoàn thành</H1>
    case 'gui_chuyen_ca':
      return <H1>Bạn nhận được 1 yêu cầu chuyển ca từ <B>{info['ten_nguoi_gui_yc']}</B> </H1>
    case 'duyet_thanh_cong_nguoi_cu':
      return <H1>Thông báo đến người mới:<B>{info['ten_truong_bo_phan']}</B> đã thêm bạn vào 1 công việc: <B>{info['ten_cong_viec']}</B></H1>
    case 'duyet_thanh_cong_nguoi_moi':
      return <H1>Thông báo đến người gửi: Yêu cầu đổi người thực hiện công việc <B>{info['ten_cong_viec']}</B> của bạn đã được chấp nhận bởi <B>{info['ten_truong_bo_phan']}</B></H1>
    case 'duyet_ca_that_bai':
      return <H1>Yêu cầu đổi người thực hiện công việc <B>{info['ten_cong_viec']}</B> của bạn đã bị từ chối bởi <B>{info['ten_truong_bo_phan']}</B></H1>
    case 'them_quyen_nguoi_moi':
      return <H1>Bạn vừa được cấp quyền <B>{info['ten_quyen']}</B> ở công việc <B>{info['ten_cong_viec']}</B> bởi <B>{info['ten_nguoi_sua']}</B></H1>
    case 'xoa_quyen':
      return <H1>Bạn đã bị xóa khỏi công việc <B>{info['ten_cong_viec']}</B> bởi <B>{info['ten_nguoi_xóa']}</B></H1>
    case 'chinh_sua_truy_cap':
      return <H1>Bạn vừa được cấp quyền <B>{info['ten_quyen']}</B> ở công việc <B>{info['ten_cong_viec']}</B> bởi <B>{info['ten_nguoi_sua']}</B></H1>
    case 'nhuong_quyen':
      return <H1>Bạn vừa được nhượng quyền <B>{info['ten_quyen']}</B> ở công việc <B>{info['ten_cong_viec']}</B> bởi <B>{info['ten_nguoi_sua']}</B></H1>
    case 'huy_cong_viec':
      return <H1>Công việc <B>{info['ten_cong_viec']}</B> đã bị hủy bởi <B>{info['ten_nguoi_huy']}</B></H1>
    case 'binh_luan_cong_viec':
      return <H1><B>{info['ten_nguoi_cmt']}</B> đã bình luận vào 1 công việc mà bạn đang tham gia</H1>
    default:
      return <H1>Dữ liệu cũ bỏ qua</H1>
  }
}
type paramsTask = {
  asset_area_Info_id: any
  assigned: any
  assigned_monitor: any
  attach_file: any
  building_id: any
  category_task_id: any
  checklist_id: any
  create_by: any
  created_at: any
  deleted_at: any
  department_id: any
  desc: any
  end_date: any
  id: any
  parent_task_id: any
  permission: any
  priority: any
  schedule_id: any
  start_date: any
  status: any
  title: any
  updated_at: any
}
