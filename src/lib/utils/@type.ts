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
    rule_time: any
    allotment_time: any
    final_date: any
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
    note: string
    staff: number
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
    }
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
    update_at: any
    user_id: any
  }
  export interface AppStore {
    loading: {}
    auth: {
      token: any
      roles: any
      info: any
      status: any
    }
    dataUser: {
      dataUser: any
    }
    dashboard: {}
    CustomerStatic: {
      ListSource: { data: any[] }
      ListGroup: { data: any[] }
      ListCities: { data: any[] }
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
}
