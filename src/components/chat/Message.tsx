import React, { useRef, useState } from 'react'
import { AvatarC, Block, Touch } from '@mylib'
import { TextApp, ShowImageFull } from '@components'
import { Log, uriImg } from '@utils'
import { arrayData, fmDataMedia, fmTimeNotify } from '@utils/format'
import store from '@service/store'
import { setUserTag, setUser_id } from '@service/store/slice/commentSlice'
import MediaFull from '@components/view/MediaFull'
import { isArray, isEmpty, isObject, isString } from 'underscore'
import { AppLang, LANG } from '@assets/langs'
import { setParent_id } from '@service/store/slice/commentChildSlice'
import { useUsers } from '@service/hook/userUsers'
import moment from 'moment'
import MediaItem from './MediaItem'
import SelectMessage from './SelectMessage'
import { Text } from 'react-native'
type messageProps = {
  item?: any
  idParent: number
  sWidth: number
  size?: number
  user_current?: number
  onRefresh: any
  deleteCommentChild?: any
  mess_child?: boolean
  type?: any
  updateComment: any
}
export default function Message({
  item,
  idParent,
  sWidth,
  size = 20,
  user_current,
  onRefresh,
  deleteCommentChild,
  mess_child,
  type,
  updateComment,
}: messageProps) {
  // if (isEmpty(item)) return null
  const onReply = () => {
    Log.e('onReply', idParent)
    store.dispatch(setParent_id(idParent))
    store.dispatch(setUserTag(getUserName()))
    store.dispatch(setUser_id(item?.user_id))
  }
  const [data] = useUsers(item?.user_id, item?.new)
  // Log.e('tets-useUsers', data)
  const getNames = () => {
    if (item?.user_name) return item?.user_name
    if (data) {
      if (isObject(data)) {
        return data?.full_name ? data?.full_name : ''
      }
    }
    return 'H'
  }
  const getUserName = () => {
    if (item?.user_name) return item?.user_name
    if (data) {
      if (isObject(data)) {
        return data?.full_name ? data?.full_name : ''
      }
    }
  }
  const getAvatar = () => {
    if (item?.avatar) return uriImg(item?.avatar)
    if (data) {
      if (isObject(data)) {
        return data?.avatar ? uriImg(data?.avatar) : null
      }
    }
  }
  const refMedia = useRef<any>()
  const _SelectMessage = useRef<any>()
  const _avatar = useRef<any>()
  const onSelectedCmt = () => {
    Log.d('onSelectedCmt')
    Log.d('onSelectedCmt')
    Log.d('onSelectedCmt', { user_current, user_id: item?.user_id })
    if (user_current == item?.user_id) _SelectMessage.current.open()
  }
  // Log.d1('data', data)
  return (
    <Block row overH w={sWidth}>
      <Touch
        onPress={() => _avatar.current.visible(true)}
        w={sWidth * 0.15}
        alignCenter
        padT={2}>
        <AvatarC name={getNames()} source={getAvatar()} radius={size} />
      </Touch>
      <ShowImageFull
        option={{ isAvatar: true, name: [getNames()] }}
        ref={_avatar}
        data={[getAvatar()?.uri]}
      />
      <Block w={sWidth * 0.7} alignI='flex-start'>
        {/* top */}
        <Touch
          activeOpacity={0.5}
          onLongPress={onSelectedCmt}
          bg={colorMess}
          padH={15}
          padV={5}
          borderR={16}
          overH
          alignI='flex-start'>
          <Block row>
            <Block minW={0.1 * (sWidth * 0.7)} maxW={0.6 * (sWidth * 0.7)}>
              <Text style={{ fontWeight: '500' }} numberOfLines={2}>
                {getUserName()}
              </Text>
            </Block>
          </Block>
          <TextApp
            numberOfLines={30}
            style={{ fontSize: 14, fontWeight: '300', color: '#00021d' }}>
            {item?.content}
          </TextApp>
        </Touch>
        {/* top */}
        <MediaItem
          images={arrayData(fmJSON(item?.files).images)}
          videos={arrayData(fmJSON(item?.files).files)}
          onPress={() => refMedia.current.visible(true)}
        />
        <MediaFull ref={refMedia} data={fmDataMedia(fmJSON(item?.files))} />
        <Footer onReply={onReply} item={item} />
      </Block>
      <Block bgW w={sWidth * 0.1} />
      <SelectMessage
        ref={_SelectMessage}
        item={item}
        onRefresh={onRefresh}
        mess_child={mess_child}
        type={type}
        deleteCommentChild={deleteCommentChild}
        updateComment={updateComment}
      />
    </Block>
  )
}

const Footer = ({ onReply, item }: any) => {
  return (
    <Block row marV5 alignCenter>
      <Block marL10>
        <TextApp style={{}} size={11} numberOfLines={1} color='gray'>
          {fmTimeNotify(moment(item?.created_at).format('YYYY/MM/DD HH:mm:ss'))}
          {/* {item?.created_at && moment(item?.created_at).format('DD-MM-YYYY')} */}
        </TextApp>
      </Block>
      <Touch onPress={onReply} marL={20}>
        <TextApp size={11} style={{ fontWeight: '300' }}>
          {AppLang('tra_loi')}
        </TextApp>
      </Touch>
    </Block>
  )
}
const colorMess = '#EEEEEEAA'
const fmJSON = (attached: any) => {
  if (attached) {
    let res: any = { images: [], files: [] }
    let _data = isString(attached) ? JSON.parse(attached) : {}
    let _image = _data?.images
    let _video = _data?.files
    // Log.e('image', _image)
    if (!isEmpty(_image) && isArray(_image)) res.images = _image
    if (!isEmpty(_video) && isArray(_video)) res.files = _video
    return res
  }
  return {}
}
