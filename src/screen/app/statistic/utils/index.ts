import {AppLang} from '@assets/langs';

import store from '@service/store';
import {STATUS_INTERACTIVE} from '@screen/app/ManageCustomer/components/@Status';

export function getTotal(listOverview: any[], property?: string): number {
  return listOverview?.reduce((sum, item) => {
    if (property && item.hasOwnProperty(property)) {
      return sum + item[property];
    } else {
      return sum + item.total;
    }
  }, 0);
}

// export function formatOverviewList(data: any[], listStaff?: any[]): any[] {
//   return data?.map((item, index) => {
//     const formattedItem: any = {
//       user_id: item.user_id,
//       total: item.total || 0,
//       total_potential: item.total_potential || 0,
//       color: 'gray',
//       full_name: listStaff?.filter(function (staff: any) {
//         return staff.user_id === item.user_id;
//       })[0]?.full_name,
//     };
//     return formattedItem;
//   });
// }

export function formatFilterArray(inputArray: any[]) {
  const newArray = [
    {
      full_name: AppLang('tat_ca_sale'),
      id: null,
    },
    ...inputArray.map(item => ({
      full_name: item.full_name,
      id: item.user_id,
    })),
  ];
  return newArray;
}

export function checkPermission(dataPermissions: any[] = [], permission: any) {
  if (dataPermissions?.length < 1) {
    return 'chua_co_danh_sach';
  }
  const permissions = dataPermissions?.map(item => item.staff_object_id);
  return permissions?.includes(permission) ? 'co_quyen' : 'khong_quyen';
}

export function formatOverviewList(data: any[], ListGroupSale?: any[]): any[] {
  return data?.map((item, index) => {
    let res: any = {
      id:
        item.group_sale_id ||
        item.user_id ||
        item.user_id_sale ||
        item.exchange_id,
      total: item.total || 0,
      total_potential: item.total_potential || 0,
      color: '#019689',
    };
    let type = item.group_sale_id
      ? 1
      : item.user_id
      ? 2
      : item.user_id_sale
      ? 3
      : 4;
    if (type == 1) {
      res.name = store
        .getState()
        .StaticCustomer.ListGroupSale.data.find(
          (staff: any) => staff.id === item.group_sale_id,
        )?.name;
    } else if (type == 2) {
      res.name = store
        .getState()
        .StaticCustomer.ListStaff.data.find(
          (staff: any) => staff.user_id === item.user_id,
        )?.full_name;
    } else if (type == 3) {
      res.name = store
        .getState()
        .StaticCustomer.ListStaff.data.find(
          (staff: any) => staff.user_id === item.user_id_sale,
        )?.full_name;
    } else {
      res.name = store
        .getState()
        .StaticCustomer.ListExchange.data.find(
          (staff: any) => staff.id === item.exchange_id,
        )?.name;
    }
    return res;
  });
}
