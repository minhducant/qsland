
import { createArray2, randomMoney } from '@utils/array';
import { formatPrice, formatPriceB } from '@utils/format';
import { Log } from '@utils/Log';
import { isArray, isNumber } from 'underscore';
export const MAU_SAN_PHAM = {
    trong: "#FFFFFF",
    lock: "#FEA837",
    dat_coc: '#FF0035',
    hdmb: "#8B939C",
    can: 'gray',
    tang: '#ddd',
    khong: "#ddd"

}

export const DATA_NOTE =
    [
        { name: "Trống", color: MAU_SAN_PHAM.trong },
        { name: "Lock", color: MAU_SAN_PHAM.lock },
        { name: "Đặt cọc", color: MAU_SAN_PHAM.dat_coc },
        { name: "HĐMB", color: MAU_SAN_PHAM.hdmb },
    ]
//p_status
export const PRODUCTS_STATUS = {
    CBA: 'lock',
    MBA: 'trong',
    CHLOCK: 'lock',
    LOCKED: 'lock',
    ADD_CUSTOMER: 'lock',
    CUSTOMER_CONFIRM: 'lock',
    DCH: 'lock',
    CDDCO: 'lock',
    DCO: 'dat_coc',
    HDO: 'hdmb',
    HUY: 'lock',
    PAYMENT: 'lock',

}
export const formatTable = (cans: any[], floors: any[], data: any[]) => {
    let table = []
    if (isArray(cans) && isArray(floors) && isArray(data))
        for (let i = 0; i < floors.length; i++) {
            for (let j = 0; j < cans.length; j++) {

                let item: any = { type: 2 }
                let can = cans[j]
                let floor = floors[i]
                item.name = floor?.id + '-' + can.id
                let _find_item = data.find(i => i['apartment_number'] == can.id && i['floor'] == floor.id)

                if (_find_item) {
                    item.id = _find_item.id
                    item.name = _find_item?.cdt_code
                    item.info = formatPriceB(_find_item?.gia_niem_yet, '')
                    item.background = MAU_SAN_PHAM[PRODUCTS_STATUS[_find_item?.p_status]]//STATUS_COLOR[_find_item?.status]
                    item.color = 'black'
                }
                else {
                    item.info = null
                    item.background = MAU_SAN_PHAM.khong
                    item.color = 'black'
                }
                table.push(item)

            }
        }
    return table
}
/**style */
export const formatFloorCan = (data: any[], type: number) => {
    if (data.length == 0) return []
    const style = {
        can: { color: '#fff', background: MAU_SAN_PHAM.can },
        tang: { color: '#000', background: MAU_SAN_PHAM.tang }
    }
    if (type == 0) {
        return data.map(i => ({ ...i, ...style.can }))
    }
    if (type == 1) {
        return [{ name: 'Căn' }, ...data].map((i, j) => ({ ...i, ...(j == 0 ? style.can : style.tang) }))
    }
    return []
}
export const getAllFloors = (list: any[]) => {

    let data: any[] = []
    if (isArray(list)) {
        list.forEach(i => {
            if (i?.floor && isNumber(i?.floor)) {
                if (data.find(j => j == i?.floor) == undefined)
                    data.push(i?.floor)
            }
        })
    }
    data.sort((a, b) => a - b)
    return data.map(id => ({
        id: id,
        name: 'Tầng' + id.toString(),//.padStart(2, '0'),
        type: 0
    }))
}
export const getAllCans = (list: any[]) => {
    let data: any[] = []
    if (isArray(list)) {
        list.forEach(i => {
            if (i?.apartment_number && isNumber(i?.apartment_number)) {
                if (data.find(j => j == i?.apartment_number) == undefined)
                    data.push(i?.apartment_number)
            }
        })
    }


    data.sort((a, b) => a - b)
    return data.map(id => ({
        id: id,
        name: 'C' + id.toString(),//.padStart(2, '0'),
        type: 0
    }))
}
export const getAllCans2 = (list: any[]) => {
    let max = 0
    if (isArray(list)) {
        list.forEach(i => {
            if (i?.apartment_number && isNumber(i?.apartment_number)) {
                if (i?.apartment_number > max) max = i.apartment_number
            }
        })
    }
    if (max == 0) return []
    let res = [...new Array(max)].map((item, index) => ({
        id: index + 1,
        name: 'Căn ' + (index + 1).toString().padStart(2, '0'),
        type: 0
    }))
    return [{ id: -1, name: 'Căn', type: 0 }, ...res]
}

