import {StaticApi} from '@api/qsland';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {isArray} from 'underscore';
type props = {
  loading: boolean;
  time_request: any;
  time_expired: any;
  time_click: any;
  params: any;
  dataAll: any[];
  dataSale: any[];
  dataCompany: any[];
  paramsAll: any;
  paramsSale: any;
  paramsCompany: any;
  count: any;
  dataByMonth: any[];
  dataOverviewLead: any[];
  dataOverviewLeadSale: any[];
  dataOverviewLeadCompany: any[];
  dataOverviewManager: any[];
  dataOverviewManagerSale: any[];
  dataOverviewManagerCompany: any[];
  dataPermissions: any[];
};
const initialState: props = {
  loading: false,
  time_request: 0,
  time_expired: 10 * 1000,
  time_click: 1000,
  params: {},
  paramsAll: {},
  paramsSale: {},
  paramsCompany: {},
  dataAll: [],
  dataSale: [],
  dataCompany: [],
  count: {},
  dataByMonth: [],
  dataOverviewLead: [],
  dataOverviewLeadSale: [],
  dataOverviewLeadCompany: [],
  dataOverviewManager: [],
  dataOverviewManagerSale: [],
  dataOverviewManagerCompany: [],
  dataPermissions: [{
    id: null,
    scope_id: null,
    scope_type: '',
    staff_object_id: '',
  }],
};
const store = createSlice({
  name: 'StaticCusStatus',
  initialState,
  reducers: {
    refreshState(state) {
      state = {...initialState};
      return state;
    },
    resetTime(state) {
      return state;
    },
    updateSate(state, action) {
      state = {...state, ...action.payload};
      return state;
    },
    updateItem(state, action) {
      let {id, ...rest} = action.payload;
      let index = state.dataAll.findIndex(i => i.id == id);
      if (index !== undefined) {
        state.dataAll[index] = action.payload;
      }
      return state;
    },
    updateParams(state, action) {
      let params = action.payload ?? {};
      state.params = {...state.params, ...params};
      return state;
    },
    updateParamsSale(state, action) {
      let params = action.payload ?? {};
      state.params = {...state.params, ...params};
      return state;
    },
    updateParamsCompany(state, action) {
      let params = action.payload ?? {};
      state.params = {...state.params, ...params};
      return state;
    },
    updateParamsOverviewLead(state, action) {
      let params = action.payload ?? {};
      state.params = {...state.params, ...params};
      return state;
    },
    updateParamsOverviewLeadSale(state, action) {
      let params = action.payload ?? {};
      state.params = {...state.params, ...params};
      return state;
    },
    updateParamsOverviewLeadCompany(state, action) {
      let params = action.payload ?? {};
      state.params = {...state.params, ...params};
      return state;
    },
    updateParamsOverviewManager(state, action) {
      let params = action.payload ?? {};
      state.params = {...state.params, ...params};
      return state;
    },
    updateParamsOverviewManagerSale(state, action) {
      let params = action.payload ?? {};
      state.params = {...state.params, ...params};
      return state;
    },
    updateParamsOverviewManagerCompany(state, action) {
      let params = action.payload ?? {};
      state.params = {...state.params, ...params};
      return state;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getStaticCusStatus.pending, state => {
        return state;
      })
      .addCase(
        getStaticCusStatus.fulfilled,
        (state, action: {payload: {data: any; status: any}}) => {
          const {data, status} = action.payload;
          state.time_request = new Date().getTime();
          if (
            status === true &&
            JSON.stringify(state.dataAll) !== JSON.stringify(data)
          ) {
            if (isArray(state.dataAll)) {
              state.dataAll = data;
            }
          }
        },
      )
      .addCase(getSaleStaticCusStatus.pending, state => {
        return state;
      })
      .addCase(
        getSaleStaticCusStatus.fulfilled,
        (state, action: {payload: {data: any; status: any}}) => {
          const {data, status} = action.payload;
          state.time_request = new Date().getTime();
          if (
            status === true &&
            JSON.stringify(state.dataSale) !== JSON.stringify(data)
          ) {
            if (isArray(state.dataSale)) {
              state.dataSale = data;
            }
          }
        },
      )
      .addCase(getCompanyStaticCusStatus.pending, state => {
        return state;
      })
      .addCase(
        getCompanyStaticCusStatus.fulfilled,
        (state, action: {payload: {data: any; status: any}}) => {
          const {data, status} = action.payload;
          state.time_request = new Date().getTime();
          if (
            status === true &&
            JSON.stringify(state.dataCompany) !== JSON.stringify(data)
          ) {
            if (isArray(state.dataCompany)) {
              state.dataCompany = data;
            }
          }
        },
      )
      .addCase(countAllottedCustomersOfSale.pending, state => {
        return state;
      })
      .addCase(
        countAllottedCustomersOfSale.fulfilled,
        (state, action: {payload: {data: any; status: any}}) => {
          const {data, status} = action.payload;
          if (status) {
            state.count = data;
            return state;
          }
        },
      )
      .addCase(countCustomersAllocatedByMonth.pending, state => {
        return state;
      })
      .addCase(
        countCustomersAllocatedByMonth.fulfilled,
        (state, action: {payload: {data: any; status: any}}) => {
          const {data, status} = action.payload;
          state.time_request = new Date().getTime();
          if (
            status === true &&
            JSON.stringify(state.dataByMonth) !== JSON.stringify(data)
          ) {
            if (isArray(state.dataByMonth)) {
              state.dataByMonth = data;
            }
          }
        },
      )
      .addCase(countCustomerOverviewOfLead.pending, state => {
        return state;
      })
      .addCase(
        countCustomerOverviewOfLead.fulfilled,
        (state, action: {payload: {data: any; status: any}}) => {
          const {data, status} = action.payload;
          state.time_request = new Date().getTime();
          if (
            status === true &&
            JSON.stringify(state.dataOverviewLead) !== JSON.stringify(data)
          ) {
            if (isArray(state.dataOverviewLead)) {
              state.dataOverviewLead = data;
            }
          }
        },
      )
      .addCase(countCustomerOverviewOfLeadSale.pending, state => {
        return state;
      })
      .addCase(
        countCustomerOverviewOfLeadSale.fulfilled,
        (state, action: {payload: {data: any; status: any}}) => {
          const {data, status} = action.payload;
          state.time_request = new Date().getTime();
          if (
            status === true &&
            JSON.stringify(state.dataOverviewLeadSale) !== JSON.stringify(data)
          ) {
            if (isArray(state.dataOverviewLeadSale)) {
              state.dataOverviewLeadSale = data;
            }
          }
        },
      )
      .addCase(countCustomerOverviewOfLeadCompany.pending, state => {
        return state;
      })
      .addCase(
        countCustomerOverviewOfLeadCompany.fulfilled,
        (state, action: {payload: {data: any; status: any}}) => {
          const {data, status} = action.payload;
          state.time_request = new Date().getTime();
          if (
            status === true &&
            JSON.stringify(state.dataOverviewLeadCompany) !==
              JSON.stringify(data)
          ) {
            if (isArray(state.dataOverviewLeadCompany)) {
              state.dataOverviewLeadCompany = data;
            }
          }
        },
      )
      .addCase(countCustomerOverviewOfManager.pending, state => {
        return state;
      })
      .addCase(
        countCustomerOverviewOfManager.fulfilled,
        (state, action: {payload: {data: any; status: any}}) => {
          const {data, status} = action.payload;
          state.time_request = new Date().getTime();
          if (
            status === true &&
            JSON.stringify(state.dataOverviewManager) !== JSON.stringify(data)
          ) {
            if (isArray(state.dataOverviewManager)) {
              state.dataOverviewManager = data;
            }
          }
        },
      )
      .addCase(countCustomerOverviewOfManagerSale.pending, state => {
        return state;
      })
      .addCase(
        countCustomerOverviewOfManagerSale.fulfilled,
        (state, action: {payload: {data: any; status: any}}) => {
          const {data, status} = action.payload;
          state.time_request = new Date().getTime();
          if (
            status === true &&
            JSON.stringify(state.dataOverviewManagerSale) !==
              JSON.stringify(data)
          ) {
            if (isArray(state.dataOverviewManagerSale)) {
              state.dataOverviewManagerSale = data;
            }
          }
        },
      )
      .addCase(countCustomerOverviewOfManagerCompany.pending, state => {
        return state;
      })
      .addCase(
        countCustomerOverviewOfManagerCompany.fulfilled,
        (state, action: {payload: {data: any; status: any}}) => {
          const {data, status} = action.payload;
          state.time_request = new Date().getTime();
          if (
            status === true &&
            JSON.stringify(state.dataOverviewManagerCompany) !==
              JSON.stringify(data)
          ) {
            if (isArray(state.dataOverviewManagerCompany)) {
              state.dataOverviewManagerCompany = data;
            }
          }
        },
      )
      .addCase(getListPermission.pending, state => {
        return state;
      })
      .addCase(
        getListPermission.fulfilled,
        (state, action: {payload: {data: any; status: any}}) => {
          const {data, status} = action.payload;
          state.time_request = new Date().getTime();
          if (
            status === true &&
            JSON.stringify(state.dataPermissions) !== JSON.stringify(data)
          ) {
            if (isArray(state.dataPermissions)) {
              state.dataPermissions = data;
            }
          }
        },
      );
  },
});

