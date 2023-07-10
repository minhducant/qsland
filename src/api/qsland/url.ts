export const AppURL = {
  Auth: {
    login: 'app/auth/login',
    forgetAccount: 'app/auth/forgetAccount',
    verifyAccount: 'app/auth/verifyAccount',
    setPword: 'app/auth/setPword',
    changePword: 'app/auth/changePword',
    get: 'app/auth/get',
    addFirebaseTokenPush: 'app/tokenPush/addFirebaseTokenPush',
  },
  Customer: {
    getCountCustomer: 'app/customer/getCountCustomer',
    addCustomer: 'app/customer/addCustomer',
    updateCustomer: 'app/customer/updateCustomer',
    getListCities: 'app/address/getListCities',
    getListDistricts: 'app/address/getListDistricts',
    getDetailDistricts: 'app/address/getDetailDistricts',
    getListWard: 'app/address/getListWard',
    getDetailWard: 'app/address/getDetailWard',
    getListCustomer: 'app/customer/getListCustomer',
    getDetailCustomer: 'app/customer/getDetailCustomer',
    getListGroupCustomer: 'app/group_customer/getListGroupCustomer',
    getListSource: 'app/source/getListSource',
    getListSaleCustomerCampaignHistory: 'app/customer/getListSaleCustomerCampaignHistory',
    addSaleCustomerCampaignHistoryTakeCare: 'app/customer/addSaleCustomerCampaignHistoryTakeCare',
    getListDenyCustomer: 'app/sale_violation/getListFilterViolatingCustomersOfSale',
    sendExplanation: 'app/sale_violation/sendExplanation',
    getListCampaign: 'app/campaign/getListCampaign',
    getCountDenyCustomer: 'app/sale_violation/countFilterViolatingCustomers',
    cancelExplanation: 'app/sale_violation/cancelExplanation',
    getDetailDenyCustomer: 'app/sale_violation/getDetailFilterViolatingCustomers',
  },
  Admin: {
    getListDenyAdmin: 'app/sale_violation/getListFilterViolatingCustomersOfManager',
    getCountDenyAdmin: 'app/sale_violation/countFilterViolatingCustomersOfManager',
    getListStaff: 'app/user/getListUserInfo',
    getListExchange: 'app/exchange/getListExchange',
    getListCategories: 'app/category/getListCategories',
    addDenyAdmin: 'app/sale_violation/browseExplanations',
    getDetailDenyAdmin: 'app/sale_violation/getDetailFilterViolatingCustomers',
  },
  Static: {
    getDetailCustomerStatus: 'app/customer/getDetailCustomerStatus',
    countAllottedCustomersOfSale: 'app/customer/countAllottedCustomersOfSale',
    countCustomersAllocatedByMonth: 'app/customer/countCustomersAllocatedByMonth',
    countCustomerOverviewOfLead: 'app/customer/countCustomerOverviewOfLead', //Tổng quan khách hàng trưởng nhóm
    countCustomerOverviewOfManager: 'app/customer/countCustomerOverviewOfManager', //Tổng quan khách hàng quảy lý
    getListGroupSale: 'app/group_sale/getListGroupSale',
    getListPermission: 'app/permission/getDetailPermission',
  },
  Notify: {
    getListNotify: 'app/customer/getListCustomer', //"app/notify/getListNotify",
    getCountNotify: 'app/sale_violation/getDetailFilterViolatingCustomers', //"app/notify/getCountNotify",
    readNotifyItem: 'app/notify/readNotifyItem',
  },
  User: {
    updateUserInfo: 'app/user/updateUser',
  },
  Project: {
    /**Danh sách dự án */
    getListCategories: 'app/category/getListCategories',
    /**Chi tiết dự án */
    getDetailCategories: 'app/category/getDetailCategories',
    /**Danh sách chiến dịch sale-theo dự án */
    getListCampaignProject: 'app/campaign_sale/getListCampaignSale',
    /**Đếm danh sách chiến dịch sale-theo dự án */
    countCampaignSale: "app/campaign_sale/countCampaignSale",
    /**Chi tiết chiến dịch-sale */
    getListBuilding: "app/product/getListBuilding",
    getListProduct: "app/product/getListProduct",
    getDetailProduct: "app/product/getDetailProduct",
    getDetailCampaignSale: "app/campaign_sale/getDetailCampaignSale",
    addCampaignSale: "app/campaign_sale/addCampaignSale",
    updateCampaignSale: "app/campaign_sale/updateCampaignSale",
    getListApartment: 'app/product/getListApartment'




  },
  Transaction: {
    addLookApartment: "",
    addBookApartment: 'app/bill/themHopDongTuVan',
    getListLookBookApart: "app/bill/getListBill",
    getListSalePolicy: 'app/sale_policy/getListSalePolicy',
    getDetailSalePolicy: '/app/sale_policy/getDetailSalePolicy',
    countSalePolicy: 'app/sale_policy/countSalePolicy',
    //
    addPaymentHistory: 'app/payment_history/addPaymentHistory',
    getDetailBill: 'app/bill/getDetailBill',
    xacNhanHopDongTuVan: 'app/bill/xacNhanHopDongTuVan'
  },
  Booking: {
    getListCartV3: "app/cart/getListCartV3",
    getDetailCart: "app/cart/getDetailCart",
  },
  News: {
    getListNews: "app/news/getListNews",
    countNews: "app/news/countNews",
    getDetailNews: "app/news/getDetailNews",
    getListComment: "app/comment/getListComment",
    addComment: "app/comment/addComment",
    deleteComment: "app/comment/deleteComment",
    addVote: "app/vote/addVote",
    updateVote: "app/vote/updateVote",
    deleteVote: "app/vote/deleteVote",
  }
};
