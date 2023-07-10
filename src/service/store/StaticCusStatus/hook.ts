import { useDispatch, useSelector } from 'react-redux';
import { stores } from './store';
import { useEffect, useRef } from 'react';
import { useStoreApp } from '../index';
import moment from 'moment';
import format from 'pretty-format';
import { AppDate } from '@utils/date';
import { Log } from '@utils/Log';
export const useStaticCusStatus = () => {
  const { dataAll, loading, paramsAll } = useStoreApp(
    state => state.StaticCusStatus,
  );
  // const userData = useStoreApp(state => state.UserData)
  const dispatch = useDispatch();
  const paramsRef = useRef({
    from: moment().startOf('month').format('YYYY-MM-DD 00:00:00'),
    to: moment().add(1, 'month').startOf('month').format('YYYY-MM-DD 00:00:00'),
    ...paramsAll,
  });
  const onRefresh = async () => {
    dispatch(stores.updateSate({ loading: true }));
    dispatch(stores.getStaticCusStatus({ ...paramsRef.current }));
    dispatch(stores.updateSate({ loading: false }));
  };
  const updateParamsRef = (e = {}) => {
    paramsRef.current = { ...paramsRef.current, ...e };
    dispatch(stores.updateParams({ ...paramsRef.current, ...e }));
  };
  useEffect(() => {
    onRefresh();
  }, []);
  return {
    dataAll,
    loading,
    paramsAll,
    updateParamsRef,
    onRefresh,
  };
};

export const useSaleStaticCusStatus = () => {
  const { dataSale, loadingSale, paramsSale } = useStoreApp(
    state => state.StaticCusStatus,
  );
  // const userData = useStoreApp(state => state.UserData)
  const dispatch = useDispatch();
  const paramsRef = useRef({
    from: moment().startOf('month').format('YYYY-MM-DD 00:00:00'),
    to: moment().endOf('month').format('YYYY-MM-DD 00:00:00'),
    create_type: 2,
    ...paramsSale,
  });
  const onRefreshSale = async () => {
    dispatch(stores.updateSate({ loading: true }));
    dispatch(stores.getSaleStaticCusStatus({ ...paramsRef.current }));
    dispatch(stores.updateSate({ loading: false }));
  };
  const updateParamsRefSale = (e = {}) => {
    paramsRef.current = { ...paramsRef.current, ...e };
    dispatch(stores.updateParamsSale({ ...paramsRef.current, ...e }));
  };
  useEffect(() => {
    onRefreshSale();
  }, []);
  return {
    dataSale,
    loadingSale,
    paramsSale,
    updateParamsRefSale,
    onRefreshSale,
  };
};

export const useCompanyStaticCusStatus = () => {
  const { dataCompany, loadingCompany, paramsCompany } = useStoreApp(
    state => state.StaticCusStatus,
  );
  // const userData = useStoreApp(state => state.UserData)
  const dispatch = useDispatch();
  const paramsRef = useRef({
    from: moment().startOf('month').format('YYYY-MM-DD 00:00:00'),
    to: moment().endOf('month').format('YYYY-MM-DD 00:00:00'),
    create_type: 1,
    ...paramsCompany,
  });
  const onRefreshCompany = async () => {
    dispatch(stores.updateSate({ loading: true }));
    dispatch(stores.getCompanyStaticCusStatus({ ...paramsRef.current }));
    dispatch(stores.updateSate({ loading: false }));
  };
  const updateParamsRefCompany = (e = {}) => {
    paramsRef.current = { ...paramsRef.current, ...e };
    dispatch(stores.updateParamsCompany({ ...paramsRef.current, ...e }));
  };
  useEffect(() => {
    onRefreshCompany();
  }, []);
  return {
    dataCompany,
    loadingCompany,
    paramsCompany,
    updateParamsRefCompany,
    onRefreshCompany,
  };
};

