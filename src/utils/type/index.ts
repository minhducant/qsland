import { StoreType } from "@service/store"
import { any } from "underscore"
import { MappedItem } from "./core"
export interface Res<T = any> {
  data: T,
  mess: string,
  status: boolean
}

export interface SelectorRedux extends StoreType {
  langue: any
}

export namespace AppType {
  export interface ItemCustomerMe {
    id: any
    category_id: any
    user_id_sale: any
    city_id: any
    district_id: any
    ward_id: any
    cb_city_id: any
    cb_district_id: any
    cb_ward_id: any
    country: any
    code_area: any
    birthday: any
    sex: any
    customer_code: any
    cmt_full_name: any
    full_name: any
    phone: any
    email: any
    note: any
    create_date: any
    create_by: any
    address: any
    cb_address: any
    interactive_status: any
    interactive_form: any
    create_type: any
    status_allocation: any
    cmt: any
    source_id: any
    group_customer_id: any
    created_at: any
    deleted_at: any
    updated_at: any
    images: any
    cmt_date: any
    cmt_address: any
  }

  export interface ItemCustomerAllocation {
    address: any
    agent_id: any
    birthday: any
    browse_status: any
    campaign_id: any
    campaign_name: any
    category_id: any
    category_name: any
    cb_id: any
    chk_pb: any
    created_at: any
    data: DataItemAllocation
    email: any
    gender: any
    id: any
    id_passport: any
    images: any
    message: any
    name: any
    need: any
    note: any
    passport_date: any
    passport_place: any
    phone: any
    source: any
    status: any
    type: any
    updated_at: any
    user_id: any
  }
  export type DataItemAllocation = {
    note: string,
    staff: number,
    action: string
  }
  export interface ItemCustomerDeny {
    address: any
    agent_id: any
    birthday: any
    browse_status: any
    campaign_id: any
    campaign_name: any
    category_id: any
    cb_id: any
    chk_pb: any
    created_at: any
    data: any
    diary_log: {
      accept_by: any
      campaign_id: any
      created_at: any
      customer_id: any
      deleted_at: any
      description: any
      email: any
      feedback: any
      filter: any
      first_feedback: any
      id: any
      interact: any
      lead_id: any
      lead_temp_id: any
      name: any
      phone: any
      project_id: any
      rating: any
      staff_id: any
      stage: any
      status: any
      updated_at: any
    },
    email: any
    gender: any
    id: any
    id_passport: any
    images: any
    message: any
    name: any
    need: any
    note: any
    passport_date: any
    passport_place: any
    phone: any
    source: any
    status: any
    type: any
    updated_at: any
    user_id: any

  }
  export interface userData {
    address: any
    avatar: any
    birthday: any
    cmt_address: any
    cmt_date: any
    cmt_image: any
    cmt_number: any
    cmt_province: any
    cmt_status: any
    created_at: any
    deleted_at: any
    email_contact: any
    full_name: any
    gender: any
    id: any
    phone_contact: any
    social_insurance_code: any
    update_at: any
    user_id: any
    code_staff: any
    position: any
  }
  export interface AppStore {
    auth: {
      token: any
      roles: any
      info: any
      status: any
    }
    dataUser: {
      dataUser: any
    }
    CustomerStatic: {
      ListSource: {
        loading: false,
        time: number,
        data: any[]
      }
      ListGroup: {
        loading: false,
        time: number,
        data: any[]
      }
      ListCities: {
        loading: false,
        time: number,
        data: any[]
      }
      ListCampaign: {
        loading: false,
        time: number,
        data: any[]
      }
    }
  }
  export interface ListCampaign {
    id: any
    user_id_sale: any
    campaign_id: any
    interactive_form: any
    interactive_status: any
    action: any
    customer_id: any
    note: any
    updated_at: any
    created_at: any
  }
  export type ItemListProjectPopular = MappedItem<typeof _ItemListProjectPopular>
}

let _ItemListProjectPopular = ["total_product", "id", "cb_id", "cb_status", "parent_id", "ward_id", "cb_code", "reference_code", "cb_title", "alias", "cb_description", "extra_ids", "updated_user_id", "investor_id", "ub_updated_time", "created_user_id", "ub_created_time", "cb_level", "last_sync_tvc", "type", "apartment_grid", "active_booking", "enable_list_price", "send_mail", "dxmb_project_id", "image", "images", "price_from", "price_to", "city_id", "district_id", "pj_description", "address", "stage", "hidden_cat", "order", "company_id", "staff_lock", "staff_assemble", "active_assemble", "total_progress", "type_project", "row_table_style", "lock", "assemble", "publication_time", "handover_documents", "created_at", "deleted_at", "updated_at", "name"] as const;

let _campaign_detail = ["id", "title", "max", "time_start", "time_end", "category_id", "total", "company_id", "building_id", "deleted_at", "updated_at", "created_at", "desc", "status"] as const
let _bill = ['gia_san', 'gia_tran', 'gia_niem_yet', 'cdt_code', "paid", "id", "parent_id", "status", "title", "code", "user_sale_id", "note", "type", "deleted_at", "updated_at", "created_at", "customer_id", "product_id", "campaign_sale_id", "category_id", "building_id", "file", "opt", "wish", "info_customer", "exchange_id", "company_id"] as const
let _pay = ["id", "bill_id", "note", "user_id_sale", "confirm_date", "total", "will_pay", "type_payment", "image", "status", "code", "reason", "exchange_id", "desc", "payment_date", "deleted_at", "updated_at", "created_at"] as const

export type CampaignDetail = MappedItem<typeof _campaign_detail>
export type BillDetail = MappedItem<typeof _bill>
export type PayDetail = MappedItem<typeof _pay>
export type TransactionDetail = { bill: BillDetail, payment_history: PayDetail[] }
export type Permission =
  | 'nhanvienbanhang'
  | 'khachhang'
  | 'giamdocsan'
  | 'dieuphoikinhdoanh'
  | 'dichvukhachhang'
  | 'ketoan'
  | 'truongphong'
  | 'truongnhom'
  | 'thukydonvi'
  | 'quanlychiendich'
  | 'quanlydohang'
let newDetail = ["id", "avatar", "hashtag", "priority_level", "comment_type", "vote_option", "status", "type", "title", "company_ids", "exchange_ids", "desc_short", "desc_detail", "created_at", "updated_at", "deleted_at", "category_ids", "honor_units", "honor_exchange_id", "honor_spending", "allow_register", "allow_member", "address", "units", "register_time_start", "register_time_end", "checkin_time_start", "checkin_time_end", "event_time_start", "event_time_end"] as const
export type NewDetail = MappedItem<typeof newDetail>