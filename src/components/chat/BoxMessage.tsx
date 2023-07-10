// import {useCommentChildren} from '@service/hook/useChildComment'
import * as Animatable from 'react-native-animatable'
import { ActivityIndicator, Text } from 'react-native'
import { Block, Touch } from '@mylib/UIKit'
import { AppColor } from '@assets/colors'
import { arrayData } from '@utils/format'
import React, { useState } from 'react'
import { Log } from '@utils'
import { TextApp } from '@components'
import { AppLang, } from '@assets/langs'
import Message from './Message'
const numberShow = 2
const BoxMessage = React.forwardRef(
  ({ item, sWidth, user_current, onRefresh, post_id }: any, ref) => {
    const [
      comments,
      isLoading,
      onLoadMore,
      deleteCommentChild,
      updateCommentChild,
      onRefreshChild,
    ] = useCommentChildren(item.id, item.type, post_id)
    const isFinished = false
    const [initShow, setInitShow] = useState<any>(numberShow)
    const handleLoadMore = () => {
      setInitShow(undefined)
      onLoadMore()
      setIsLoaded(true)
    }
    React.useImperativeHandle(ref, () => ({
      onRefreshChild() {
        LoadChild()
      },
    }))
    // Log.g('item', item)
    // Log.g1('BoxMessage', comments)
    // Log.g('item', item)
    const [isLoaded, setIsLoaded] = useState(false)
    const _left = 20
    const LoadChild = () => {
      Log.e('LoadChild', item.id)
      onRefreshChild()
    }
    return (
      <Block marL={_left}>
        {arrayData(comments.slice(0, initShow)).map(
          (itemChill: any, indexChill: number) => (
            <Animatable.View
              key={indexChill}
              animation='fadeInUp'
              delay={indexChill * 100}
              useNativeDriver>
              <Message
                type={item?.type}
                user_current={user_current}
                size={15}
                sWidth={sWidth - _left}
                key={indexChill}
                item={itemChill}
                idParent={item.id}
                mess_child
                onRefresh={() => {
                  onRefreshChild()
                  onRefresh()
                }}
                deleteCommentChild={deleteCommentChild}
                updateComment={updateCommentChild}
              />
            </Animatable.View>
          ),
        )}
        <Block padV5>
          {((!isLoaded && item.childrenNo) ||
            (initShow === numberShow && comments.length > numberShow)) && (
              <Touch marL={sWidth * 0.15 - _left + 10} onPress={handleLoadMore}>
                <TextApp color={AppColor('txt_origin')}>
                  {AppLang('xem_phan_hoi')}
                </TextApp>
              </Touch>
            )}
        </Block>
        {isLoading && (
          <Block mid>
            <ActivityIndicator size={20} color={AppColor('primary')} />
          </Block>
        )}
      </Block>
    )
  },
)
export default BoxMessage