const getStaticCusStatus = createAsyncThunk(
  `getStaticCusStatus`,
  async ({...rest}: any) => {
    return StaticApi.getStaticCusStatus({...rest});
  },
);
const getSaleStaticCusStatus = createAsyncThunk(
  `getSaleStaticCusStatus`,
  async ({...rest}: any) => {
    return StaticApi.getStaticCusStatus({...rest});
  },
);
const getCompanyStaticCusStatus = createAsyncThunk(
  `getCompanyStaticCusStatus`,
  async ({...rest}: any) => {
    return StaticApi.getStaticCusStatus({...rest});
  },
);
const countAllottedCustomersOfSale = createAsyncThunk(
  `countAllottedCustomersOfSale`,
  async ({...rest}: any) => {
    return StaticApi.countAllottedCustomersOfSale({...rest});
  },
);
const countCustomersAllocatedByMonth = createAsyncThunk(
  `countCustomersAllocatedByMonth`,
  async ({...rest}: any) => {
    return StaticApi.countCustomersAllocatedByMonth({...rest});
  },
);
const countCustomerOverviewOfLead = createAsyncThunk(
  `countCustomerOverviewOfLead`,
  async ({...rest}: any) => {
    return StaticApi.countCustomerOverviewOfLead({...rest});
  },
);
const countCustomerOverviewOfLeadSale = createAsyncThunk(
  `countCustomerOverviewOfLeadSale`,
  async ({...rest}: any) => {
    return StaticApi.countCustomerOverviewOfLead({...rest});
  },
);
const countCustomerOverviewOfLeadCompany = createAsyncThunk(
  `countCustomerOverviewOfLeadCompany`,
  async ({...rest}: any) => {
    return StaticApi.countCustomerOverviewOfLead({...rest});
  },
);
const countCustomerOverviewOfManager = createAsyncThunk(
  `countCustomerOverviewOfManager`,
  async ({...rest}: any) => {
    return StaticApi.countCustomerOverviewOfManager({...rest});
  },
);
const countCustomerOverviewOfManagerSale = createAsyncThunk(
  `countCustomerOverviewOfManagerSale`,
  async ({...rest}: any) => {
    return StaticApi.countCustomerOverviewOfManager({...rest});
  },
);
const countCustomerOverviewOfManagerCompany = createAsyncThunk(
  `countCustomerOverviewOfManagerCompany`,
  async ({...rest}: any) => {
    return StaticApi.countCustomerOverviewOfManager({...rest});
  },
);
const getListPermission = createAsyncThunk(
  `getListPermission`,
  async ({...rest}: any) => {
    return StaticApi.getListPermission({...rest});
  },
);
export const stores = {
  reducer: store.reducer,
  ...store.actions,
  getStaticCusStatus,
  getSaleStaticCusStatus,
  getCompanyStaticCusStatus,
  countAllottedCustomersOfSale,
  countCustomersAllocatedByMonth,
  countCustomerOverviewOfLead,
  countCustomerOverviewOfLeadSale,
  countCustomerOverviewOfLeadCompany,
  countCustomerOverviewOfManager,
  countCustomerOverviewOfManagerSale,
  countCustomerOverviewOfManagerCompany,
  getListPermission,
};
