import { CustomerApi, DenyAdminApi } from '@api/qsland';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Log } from '@utils';
import { isEmpty } from 'underscore';

const initialState = {
  ListSource: {
    loading: false,
    time: 0,
    data: [],
  },
  ListGroup: {
    loading: false,
    time: 0,
    data: [],
  },
  ListCities: {
    loading: false,
    time: 0,
    data: [],
  },
  ListCampaign: {
    loading: false,
    time: 0,
    data: [],
  },
  ListExchange: {
    loading: false,
    time: 0,
    data: [],
  },
  ListStaff: {
    loading: false,
    time: 0,
    data: [],
  },
  ListCategories: {
    loading: false,
    time: 0,
    data: [],
  },
  ListBuilding: {
    loading: false,
    time: 0,
    data: [],
  },
  ListGroupSale: {
    loading: false,
    time: 0,
    data: [],
  },
};
const store = createSlice({
  name: 'StaticCustomer',
  initialState,
  reducers: {
    refreshState(state) {
      state = { ...initialState };
      return state;
    },
    resetTime(state) {
      return state;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getListGroup.pending, (state, action) => {
        state['ListGroup'].loading = true;
        return state;
      })
      .addCase(
        getListGroup.fulfilled,
        (state, action: { payload: { data: any; status: any } }) => {
          state['ListGroup'].loading = false;
          state['ListGroup'].time = Math.round(new Date().getTime() / 1000);
          if (action.payload.status === true)
            if (
              JSON.stringify(state['ListGroup'].data) !==
              JSON.stringify(action.payload.data)
            ) {
              state['ListGroup'].data = action.payload.data.filter(i => {
                if (typeof i?.status == 'number') return i.status != 0;
                return true;
              });
              return state;
            }
        },
      )
      /**
       *
       */
      .addCase(getListSource.pending, (state, action) => {
        state['ListSource'].loading = true;
        return state;
      })
      .addCase(getListSource.fulfilled, (state, action: any) => {
        state['ListSource'].loading = false;
        state['ListSource'].time = Math.round(new Date().getTime() / 1000);
        if (action.payload.status === true)
          if (
            JSON.stringify(state['ListSource'].data) !==
            JSON.stringify(action.payload.data)
          ) {
            state['ListSource'].data = action.payload.data.filter(i => {
              if (typeof i?.status == 'number') return i.status != 0;
              return true;
            });
            return state;
          }
      })
      /**
       *
       */
      .addCase(getListCities.pending, (state, action) => {
        state['ListCities'].loading = true;
        return state;
      })
      .addCase(getListCities.fulfilled, (state, action: any) => {
        state['ListCities'].loading = false;
        state['ListCities'].time = Math.round(new Date().getTime() / 1000);
        if (action.payload.status === true)
          if (
            JSON.stringify(state['ListCities'].data) !==
            JSON.stringify(action.payload.data)
          ) {
            state['ListCities'].data = action.payload.data;
            return state;
          }
      })
      /**
       *
       */
      .addCase(getListCampaign.pending, (state, action) => {
        state['ListCampaign'].loading = true;
        return state;
      })
      .addCase(getListCampaign.fulfilled, (state, action: any) => {
        state['ListCampaign'].loading = false;
        state['ListCampaign'].time = Math.round(new Date().getTime() / 1000);
        if (action.payload.status === true)
          if (
            JSON.stringify(state['ListCampaign'].data) !==
            JSON.stringify(action.payload.data)
          ) {
            state['ListCampaign'].data = action.payload.data;
            return state;
          }
      })
      .addCase(getListGroupSale.pending, (state, action) => {
        state['ListGroupSale'].loading = true;
        return state;
      })
      .addCase(getListGroupSale.fulfilled, (state, action: any) => {
        state['ListGroupSale'].loading = false;
        state['ListGroupSale'].time = Math.round(new Date().getTime() / 1000);
        if (action.payload.status === true)
          if (
            JSON.stringify(state['ListGroupSale'].data) !==
            JSON.stringify(action.payload.data)
          ) {
            state['ListGroupSale'].data = action.payload.data;
            return state;
          }
      })
      /**
       *
       */
      .addCase(getListStaff.pending, (state, action) => {
        state['ListStaff'].loading = true;
        return state;
      })
      .addCase(getListStaff.fulfilled, (state, action: any) => {
        state['ListStaff'].loading = false;
        state['ListStaff'].time = Math.round(new Date().getTime() / 1000);
        if (action.payload.status === true)
          if (
            JSON.stringify(state['ListStaff'].data) !==
            JSON.stringify(action.payload.data)
          ) {
            state['ListStaff'].data = action.payload.data;
            return state;
          }
      })
      /**
       *
       */
      .addCase(getListExchange.pending, (state, action) => {
        state['ListExchange'].loading = true;
        return state;
      })
      .addCase(getListExchange.fulfilled, (state, action: any) => {
        state['ListExchange'].loading = false;
        state['ListExchange'].time = Math.round(new Date().getTime() / 1000);
        if (action.payload.status === true)
          if (
            JSON.stringify(state['ListExchange'].data) !==
            JSON.stringify(action.payload.data)
          ) {
            state['ListExchange'].data = action.payload.data;
            return state;
          }
      })
      /**
       *
       */
      .addCase(getListCategories.pending, (state, action) => {
        state['ListCategories'].loading = true;
        return state;
      })
      .addCase(getListCategories.fulfilled, (state, action: any) => {
        state['ListCategories'].loading = false;
        state['ListCategories'].time = Math.round(new Date().getTime() / 1000);
        if (action.payload.status === true)
          if (
            JSON.stringify(state['ListCategories'].data) !==
            JSON.stringify(action.payload.data)
          ) {
            state['ListCategories'].data = action.payload.data;
            return state;
          }
      })
      /**
       *
       */
      .addCase(getListBuilding.pending, (state, action) => {
        state['ListBuilding'].loading = true;
        return state;
      })
      .addCase(getListBuilding.fulfilled, (state, action: any) => {
        state['ListBuilding'].loading = false;
        state['ListBuilding'].time = Math.round(new Date().getTime() / 1000);
        if (action.payload.status === true)
          if (
            JSON.stringify(state['ListBuilding'].data) !==
            JSON.stringify(action.payload.data)
          ) {
            state['ListBuilding'].data = action.payload.data;
            return state;
          }
      });
  },
});

