import React, { useEffect, useRef, useState } from 'react'
import { AppColor } from '@assets/colors'
import { Block, IconC, Touch } from '@mylib'
import { screen_width, TextApp } from '@components'
import Message from './Message'
import { useComment } from '@service/hook/useComment'
import { ActivityIndicator } from 'react-native'
import { arrayData } from '@utils/format'
import { Log } from '@utils'
import { Icon23Black } from '@assets/common/themes'

import { AppLang } from '@assets/langs'
import BoxMessage from './BoxMessage'
import { useCommentCount } from '@service/hook/useLocalMater'
import * as Animatable from 'react-native-animatable'
import { useSelector } from 'react-redux'
import { SelectorRedux } from '@utils/type'

const numberShow = 3
const ListChat = React.forwardRef<any, any>(
  ({ data, isClose }: any, ref: any) => {
    // Log.d1('data--------ListChat', data)
    if (!data?.id) return null
    React.useImperativeHandle(ref, () => ({
      onRefetch() {
        Log.d('onRefetch-list-chat')
        onRefetch()
        onRefresh2()
        Log.d(
          'onRefetch-list-chat2',
          _boxMessage.current,
          Object.keys(_boxMessage.current),
        )
        Object.keys(_boxMessage.current).forEach(item => {
          _boxMessage.current[`${item}`]?.onRefreshChild()
        })
      },
    }))
    const [
      onRefetch,
      comments,
      isLoading,
      isFinished,
      onLoadMore,
      deleteComment,
      updateComment,
    ] = useComment(data?.id, data?.type === 'fback' ? 'feedback' : data?.type)
    const [initShow, setInitShow] = useState<any>(numberShow)
    const [isLoading2, count, onRefresh2] = useCommentCount(
      data?.id,
      data?.type === 'fback' ? 'feedback' : data?.type,
    )
    const user = useSelector((state: SelectorRedux) => state.user.data)
    const _boxMessage: any = useRef({})
    useEffect(() => { }, [])

    // Log.d1('data user', user)
    // Log.d1('data?.type', data)
    // Log.d1('loading-ListChat', isLoading)
    // Log.d1('comments-ListChat', comments)
    const handleLoadMore = () => {
      setInitShow(undefined)
      onLoadMore()
    }
    // const appState = appStateRefresh(() => {
    //   Log.e('refresh-appStateRefresh')
    //   onRefresh2()
    //   onRefetch()
    //   // _boxMessage.current.onRefreshChild()
    // })
    const _left = 10
    return (
      <Block padB={50}>
        <HeaderChat numberCmt={count} isClose={isClose} />
        {arrayData(comments.slice(0, initShow)).map((item, indexParent) => (
          <Animatable.View
            key={indexParent}
            animation='fadeInUp'
            delay={indexParent * 80}
            useNativeDriver>
            <Block key={indexParent} padH={_left} marB={5}>
              <Message
                user_current={user?.user_id}
                item={item}
                idParent={item?.id}
                sWidth={screen_width - _left * 2}
                onRefresh={() => {
                  onRefetch()
                  onRefresh2()
                }}
                type={data?.type}
                deleteCommentChild={deleteComment}
                updateComment={updateComment}
              />
              <BoxMessage
                post_id={data?.id}
                onRefresh={onRefresh2}
                ref={ref => {
                  _boxMessage.current[`${item?.id}`] = ref
                  // Log.e('res', ref)
                }}
                user_current={user?.user_id}
                sWidth={screen_width - _left * 2}
                item={{
                  id: item.id,
                  type: data?.type === 'fback' ? 'feedback' : data?.type,
                  childrenNo: item.childrenNo,
                }}
              />
            </Block>
          </Animatable.View>
        ))}
        {(!isFinished ||
          (isFinished &&
            initShow === numberShow &&
            comments.length > numberShow)) && (
            <Touch padL={20} marT10 onPress={handleLoadMore}>
              <TextApp color={AppColor('txt_blue')}>
                {AppLang('xem_them_binh_luan')}
              </TextApp>
            </Touch>
          )}
        {isLoading && (
          <Block mid>
            <ActivityIndicator size={20} color={AppColor('primary')} />
          </Block>
        )}
      </Block>
    )
  },
)
export default ListChat

const HeaderChat = ({
  numberCmt,
  isClose,
}: {
  numberCmt: number
  isClose: any
}) => {
  return (
    <Block row padding={10} centerH>
      <Block row alignItems='center' marginLeft={10}>
        <IconC name='chatbubble-ellipses-outline' {...Icon23Black} />
        <TextApp color={AppColor('txt_black')}>
          {'  '}
          {numberCmt}
          {` ${AppLang('binh_luan')}`}
        </TextApp>
      </Block>
      {isClose && (
        <Touch onPress={isClose}>
          <IconC name='close' size={23} />
        </Touch>
      )}
    </Block>
  )
}
