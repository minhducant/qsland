export namespace AppApiTypeResponse {
  export interface Response {
    status: boolean,
    data: any
    mess: string
  }
  export interface login {
  }
  export interface forgot {
  }
  export interface sendOtp {
  }
  export interface resetPassword {
  }
  export interface changePassword {
  }
  export interface getInfo {
  }

  export interface getListCities {

  }
  export interface getListDistricts {
  }
  export interface getListWard {
  }
  export interface getListCustomer {

  }
  export interface getListSaleCustomerCampaignHistory {
  }
  export interface addSaleCustomerCampaignHistoryTakeCare {

  }
  export interface addCustomer {

  }
  export interface updateCustomer {

  }
  export interface getListCustomer_PHAN_BO {
    /**# 
     * ## status_allocation 
     * - 1 chờ phân bổ 
     * - 2 đã phân bổ 
     * - 3 Đã chăm sóc  
     *  - 4 thu hồi
     */
    status_allocation: any// 3
    //thời hạn phân bổ -phút
    run_time: number
    id: any// 112
    category_id: any// 2626
    user_id_sale: any// 1
    city_id: any// null
    district_id: any// null
    ward_id: any// null
    cb_city_id: any// null
    cb_district_id: any// null
    cb_ward_id: any// null
    country: any// viet_nam
    code_area: any// null
    birthday: any// null
    sex: any// 1
    customer_code: any// null
    cmt_full_name: any// null
    full_name: any// Khách hàng 2
    phone: any// 0310000001
    email: any//khachhang2 @gamil.com
    note: any// null
    create_date: any// 2023 - 05 - 19 15: 58: 46
    create_by: any// 3
    address: any// null
    cb_address: any// null
    interactive_status: any// 4
    interactive_form: any// null
    create_type: any// 1

    cmt_number: any// null
    source_id: any// 1
    group_customer_id: any// 4
    created_at: any// 2023 - 05 - 19 15: 58: 46
    deleted_at: any// null
    updated_at: any// 2023 - 05 - 24 10: 40: 01
    images: any// null
    cmt_date: any// null
    cmt_address: any// null
    exchange_name: any//sàn siêu cấp
    final_date: any// 2023 - 05 - 23 14: 05: 35
    allocation_date: any// 2023 - 05 - 19 15: 58: 47
    campaign_name: any//CHIẾN DỊCH 1111111
  }
}