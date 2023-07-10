// export interface Dictionary<T> {
//   [key: string]: T
// }
// export interface p_fc {
//   (name: string): string
// }
// const _fc: p_fc = (sad) => ''
// type Status = "success" | "error" | "pending";
// const getStatus2 = (): Status => "error"
//Partial<Type>//1 phần
// Required<Type>
//Readonly<Type>
//Record<Keys, Type> //value là 1 object
//Pick<Type, Keys>
//Omit<Type, Keys>
//Exclude<UnionType, ExcludedMembers>
//Extract<Type, Union>
//Parameters<Type>
//ReturnType<Type>
//============================================
//============================================
//============================================

import { FlatListProps } from "react-native";

interface ResultHook<T = any> {
  (...arg: T[]): any
}

interface ParametersHook<Item = any> {
  (
    data: Array<Item>,
    loading: boolean,
    onRefresh: () => void
  ): any
}
export type newHookArray<T> = Parameters<ParametersHook<T>>
export interface newHookObject<Item> {
  data: Array<Item>,
  loading: boolean,
  onRefresh: () => void
}
// const _array = (): NewUseArray<{ id: number }>
// let keys = ["id", "cb_id", "cb_status", "parent_id", "ward_id", "cb_code", "reference_code", "cb_title", "alias", "cb_description", "extra_ids", "updated_user_id", "investor_id", "ub_updated_time", "created_user_id", "ub_created_time", "cb_level", "last_sync_tvc", "type", "apartment_grid", "active_booking", "enable_list_price", "send_mail", "dxmb_project_id", "image", "images", "price_from", "price_to", "city_id", "district_id", "pj_description", "address", "stage", "hidden_cat", "order", "company_id", "staff_lock", "staff_assemble", "active_assemble", "total_progress", "type_project", "row_table_style", "lock", "assemble", "publication_time", "handover_documents", "created_at", "deleted_at", "updated_at", "name"] as const;
// type MappedType<T extends readonly string[]> = Record<T[number], any>;
// type _Item = MappedType<typeof keys>;
export type MappedItem<T extends readonly string[]> = Record<T[number], any>;
export type DefineItem<T> = { [key: string]: any, item: T }
export type DefineItem2<T, P extends any = undefined> = { [key: string]: any, item: T } & (P extends any ? {} : P);
export type DefineProps<T, T2 extends string> = { [key: string]: any } & { [K in T2]: T }
export type DefineItemFlatList<T> = { [key: string]: any, } & { index: number, item: T };
export type DefineData<T> = { [key: string]: any } & T;