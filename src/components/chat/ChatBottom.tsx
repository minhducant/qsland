// import { Platform } from 'react-native'
// import React, { useEffect, useRef } from 'react'
// import { useSelector } from 'react-redux'
// import { Log } from '@utils'
// import store from '@service/store'
// import { addComment } from 'src/lib/apiUntil'
// import { setUserTag } from '@service/store/slice/commentSlice'
// import { isEmpty } from 'underscore'
// import BoxInput from './BoxInput'
// import { setParent_id } from '@service/store/slice/commentChildSlice'
// import { openReview } from '@components/popup/AppReview'
// import { SelectorRedux } from '@utils/type';
// export default function ChatBottom({
//   user_id0,
//   refScroll,
//   heightTop,
//   hidePaddingBottom,
//   offRate,
// }: any) {
//   const { parent_id, showKey, user_tag, user_id } = useSelector((state: SelectorRedux) => state.comment,)

//   const refChat: any = useRef()
//   const refSend: any = useRef()

//   // /*************** */
//   const addChat = async () => {
//     let _mess = refChat.current.getValue()
//     let _media = refChat.current.getMedia()
//     let _like = refChat.current.getIsLike()

//     // Log.e('_mess', _mess)
//     // Log.e('_media', _media)
//     // return
//     if (_like) _mess = '👍'
//     if (isEmpty(_mess) && _media.length === 0) return

//     refChat.current.setWaitSend(true)
//     // Log.e('ChatBottom-mes', _mess)
//     // Log.e('ChatBottom-media', _media)
//     refSend.current = setTimeout(() => {
//       refChat.current.setWaitSend(false)
//       refChat.current.clear()
//       store.dispatch(setParent_id(0))
//       store.dispatch(setUserTag(null))
//       // ToastAppError('Đợi tí nhé!')
//     }, 1000)
//     Log.e('p-addComment', _mess, _media, user_id)

//     let res = await addComment(
//       _mess,
//       _media,
//       user_id ? user_id : user_id0 ? user_id0 : 0,//comment con nay cua ai
//     )
//     Log.e('res-addComment/openReview', res)
//     if (res.status) {
//       // !offRate && openReview()
//       //offRate:: chống  2 popup trùng nhau
//     }
//     if (parent_id === 0) {
//       // refScroll.current.scrollTo({
//       //   y: heightTop + 70 + keyboardShown ? 400 : 0,
//       //   animated: true,
//       // })
//     }
//     if (refSend.current) clearTimeout(refSend.current)
//     refChat.current.setWaitSend(false)
//     refChat.current.clear()
//     store.dispatch(setParent_id(0))
//     store.dispatch(setUserTag(null))
//   }
//   // Log.e('parent_id-ChatBottom', parent_id)
//   useEffect(() => {
//     if (parent_id && parent_id !== 0) refChat.current.focus()
//   }, [parent_id, showKey])
//   useEffect(() => {
//     if (Platform.OS === 'android') {
//       // requestCameraPermission()
//     }
//     return () => {
//       store.dispatch(setParent_id(0))
//       if (refSend.current) clearTimeout(refSend.current)
//     }
//   }, [])
//   return (
//     <BoxInput
//       hidePaddingBottom={hidePaddingBottom}
//       ref={refChat}
//       onSend={addChat}
//     />
//   )
// }
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ChatBottom() {
  return (
    <View>
      <Text>ChatBottom</Text>
    </View>
  )
}

const styles = StyleSheet.create({})