const getListSource = createAsyncThunk(`getListSource`, async () => {
  return await CustomerApi.getListSource({});
});
const getListGroup = createAsyncThunk(`getListGroup`, async () => {
  return await CustomerApi.getListGroupCustomer({});
});
const getListCities = createAsyncThunk(`getListCities`, async () => {
  return await CustomerApi.getListCities({});
});
const getListCampaign = createAsyncThunk(`getListCampaign`, async () => {
  return await CustomerApi.getListCampaign({});
});
const getListGroupSale = createAsyncThunk(`getListGroupSale`, async () => {
  return await CustomerApi.getListGroupSale({});
});
const getListStaff = createAsyncThunk(`getListStaff`, async () => {
  return await DenyAdminApi.getListStaff({});
});
const getListExchange = createAsyncThunk(`getListExchange`, async () => {
  return await DenyAdminApi.getListExchange({}); //dự án
});
const getListCategories = createAsyncThunk(`getListCategories`, async () => {
  return await DenyAdminApi.getListCategories({}); //dự án
});
const getListBuilding = createAsyncThunk(`getListBuilding`, async () => {
  return await DenyAdminApi.getListBuilding({}); //dự án
});

export const stores = {
  reducer: store.reducer,
  ...store.actions,
  getListSource,
  getListGroup,
  getListCities,
  getListCampaign,
  getListStaff,
  getListExchange,
  getListCategories,
  getListBuilding,
  getListGroupSale,
};