export const useCountAllottedCustomersOfSale = () => {
  const { count } = useStoreApp(state => state.StaticCusStatus);
  const dispatch = useDispatch();
  const onRefresh = async () => {
    dispatch(stores.updateSate({ loading: true }));
    dispatch(stores.countAllottedCustomersOfSale({}));
    dispatch(stores.updateSate({ loading: false }));
  };
  useEffect(() => {
    onRefresh();
  }, []);
  return {
    count,
    onRefresh,
  };
};
const TUAN_6 = [
  {
    "count": 0,
    "week_number": 1,
  },
  {
    "count": 1,
    "week_number": 2,
  },
  {
    "count": 2,
    "week_number": 3,
  },
  // {
  //   "count": 3,
  //   "week_number": 4,
  // },
  // {
  //   "count": 4,
  //   "week_number": 5,
  // },
  // {
  //   "count": 5,
  //   "week_number": 6,
  // },
  // {
  //   "count": 3,
  //   "week_number": 7,
  // },
  // {
  //   "count": 1,
  //   "week_number": 8,
  // },
]
export const useCountCustomersAllocatedByMonth = () => {
  const { dataByMonth, loading, params } = useStoreApp(
    state => state.StaticCusStatus,
  );
  Log.e1('useCountCustomersAllocatedByMonth', params)
  const dispatch = useDispatch();
  const paramsRef = useRef({
    month: moment().month() + 1,
    year: moment().year(),
    ...params,
  });
  const onRefresh = async () => {
    dispatch(stores.updateSate({ loading: true }));
    dispatch(stores.countCustomersAllocatedByMonth({ ...paramsRef.current }));
    dispatch(stores.updateParams({ ...paramsRef.current, }));
    dispatch(stores.updateSate({ loading: false }));
  };
  const updateParamsRef = (e = {}) => {
    paramsRef.current = { ...paramsRef.current, ...e };
    dispatch(stores.updateParams({ ...paramsRef.current, ...e }));
  };
  useEffect(() => {
    onRefresh();
  }, []);
  return {
    dataByMonth,
    loading,
    params,
    updateParamsRef,
    onRefresh,
  };
};

export const useCountCustomerOverviewOfLead = () => {
  const { dataOverviewLead, loading, paramsOverview } = useStoreApp(
    state => state.StaticCusStatus,
  );
  const dispatch = useDispatch();
  const paramsRef = useRef({
    from: moment().startOf('month').format('YYYY-MM-DD 00:00:00'),
    to: moment().add(1, 'month').startOf('month').format('YYYY-MM-DD 00:00:00'),
    ...paramsOverview,
  });
  const onRefresh = async () => {
    dispatch(stores.updateSate({ loading: true }));
    dispatch(stores.countCustomerOverviewOfLead({ ...paramsRef.current }));
    dispatch(stores.updateSate({ loading: false }));
  };
  const updateParamsRef = (e = {}) => {
    paramsRef.current = { ...paramsRef.current, ...e };
    dispatch(stores.updateParamsOverviewLead({ ...paramsRef.current, ...e }));
  };
  useEffect(() => {
    onRefresh();
  }, []);
  return {
    dataOverviewLead,
    loading,
    paramsOverview,
    updateParamsRef,
    onRefresh,
  };
};

export const useCountCustomerOverviewOfLeadSale = () => {
  const { dataOverviewLeadSale, loading, paramsOverviewSale } = useStoreApp(
    state => state.StaticCusStatus,
  );
  const dispatch = useDispatch();
  const paramsRef = useRef({
    from: moment().startOf('month').format('YYYY-MM-DD 00:00:00'),
    to: moment().add(1, 'month').startOf('month').format('YYYY-MM-DD 00:00:00'),
    create_type: 2,
    ...paramsOverviewSale,
  });
  const onRefreshLeadSale = async () => {
    dispatch(stores.updateSate({ loading: true }));
    dispatch(stores.countCustomerOverviewOfLeadSale({ ...paramsRef.current }));
    dispatch(stores.updateSate({ loading: false }));
  };
  const updateParamsLeadSaleRef = (e = {}) => {
    paramsRef.current = { ...paramsRef.current, ...e };
    dispatch(stores.updateParamsOverviewLeadSale({ ...paramsRef.current, ...e }));
  };
  useEffect(() => {
    onRefreshLeadSale();
  }, []);
  return {
    dataOverviewLeadSale,
    loading,
    paramsOverviewSale,
    updateParamsLeadSaleRef,
    onRefreshLeadSale,
  };
};

export const useCountCustomerOverviewOfLeadCompany = () => {
  const { dataOverviewLeadCompany, loading, paramsOverviewCompany } = useStoreApp(
    state => state.StaticCusStatus,
  );
  const dispatch = useDispatch();
  const paramsRef = useRef({
    from: moment().startOf('month').format('YYYY-MM-DD 00:00:00'),
    to: moment().add(1, 'month').startOf('month').format('YYYY-MM-DD 00:00:00'),
    create_type: 1,
    ...paramsOverviewCompany,
  });
  const onRefreshLeadCompany = async () => {
    dispatch(stores.updateSate({ loading: true }));
    dispatch(stores.countCustomerOverviewOfLeadCompany({ ...paramsRef.current }));
    dispatch(stores.updateSate({ loading: false }));
  };
  const updateParamsLeadCompanyRef = (e = {}) => {
    paramsRef.current = { ...paramsRef.current, ...e };
    dispatch(
      stores.updateParamsOverviewLeadCompany({ ...paramsRef.current, ...e }),
    );
  };
  useEffect(() => {
    onRefreshLeadCompany();
  }, []);
  return {
    dataOverviewLeadCompany,
    loading,
    paramsOverviewCompany,
    updateParamsLeadCompanyRef,
    onRefreshLeadCompany,
  };
};

