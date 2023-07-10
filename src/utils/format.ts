export function formatSizeUnits(bytes: any) {
  if (bytes >= 1073741824) {
    bytes = (bytes / 1073741824).toFixed(2) + ' GB'
  } else if (bytes >= 1048576) {
    bytes = (bytes / 1048576).toFixed(2) + ' MB'
  } else if (bytes >= 1024) {
    bytes = (bytes / 1024).toFixed(2) + ' KB'
  } else if (bytes > 1) {
    bytes = bytes + ' bytes'
  } else if (bytes == 1) {
    bytes = bytes + ' byte'
  } else {
    bytes = '0 bytes'
  }
  return bytes
}

import moment from 'moment'
import { AppColor } from '@assets/colors'
import { isArray, isEmpty, isObject, isString } from 'underscore'
import { Log } from './LogColor'
import { AppLang, } from '@assets/langs'
import { getUrlExtension, getUrlName } from '@components/Attach/utils'
//
export const fmDate = (date: string) => {
  // console.log(, date)
  ////
  // console.log('date2', n//ew Date().getTime())
  // console.log('date3', new Date(date).getTime())
  let result = ''
  let tmp = moment(date).format('DD/MM/YYYY')
  if (tmp) {
    let count = get_day_of_time(new Date(), new Date(date))
    // console.log('count', count, typeof count, Math.abs(count))
    if (count) {
      if (count > 5) return tmp
      if (count < 0) return AppLang('da_qua_han')
      if (Math.abs(count) === 0) return AppLang('hom_nay')
      else return `${AppLang('con_lai')} ${count} ${AppLang('ngay')}`
    }
  }
  return result
}
/**
 *
 * @param time
 * @returns 10 phút trước/ 4 giây trước
 * Quá 3 ngày sẽ hiện thời gian
 */
