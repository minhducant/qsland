import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Pressable,
  Alert,
} from 'react-native'
import React, {useRef, useState} from 'react'
import RBSheet from 'react-native-raw-bottom-sheet'
import {screen_height, LoadingApp} from '@components'
import {Block, IconC} from '@mylib'
import {AppColor} from '@assets/colors'
import {Log} from '@utils'
import {InputBasic} from '@components/input'
import SelectedMedia from '@components/view/SelectedMedia'
import {fmDataMedia} from '@utils/format'

import {AppLang} from '@assets/langs'
import {isArray} from 'underscore'
type SelectMessageProps = {
  item: any
  onRefresh: any
  deleteCommentChild: any
  mess_child: any
  type: any
  updateComment: any
}
const SelectMessage = React.forwardRef(
  (
    {
      item,
      onRefresh,
      deleteCommentChild,
      mess_child,
      type,
      updateComment,
    }: SelectMessageProps,
    ref: any,
  ) => {
    React.useImperativeHandle(ref, () => ({
      open () {
        open()
      },
      close () {
        close()
      },
    }))
    const close = () => {
      refRBSheet.current.close()
      setIsUpdate(false)
    }
    const open = () => {
      // if(item?.user_id==Us)
      // Log.e1('item', item)

      refRBSheet.current.open()
    }
    const refRBSheet: any = useRef()
    const _input: any = useRef()
    const refMedia: any = useRef()
    const [isUpdate, setIsUpdate] = useState(false)
    const deleteMessage = async () => {
      Alert.alert(AppLang('hoi_xoa_binh_luan') + '?', undefined, [
        {
          text: AppLang('huy'),
          onPress: () => {},
        },
        {
          text: AppLang('xoa'),
          onPress: async () => {
            close()
            Log.e1('deleteCommentChild(item.id)', item.id)
            deleteCommentChild(item.id)
            // return onRefresh()
          },
        },
      ])
    }
    const updateMessage = async () => {
      if (!isUpdate) {
        setIsUpdate(true)
        setTimeout(() => {
          if (_input.current) _input.current.focus()
        }, 500)
      } else {
        let newContent = _input.current.getValue()
        let media = refMedia.current.getMedia()
        let arr_files = media.filter((item: any) => item.type === 'video')
        let arr_images = media.filter((item: any) => item.type === 'image')
        let arr_media = media.filter(
          (item: any) => item.type !== 'image' && item.type !== 'video',
        )
        ///update item child
        Log.d('start update')
        let res = await updateComment({
          images: {
            files: fmAttached(arr_files),
            images: fmAttached(arr_images),
          },
          content: newContent ? newContent : '',
          id: item.id,
          photo: arr_media ? arr_media : [],
          type,
        })

        if (res.status) {
          onRefresh()
          /**note update state */
        }
        close()
      }
    }
    return (
      <RBSheet
        {...p}
        onClose={() => setIsUpdate(false)}
        ref={refRBSheet}
        closeOnDragDown
        closeOnPressMask
        height={screen_height * 0.55}
        customStyles={{draggableIcon: {backgroundColor: '#fff'}}}
        openDuration={200}>
        <ScrollView showsVerticalScrollIndicator={false} style={{height: 1000}}>
          <View style={styles.container}>
            <RowInfo
              item={{label: AppLang('xoa'), icon: 'trash-outline'}}
              onPress={deleteMessage}
            />
            {!isUpdate && (
              <RowInfo
                item={{label: AppLang('chinh_sua'), icon: 'pencil-outline'}}
                onPress={updateMessage}
              />
            )}
            {isUpdate && (
              <>
                <RowInfo
                  item={{label: AppLang('luu_lai'), icon: 'save-outline'}}
                  onPress={updateMessage}
                />
                <InputBasic
                  ref={_input}
                  multiline
                  textAlignVertical='top'
                  style={{
                    height: 200,
                    backgroundColor: '#eee',
                    width: '80%',
                    paddingHorizontal: 15,
                    paddingTop: 10,
                    padding: 5,
                    color: '#000',
                  }}
                  placeholder='Aa'
                  placeholderTextColor={'gray'}
                  styleBox={{marginTop: 30, height: 200, borderRadius: 15}}
                  valueInit={item?.content}
                />
                <Block pad10 minH={50} marT={20} w={'80%'}>
                  <SelectedMedia
                    videoQuality={'high'}
                    ref={refMedia}
                    valueInit={fmDataMedia(JSON.parse(item?.files))}
                  />
                </Block>
              </>
            )}
          </View>
        </ScrollView>
      </RBSheet>
    )
  },
)
export default SelectMessage

const styles = StyleSheet.create({
  container: {width: '100%', minHeight: 500, alignItems: 'center'},
})
const p: any = {}
const RowInfo = ({item, onPress}: any) => {
  return (
    <Pressable
      style={({pressed}) => [
        {
          backgroundColor: pressed ? '#ddd' : '#fff',
        },
        {
          flexDirection: 'row',
          minHeight: 55,
          paddingVertical: 5,
          paddingTop: 10,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 30,
        },
      ]}
      onPress={() => {
        if (item?.maintain) return
        onPress()
      }}>
      <Block flex1 row centerH>
        <Block row pad5 alignCenter>
          <IconC name={item.icon} size={23} color={AppColor('primary')} />
          <Text style={{fontSize: 16, paddingLeft: 10}}>{item?.label}</Text>
        </Block>
      </Block>
    </Pressable>
  )
}
export const fmAttached = (data: any) => {
  if (isArray(data)) {
    let res: any = []
    data.forEach(element => {
      res.push(element.uri)
    })
    return res
  }
  return []
}
