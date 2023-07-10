// import { Log, isJson } from '@utils'
import { Alert } from 'react-native'
// import { navigate } from '@navigation';
// import { TYPE_REQUEST, TYPE_SENDER } from './typeSender';
// import store from '@service/store';
export { Log } from '@utils'
export const prefixes = [
  'stech://',
  'https://stech.com',
]
export const AlertOnMessage = ({ title, body, onPress }: any) => {
  Alert.alert(title, body, [
    {
      text: 'Đóng',
      onPress: () => { },
    },
    { text: 'Xem', onPress: () => onPress() },
  ])
}
const info = (name_screen: string) => {
  return {
    path: `${name_screen}/:data`,
    parse: {
      data: (data: string) => JSON.parse(data),
    },
  }
}

export const config = {
  screens: {
    //screen <--- screen_notify_details
    //ten man hinh<<-- ten truyen vao
    // screen_notify_details: info('A'),
    // screen_feedback_detail: info('screen_feedback_detail'),
    // screen_notify_details: info('screen_notify_details'),
    // screen_post_detail: info('screen_post_detail'),
    // screen_news_details: info('screen_news_details'),
    // screen_event_details: info('screen_event_details'),
    // screen_request_detail: info('screen_request_detail'),
    // screen_work_detail: info('screen_work_detail'),
    // screen_finance_details: info('screen_finance_details'),
  },
}
export const formatLINK = (content: any) => {
  // const type_sender = content?.type_sender
  // const id = content?.id_sender
  // const type_request = content?.type_request
  // Log.e('formatLINK', content)
  // if (id) {
  //   if (type_sender == 8) return `stech://` + TYPE_REQUEST[type_request]?.navigation + '/' + JSON.stringify({ id })
  //   return `stech://` + TYPE_SENDER[type_sender]?.navigation + '/' + JSON.stringify({ id })
  // }
}

export const formatOnTap = (content: any) => {
  try {
    // const type_sender = content?.type_sender
    // const id_sender = content?.id_sender
    // const type_request = content?.type_request
    // if (id_sender) {
    //   if (type_sender == 8) {
    //     Log.e('formatOnTap', TYPE_REQUEST[type_request]?.navigation)
    //     return navigate(TYPE_REQUEST[type_request]?.navigation, { data: { id: id_sender, type: TYPE_REQUEST[type_request]?.type } })
    //   }
    //   Log.e('formatOnTap', TYPE_SENDER[type_sender]?.navigation)
    //   if (type_sender == 9) {
    //     store.dispatch(getDetailTaskSlice({ id: id_sender }))
    //     return navigate(TYPE_SENDER[type_sender]?.navigation, {
    //       data: { id: id_sender },
    //     })
    //   }
    //   return navigate(TYPE_SENDER[type_sender]?.navigation, { data: { id: id_sender, type: TYPE_REQUEST[type_request]?.type } })
    // }
  } catch (error) {
    alert('Đã xảy ra lỗi, vui lòng thử lại sau\n' + JSON.stringify(error))
  }
} 