export const useCountCustomerOverviewOfManager = () => {
  const { dataOverviewManager, loading, paramsOverview } = useStoreApp(
    state => state.StaticCusStatus,
  );
  const dispatch = useDispatch();
  const paramsRef = useRef({
    from: moment().startOf('month').format('YYYY-MM-DD 00:00:00'),
    to: moment().add(1, 'month').startOf('month').format('YYYY-MM-DD 00:00:00'),
    ...paramsOverview,
  });
  const onRefresh = async () => {
    dispatch(stores.updateSate({ loading: true }));
    dispatch(stores.countCustomerOverviewOfManager({ ...paramsRef.current }));
    dispatch(stores.updateSate({ loading: false }));
  };
  const updateParamsRef = (e = {}) => {
    Log.d('updateParamsRef222', e);
    paramsRef.current = { ...paramsRef.current, ...e };
    dispatch(stores.updateParamsOverviewManager({ ...paramsRef.current, ...e }));
  };

  useEffect(() => {
    onRefresh();
  }, []);
  return {
    dataOverviewManager,
    loading,
    paramsOverview,
    updateParamsRef,
    onRefresh,
  };
};

export const useCountCustomerOverviewOfManagerSale = (create_type = 2) => {
  const { dataOverviewManagerSale, loading, paramsOverviewSale } = useStoreApp(
    state => state.StaticCusStatus,
  );
  const dispatch = useDispatch();
  const paramsRef = useRef({
    from: moment().startOf('month').format('YYYY-MM-DD 00:00:00'),
    to: moment().add(1, 'month').startOf('month').format('YYYY-MM-DD 00:00:00'),
    create_type,
    ...paramsOverviewSale,
  });
  const onRefreshManagerSale = async () => {
    dispatch(stores.updateSate({ loading: true }));
    dispatch(stores.countCustomerOverviewOfManagerSale({ ...paramsRef.current }));
    dispatch(stores.updateSate({ loading: false }));
  };
  const updateParamsManagerSaleRef = (e = {}) => {
    paramsRef.current = { ...paramsRef.current, ...e };
    dispatch(
      stores.updateParamsOverviewManagerSale({ ...paramsRef.current, ...e }),
    );
  };
  useEffect(() => {
    onRefreshManagerSale();
  }, []);
  return {
    dataOverviewManagerSale,
    loading,
    paramsOverviewSale,
    updateParamsManagerSaleRef,
    onRefreshManagerSale,
  };
};

export const useCountCustomerOverviewOfManagerCompany = () => {
  const { dataOverviewManagerCompany, loading, paramsOverviewCompany } =
    useStoreApp(state => state.StaticCusStatus);
  const dispatch = useDispatch();
  const paramsRef = useRef({
    from: moment().startOf('month').format('YYYY-MM-DD 00:00:00'),
    to: moment().add(1, 'month').startOf('month').format('YYYY-MM-DD 00:00:00'),
    create_type: 1,
    ...paramsOverviewCompany,
  });
  const onRefreshManagerCompany = async () => {
    dispatch(stores.updateSate({ loading: true }));
    dispatch(
      stores.countCustomerOverviewOfManagerCompany({ ...paramsRef.current }),
    );
    dispatch(stores.updateSate({ loading: false }));
  };
  const updateParamsLeadCompanyRef = (e = {}) => {
    paramsRef.current = { ...paramsRef.current, ...e };
    dispatch(
      stores.updateParamsOverviewManagerCompany({ ...paramsRef.current, ...e }),
    );
  };
  useEffect(() => {
    onRefreshManagerCompany();
  }, []);
  return {
    dataOverviewManagerCompany,
    loading,
    paramsOverviewCompany,
    updateParamsLeadCompanyRef,
    onRefreshManagerCompany,
  };
};

export const useGetListPermission = () => {
  const { dataPermissions } = useStoreApp(state => state.StaticCusStatus);
  const dispatch = useDispatch();
  const onRefresh = async () => {
    dispatch(stores.updateSate({ loading: true }));
    dispatch(stores.getListPermission({}));
    dispatch(stores.updateSate({ loading: false }));
  };
  useEffect(() => {
    onRefresh();
  }, []);
  return {
    dataPermissions,
    onRefresh,
  };
};

const convertChart = () => {
  return [];
};