export const fmTimeNotify = (time: string) => {
  // console.log('1', 'fmTimeNotify', new Date(time))
  if (isEmpty(time)) return
  if (isString(time)) {
    let dateCurr = new Date()
    let datePush = new Date(time)
    let mCurr = dateCurr.getTime()
    let mPush = datePush.getTime()
    let cc = mCurr - mPush

    // console.log('so ngay', cc / (24 * 60 * 60 * 1000))
    // console.log('so h', cc / (60 * 60 * 1000))
    // console.log('so p', cc / (60 * 1000))
    // console.log('so s', cc / 1000)
    if (cc / (24 * 60 * 60 * 1000) > 1) {
      if (cc / (24 * 60 * 60 * 1000) < 4)
        return `${Math.ceil(cc / (24 * 60 * 60 * 1000))} ngày`
      return moment(mPush).format('DD-MM-YYYY')
    } else if (cc / (60 * 60 * 1000) > 1) {
      return `${Math.ceil(cc / (60 * 60 * 1000))} giờ`
    } else if (cc / (60 * 1000) > 1) {
      return `${Math.ceil(cc / (60 * 1000))} phút`
    } else if (cc / 1000 > 1) {
      return `${Math.ceil(cc / 1000)} giây`
    } else if (cc / 1000 > 0) return AppLang('vua_xong')
    //thong bao k co push tuong lai
    return moment(datePush).format('DD-MM-YYYY')
  }
  return ' '
}
export const timeAgo = (date: any) => {
  return fmTimeNotify(moment(date).format('YYYY/MM/DD HH:mm:ss'))
}
export const fmDateEvent = (start_at: any, end_at: any) => {
  if (isString(start_at) && isString(end_at)) {
    let today = new Date()
    let timeStart = new Date(start_at)
    let timeEnd = new Date(end_at)
    // Log.e('fmDateEvent')

    let mToday = today.getTime()
    let mTimeStart = timeStart.getTime()
    let mTimeEnd = timeEnd.getTime()
    let cc = mTimeStart - mToday
    /////////////////
    // console.log('so ngay', cc / (24 * 60 * 60 * 1000))
    // console.log('so h', cc / (60 * 60 * 1000))
    // console.log('so p', cc / (60 * 1000))
    // console.log('so s', cc / 1000)

    if (cc / (24 * 60 * 60 * 1000) > 1) {
      if (cc / (24 * 60 * 60 * 1000) < 10)
        //4+1 so ngay
        return `${Math.ceil(cc / (24 * 60 * 60 * 1000))} ngày nữa`
      return moment(mTimeStart).format('DD-MM-YYYY')
    } else if (cc / (60 * 60 * 1000) > 1) {
      return `${Math.ceil(cc / (60 * 60 * 1000))} giờ nữa`
    } else if (cc / (60 * 1000) > 1) {
      return `${Math.ceil(cc / (60 * 1000))} phút nữa`
    } else if (cc / 1000 > 1) {
      return `${Math.ceil(cc / 1000)} giây nữa`
    }

    //su kien da troi qua
    cc = mTimeEnd - mToday

    if (cc / (24 * 60 * 60 * 1000) > 1) {
      if (cc / (24 * 60 * 60 * 1000) < 10)
        return `còn ${Math.ceil(cc / (24 * 60 * 60 * 1000))} ngày`
      return moment(mTimeStart).format('DD-MM-YYYY') ///nga bat dau
    } else if (cc / (60 * 60 * 1000) > 1) {
      return `còn ${Math.ceil(cc / (60 * 60 * 1000))} giờ`
    } else if (cc / (60 * 1000) > 1) {
      return `còn ${Math.ceil(cc / (60 * 1000))} phút`
    } else if (cc / 1000 > 1) {
      return `còn ${Math.ceil(cc / 1000)} giây`
    }
    //thong bao k co push tuong lai
    return moment(mTimeStart).format('DD-MM-YYYY')
  }
}
export const get_day_of_time = (d1: any, d2: any) => {
  let ms1 = d1.getTime()
  let ms2 = d2.getTime()
  let cc = (ms2 - ms1) / (24 * 60 * 60 * 1000)
  // console.log(cc)
  return Math.ceil(cc)
}
export const get_hours_of_time = (d1: any, d2: any) => {
  let ms1 = d1.getTime()
  let ms2 = d2.getTime()
  let cc = (ms2 - ms1) / (60 * 60 * 1000)
  // console.log(cc)
  return Math.ceil(cc)
}
export const get_second_of_time = (d1: any, d2: any) => {
  let ms1 = d1.getTime()
  let ms2 = d2.getTime()
  let cc = (ms2 - ms1) / 1000
  // console.log(cc)
  return Math.ceil(cc)
}
export const get_time_of = (
  d1: any,
  d2: any,
  type: 'day' | 'hours' | 'minute' | 'second',
) => {
  let ms1 = d1.getTime()
  let ms2 = d2.getTime()
  let cc = 0
  switch (type) {
    case 'day':
      cc = (ms2 - ms1) / (24 * 60 * 60 * 1000)
      break
    case 'hours':
      cc = (ms2 - ms1) / (60 * 60 * 1000)
      break
    case 'minute':
      cc = (ms2 - ms1) / (60 * 1000)
      break
    case 'second':
      cc = (ms2 - ms1) / 1000
      break
    default:
      break
  }

  // console.log(cc)
  return Math.ceil(cc)
}
export const fmStatusBill2: any = (total: any) => {
  if (total && isObject(total)) {
    if (total.sumery && total.paid) {
      let no = 0
      no = total.sumery - total.paid
      if (no < 0) return fmStatusBill(2)
      if (no == 0) return fmStatusBill(2)

      if (no == total.sumery) return fmStatusBill(0)
      return fmStatusBill(1)
    }
  }
  return fmStatusBill(-99)
}
export const fmStatusBill: any = (type: any) => {
  switch (type) {
    case 2:
      return { text: 'Đã thanh toán', color: AppColor('txt_blue') }
    case 1:
      return { text: 'Thanh toán chưa đủ', color: AppColor('txt_origin') }
    case 0:
      return { text: 'Chưa thanh toán', color: AppColor('txt_red') }
    default:
      return { text: 'Sai định dạng', color: 'blue' }
  }
}
export const fmStatusChat = (type: any) => {
  switch (type) {
    case 0:
      return {
        text: AppLang('cho_phan_hoi'),
        color: AppColor('txt_origin'),
        icon: 'alert-circle',
      }

    case 2:
      return {
        text: AppLang('da_tiep_nhan'),
        color: AppColor('txt_blue'),
        icon: 'pricetag',
      }
    case 1:
      return {
        text: AppLang('da_hoan_thanh'),
        color: AppColor('txt_green'),
        icon: 'checkmark',
      }
    // case 3:
    //   return {text: 'Trạng thái gì đấy', color: AppColor('txt_red'), icon: ''}
    default:
      return { text: '', color: 'red', icon: 'warning' }
  }
}
export const fmTitleBill = (date: string) => {
  if (isEmpty(date)) return 'Sai định dạng'
  if (isString(date)) {
    let _arrDate = date
    let result = ''
    if (_arrDate.length > 5)
      result = `${AppLang('hoa_don')} ${_arrDate.slice(4, 6)}/${_arrDate.slice(
        0,
        4,
      )}`
    return result
  }
  return ''
}
export function moneyFormat(price: any, vnd = ' VND', default_value = "") {
  if (price === 0) return '0' + vnd
  if (!price) return default_value
  const pieces = parseFloat(price)
    .toFixed(0)
    .split('') //phantach chuoi thaeo ki tu
  let ii = pieces.length - 3 //toFixed:chuyen thanh chuoi giu lai thap phan()
  while (ii > 0) {
    pieces.splice(ii, 0, '.') //xoa 0 pt vt ii them vao .
    ii -= 3 //1,234,567
  }
  return pieces.join('') + vnd
}
export const fmCountEmotion = (summary: any) => {
  if (summary === 0) return '0'
  if (!summary) return 'sai định dạng'
  const pieces = parseFloat(summary)
    .toFixed(0)
    .split('')
  let ii = pieces.length - 3
  while (ii > 0) {
    pieces.splice(ii, 0, '.')
    ii -= 3
  }
  return pieces.join('')
}
export const fmDataFullImg = (data: Array<any>) => {
  if (Array.isArray(data)) {
    let res: string[] = []
    data.forEach(element => {
      res.push(element.image)
    })
    return res
  }
  return []
}
/**************************** */
export const fmSum = (data: any) => {
  if (isArray(data)) {
    let sums = 0
    data.forEach(element => {
      sums = sums + element.sumery
    })
    return sums
  }
  return 0
}
export const fmSumPaid = (data: any) => {
  if (isArray(data)) {
    let sums = 0
    data.forEach(element => {
      sums = sums + element.paid
    })
    return sums
  }
  return 0
}
export const isPaidArray = (data: any) => {
  if (Number(data?.sumery) - Number(data?.paid) > 0) return false
  return true
}
/**************************** */
export const fmDataBillDetail = (data: any, servicePrice: any) => {
  if (!Array.isArray(data)) return []
  if (data.length < 1) return []
  let result: any[] = []
  if (isArray(servicePrice)) return []
  if (Object.keys(servicePrice).length == 0) return []
  data.forEach(element => {
    let rowPay: any = {}
    rowPay.id = element?.id
    rowPay.title = servicePrice[element?.bdc_apartment_service_price_id]?.name
    rowPay.quantity = Number(element?.quantity)
    rowPay.price = element?.price
    rowPay.sum = 0
    rowPay.sumery = element?.sumery
    rowPay.discount = 0
    rowPay.payment = 0
    rowPay.paid = element?.paid

    if (
      servicePrice[element?.bdc_apartment_service_price_id]
        .bdc_price_type_id === 1
    ) {
      rowPay.sum = Number(element?.quantity) * element?.price
    } else if (
      servicePrice[element.bdc_apartment_service_price_id].bdc_price_type_id ===
      2
    ) {
      let quantity = Number(element?.quantity)

      servicePrice[
        element.bdc_apartment_service_price_id
      ].exponentiation.forEach((item: any) => {
        if (
          (quantity > item?.from || quantity === item?.from) &&
          (quantity < item?.to || quantity === item?.to)
        ) {
          rowPay.price = item?.price
        }
      })
      rowPay.sum = quantity * rowPay.price
    } else if (
      servicePrice[element.bdc_apartment_service_price_id].bdc_price_type_id ===
      3
    ) {
      rowPay.sum = element?.price
    } else {
      rowPay.sum = element?.price
    }
    if (element?.discount_type === 1) {
      rowPay.payment = rowPay.sum * (1 - element.discount)
    }
    if (element?.discount_type === 0) {
      rowPay.payment = rowPay.sum - element.discount
    }
    result.push(rowPay)
  })
  return result
}
export const fmDataShowImg = (data: any[]) => {
  if (!isEmpty(data) && isArray(data)) {
    let result: any[] = []
    data.forEach(item => {
      result.push(item.uri)
    })
    return result
  }
  return []
}
export const fmDataShowImg2 = (data: any[]) => {
  if (!isEmpty(data) && isArray(data)) {
    let result: any[] = []
    data.forEach(item => {
      let mi: any = {}
      mi.uri = item
      mi.type = 'image'
      result.push(mi)
    })
    return result
  }
  return []
}
export const fmDataShowVideo = (data: any[]) => {
  if (!isEmpty(data) && isArray(data)) {
    let result: any[] = []
    data.forEach(item => {
      let mi: any = {}
      mi.uri = item
      mi.type = 'video'
      result.push(mi)
    })
    return result
  }
  return []
}
export const arrayData = (data: any) => {
  if (isEmpty(data)) return []
  if (data) {
    if (Array.isArray(data)) return data
    return []
  }
  return []
}
export const fmDataMedia = (data: any) => {
  // Log.e('fmDataMedia', data)
  // return []
  if (isEmpty(data)) return []
  // Log.e('test')
  if (Array.isArray(data?.files) && Array.isArray(data?.images)) {
    let arrImg: any = []
    let arrVideo: any = []
    data?.files.forEach((item: string) => {
      let obVideo: any = {}
      obVideo.type = 'video'
      obVideo.uri = item
      arrVideo.push(obVideo)
    })
    data?.images.forEach((item: string) => {
      let obImg: any = {}
      obImg.type = 'image'
      obImg.uri = item
      arrImg.push(obImg)
    })
    // Log.e('arrVideo', arrVideo)
    // Log.e('arrImg', arrImg)
    return [...arrImg, ...arrVideo]
  }
  return []
}
export const renderTxt = (txt: any) => {
  if (isEmpty(txt)) return ''

  return txt
}
export const fmLinkFamily = (key: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7) => {
  switch (key) {
    case 0:
      return 'Chủ hộ'
    case 1:
      return 'Vợ/Chồng'
    case 2:
      return 'Con'
    case 3:
      return 'Bố mẹ'
    case 4:
      return 'Anh chị em'
    case 5:
      return 'Khác'
    case 6:
      return 'Khách thuê'
    case 7:
      return 'Chủ hộ cũ'
    default:
      return 'Ai đó'
  }
}
type arrayImageUri = Array<{
  uri: string
  type: 'image' | 'video'
  linkHttp: boolean
}>
export const convertArrayImageUri = (data: string[]) => {
  if (isEmpty(data)) return []
  if (!Array.isArray(data)) return []
  let images_uri: arrayImageUri = []
  data.forEach((item: string) => {
    images_uri.push({
      type: 'image',
      linkHttp: true,
      uri: item,
    })
  })
  return images_uri
}

