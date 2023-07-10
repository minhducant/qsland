export namespace AppApiTypeRequest {
  export interface Page {
    limit?: number
    page?: number
  }
  export interface login {
    username: string
    password: string
  }
  export interface forgot {
    email?: string
    username?: string
  }
  export interface sendOtp {
    email: string
    token: string
    code: string
  }
  export interface resetPassword {
    email: string
    token: string
    pword: string
  }
  export interface changePassword {
    oldPassword: string
    password: string
  }
  export interface getInfo { }

  export interface getDetailDistricts {
    id: number
  }
  export interface getDetailWard {
    id: number
  }
  export interface getListCities { }
  export interface getListDistricts {
    province_id: number
  }
  export interface getListWard {
    district_id: number
  }
  export interface getListCustomer extends Page {
    /**
     * YYYY-MM-DD HH:mm:ss
     */
    to?: string
    /**
     * YYYY-MM-DD HH:mm:ss
     */
    from?: string
    /**
     * Tìng trạng khách hàng
     */
    interactive_status?: number | null
    /**
     * Nguồn khách hàng
     */
    source_id?: number | null
    /**
     * Nhóm khách hàng
     */
    group_customer_id?: number | null
    create_type?: 1
  }
  export interface getDetailCustomer {
    id: number
  }
  export interface getCountCustomer {
    /**
     * YYYY-MM-DD HH:mm:ss
     */
    to: string
    /**
     * YYYY-MM-DD HH:mm:ss
     */
    from: string
    /**
     * Tìng trạng khách hàng
     */
    interactive_status: number | null
    /**
     * Nguồn khách hàng
     */
    source_id: number | null
    /**
     * Nhóm khách hàng
     */
    group_customer_id: number | null
  }
  export interface getListSaleCustomerCampaignHistory extends Page {
    customer_id: number
    interactive_status: number
    source_id: number
  }
  export interface addSaleCustomerCampaignHistoryTakeCare {
    customer_id: any
    /**
     * Tình trạng khách hàng
     */
    interactive_status: any
    /**
     * Hình thức tương tác
     */
    interactive_form: any
    note: any
  }

  export interface sendExplanation {
    reason: any
    desc: any
    image?: any
    id?: any
  }

  export interface addCustomer {
    images?: any
    city_id: any
    district_id: any
    ward_id: any
    phone: any
    sex: any
    full_name: any

    cmt_img_before?: any
    cmt_img_after?: any
  }
  export interface updateCustomer {
    id: number
    images?: any
    city_id: any
    district_id: any
    ward_id: any
    phone: any

    cmt_img_before?: any
    cmt_img_after?: any
    /**
     * Giới tính 1:nam 2 nữ or null
     */
    sex: 1 | 2 | null
    /**
     * Mã nguồn khách hàng
     */
    source_id: any
    /**
     * nhóm khách hàng
     */
    group_customer_id: any
    full_name: any
    file?: string
  }
  export interface getListGroupCustomer { }
  export interface getListSource { }
  export interface getListCampaign { }
  export interface cancelExplanation { }
  export interface getListAdminDenyCOMMON {
    user_id_manager: any//id user
    user_id_sale: any//* Lọc theo nhân viên
    from: any//* Từ : 
    to: any//* Đến: 
    key_search: any
    campaign_id: any//* Lọc KH theo chiến dịch: 
    /**
     * Lọc theo tình trạng vi phạm 
     * 1: vi phạm, 2:chờ duyệt, //////. 3 : Đã duyệt, 4: Từ chối
     */
    status: any
    category_id: any
    source_id: any
    limit: any
    page: any
    exchange_id: any// * Lọc theo sàn :
  }
  export interface getListAdDenyWait {

  }
  export interface getListAdDenyDone { }
  export interface getListAdDenyNone { }
  export interface getCountAdDenyWait { }
  export interface getCountAdDenyDone { }
  export interface getCountAdDenyNone { }
  export interface getDetailDenyAdmin { id: number }

  export interface addDenyAdmin {
    id: number
    //4 từ chối
    //3 xác nhận 
    status: 3 | 4
  }
  export interface getDetailCustomerStatus { }
  export interface countAllottedCustomersOfSale { }
  export interface countCustomersAllocatedByMonth { }
  export interface countCustomerOverviewOfLead { }
  export interface countCustomerOverviewOfManager { }
  export interface getListPermission { }
  export interface addFirebaseTokenPush { token_push: string }
  export interface getListCategories extends Page {
    cb_title?: string
    cb_level?: number// 1: dự án, 2 tòa nhà
    type_project?: any//	lọc loại hình (1 nổi bật, 0 thường)
    apartment_grid?: any//	lọc phân khúc ( 1 chung cư, 0 LKBT)
  }
  export interface getListNotify { }
  export interface getCountNotify { }
  export interface readNotifyItem { }
  export interface updateUserInfo {
    image: any
  }
  export interface getListStaff { group_sale_id?: number }
  export interface getDetailCategories { id: number }
  export interface getListCampaignProject { category_id: number, city_id?: number, district_id?: number }
  export interface getDetailCampaignSale { id: number }
  export interface countCampaignSale { }
  export interface getListBuilding { category_id: number }
  export interface getListProduct { category_id: number, building_id: number, cart_id: number }
  export interface getListApartment { building_id: number }
  export interface getDetailProduct { id: number }
  export interface getListLookBookApart { id: number }
  export interface getListSalePolicy {
    building_id?: any
    category_id?: any
    status?: any
    title?: any
  }
  export interface getDetailSalePolicy {
    building_id?: any
    category_id?: any
  }
  export interface getListCart { }
  export interface getDetailCart { id: number }
  export interface addBookApartment {
    cmt_img_before?: any
    cmt_img_after?: any
  }
  export interface addPaymentHistory {
    bill_id: any
    total: any
    type_payment: any
    file: any
    reason: any
    desc: any
    will_pay: any
  }
  export interface getDetailBill { id: any }
  export interface xacNhanHopDongTuVan {
    bill_id: number
    status: 'chap_thuan' | 'tu_choi'
  }
  /**News */
  export interface NewParams {
    priority_level: any//mức độ ưu tiên
    comment_type: any//loại bình luận
    status: any
    type: any //loai tin dang
    title: any
    // created_at: any
    // updated_at: any
    // deleted_at: any
    honor_exchange_id: any//phòng ban được vinh danh
    register_time_start: any//thời gian bắt đầu đăng ký
    register_time_end: any
    checkin_time_start: any //thời gian bắt đầu checkin
    checkin_time_end: any
    event_time_start: { reverse: boolean, time: string } //thời gian bắt đầu sự kiên
    event_time_end: { reverse: boolean, time: string }//reverse--trước và sau
  }
  export interface getListNews extends NewParams, Page {
  }
  export interface countNews extends NewParams {
  }
  export interface getDetailNews {
    id: number
  }
  export interface getListComment extends Page {
    news_id: number
  }
  export interface addComment {
    user_id: any
    news_id: any
    image: any
    content: any
    video: any
    parent_id: any//0 hoặc 1 ,không truyền mặc định là 0
    id?: number
    reactions?: any//option	loại cảm xúc ( 1: like, 2: tim, 3: haha, 4 phẫn nộ)
  }
  export interface deleteComment {
    id: number
  }
  export interface addVote {
    user_id: any
    news_id: any
    vote: any//bắc buộc, theo mảng
    //["Nguyễn Văn A", "Nguyễn Văn B"]
  }
  export interface updateVote {
    id: number
    user_id: any
    news_id: any
    vote: any
  }
  export interface deleteVote {
    id: number
  }
}