export const cutHttpFrom = (data: arrayImageUri) => {
  if (isEmpty(data)) return []
  if (!Array.isArray(data)) return []
  let result: any = []
  data.forEach(item => {
    if (item?.linkHttp) result.push(item.uri)
  })
  return result
}
export const cutFileDeviceFrom = (data: arrayImageUri) => {
  if (isEmpty(data)) return []
  if (!Array.isArray(data)) return []
  let result: any = []
  data.forEach(item => {
    if (!item?.linkHttp) result.push(item)
  })
  return result
}
export function clearVietNamese(str: string) {
  var AccentsMap = [
    'aàảãáạăằẳẵắặâầẩẫấậ',
    'AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ',
    'dđ',
    'DĐ',
    'eèẻẽéẹêềểễếệ',
    'EÈẺẼÉẸÊỀỂỄẾỆ',
    'iìỉĩíị',
    'IÌỈĨÍỊ',
    'oòỏõóọôồổỗốộơờởỡớợ',
    'OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ',
    'uùủũúụưừửữứự',
    'UÙỦŨÚỤƯỪỬỮỨỰ',
    'yỳỷỹýỵ',
    'YỲỶỸÝỴ',
  ]
  for (var i = 0; i < AccentsMap.length; i++) {
    var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g')
    var char = AccentsMap[i][0]
    str = str.replace(re, char)
  }
  return str
}
export const getPropsArray = (data: any[], props: any[]) => {
  let res: any[] = []
  data.forEach(i => {
    let temp: any = {}
    props.forEach(j => {
      temp[j] = i[j]
    })
    res.push(temp)
  })
  return res
}
export const stringToUri = (images: string[], params = {}) => {
  let res: { uri: string }[] = []
  if (images && isArray(images)) {
    images.forEach(url => {
      if (isString(url)) {
        let temp: any = { ...params }
        temp['uri'] = url
        res.push(temp)
      }
    })
  }
  return res
}
export const uriToString = (data: { uri: string }[]) => {
  let res: string[] = []
  if (data && isArray(data)) {
    data.forEach(item => {
      if (isString(item.uri)) {
        res.push(item.uri)
      }
    })
  }
  return res
}
export const uriAddName = (data: { uri: string }[]) => {
  let res: { uri: string; fileName: any }[] = []
  if (data && isArray(data)) {
    data.forEach(item => {
      if (isString(item.uri)) {
        res.push({
          ...item,
          fileName: decodeURIComponent(
            getUrlName(item.uri) +
            `${new Date().getTime()}.` +
            getUrlExtension(item.uri),
          ),
        })
      }
    })
  }
  return res
}
export const formatPrice = (_money: number = 120000, name = [' Tỉ', ' Triệu', ' Nghìn']) => {
  //1 000 000 000 
  let B = 1000000000
  let M = 1000000 //100 000 000
  let K = 1000 //100 000 000
  if (_money >= B) return parseFloat((_money / B).toFixed(2)) + name[0]
  else if (_money >= M) return parseFloat((_money / M).toFixed(2)) + name[1]
  else if (_money >= M) return parseFloat((_money / K).toFixed(2)) + name[2]
  return _money
}
export const formatPriceB = (_money: number = 120000, name = ' Tỉ') => {
  //1 000 000 000 
  let B = 1000000000
  return parseFloat((_money / B).toFixed(4)) + name

}