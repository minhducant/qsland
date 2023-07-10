import {
  Image,
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  FlatList,
} from 'react-native'
import React, {useEffect} from 'react'
import {Log, uriImg} from '@utils'
import {IconC} from '@mylib'
import {AppColor} from '@assets/colors'
import {screen_width, screen_height} from '@components'
import EmojiSelector, {Categories} from '@components/Emoji'
import {useSelector} from 'react-redux'
import store from '@service/store'
import {setParent_id, setUserTag} from '@service/store/slice/commentSlice'
import VideoPlayer from '@components/view/VideoBasic'
import {Icon30Primary} from '@assets/common/themes'
import {isArray} from 'underscore'

import {AppLang, LANG} from '@assets/langs'
import LinearGradient from 'react-native-linear-gradient'

export function HeaderScrollImage ({
  dataSelect,
  onClose,
  styleBox,
}: {
  dataSelect: any[]
  onClose: (index: any) => void
  styleBox?: StyleProp<ViewStyle>
}) {
  return (
    <ScrollView
      horizontal
      // persistentScrollbar
      // nestedScrollEnabled
    >
      <View
        style={[
          {
            flexDirection: 'row',
          },
          styleBox,
        ]}>
        {dataSelect.map((item, index) => (
          <View
            key={index}
            style={{
              width: 100,
              height: 100,
              backgroundColor: '#fff',
              overflow: 'hidden',
              borderRadius: 20,
              margin: 5,
              marginBottom: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {(item.type === 'image/jpeg' ||
              item.type === 'image/jpg' ||
              item.type === 'image/png') && (
              <Image
                source={uriImg(item?.uri)}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 20,
                  overflow: 'hidden',
                  resizeMode: 'cover',
                }}
              />
            )}

            {(item.type === 'video/mp4' || item.type === 'video/quicktime') && (
              <>
                <IconC
                  name='play'
                  {...Icon30Primary}
                  style={{
                    position: 'absolute',
                    elevation: 4,
                    shadowColor: '#000',
                  }}
                />
                <VideoPlayer
                  source={uriImg(item?.uri)}
                  width={100}
                  height={100}
                  style={{
                    borderRadius: 20,
                    overflow: 'hidden',
                    resizeMode: 'cover',
                  }}
                />
              </>
            )}
            <TouchableOpacity
              onPress={() => onClose(index)}
              style={{
                position: 'absolute',
                top: -10,
                right: -10,
                width: 45,
                height: 45,
                backgroundColor: '#fff',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                // borderRadius: 30,
                borderBottomLeftRadius: 30,
                padding: 5,
              }}>
              <IconC name='close' color='red' size={30} />
            </TouchableOpacity>
            <View style={{flex: 1, backgroundColor: 'red', zIndex: 30}}></View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({iconLeft: {paddingHorizontal: 5}})
export const IconButton = ({
  onPress,
  show = true,
  icon = 'camera',
  style = styles.iconLeft,
  typeIcon = 'Ionicons',
}: {
  onPress: () => void
  icon: string
  style?: StyleProp<ViewStyle>
  typeIcon?: any
  show?: boolean
}) => {
  if (!show) return null
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <IconC
        type={typeIcon}
        name={icon}
        size={25}
        color={AppColor('primary')}
      />
    </TouchableOpacity>
  )
}
export const HeaderBottomSheet = ({
  onFull,
  onClose,
}: {
  onFull: () => void
  onClose: () => void
}) => {
  return (
    <View
      style={{
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <Text style={{fontWeight: 'bold', fontSize: 18}}>
        {AppLang('tat_ca_anh_video')}
      </Text>
      <TouchableOpacity
        onPress={onClose}
        style={{position: 'absolute', left: 10}}>
        <IconC name='close' size={30} color={AppColor('primary')} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onFull}
        style={{position: 'absolute', right: 10}}>
        <IconC name='resize' size={30} color={AppColor('primary')} />
      </TouchableOpacity>
    </View>
  )
}
export const ViewEmojiSelector = ({
  onEmojiSelected,
}: {
  onEmojiSelected: (e: any) => void
}) => {
  return (
    <View
      style={{
        width: screen_width * 0.9,
        height: screen_height * 0.7,

        borderRadius: 10,
        padding: 10,
        backgroundColor: '#fff',
        overflow: 'hidden',
      }}>
      <EmojiSelector
        onEmojiSelected={onEmojiSelected}
        // showTabs={false}
        showSearchBar={false}
        category={Categories.emotion}
      />
    </View>
  )
}
export const ItemImage = ({
  onPress,
  item,
}: {
  onPress: () => void
  item: any
}) => {
  // Log.e('ItemImage', item)
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: screen_width / 4,
        height: screen_width / 4,
        overflow: 'hidden',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={uriImg(item.uri)}
        style={{
          width: screen_width / 4,
          height: screen_width / 4,
          overflow: 'hidden',
          resizeMode: 'cover',
        }}
      />
      {item.type === 'video/mp4' && (
        <IconC
          name='play'
          size={30}
          color='#fff'
          style={{position: 'absolute', elevation: 4, shadowColor: '#000'}}
        />
      )}
    </TouchableOpacity>
  )
}
export const FlatListLibrary = ({
  onScrollFlat,
  dataMedia,
  dataSelect,
  onSelectImage,
  snapCurrent,
  onRemoveImageSelect,
  isChoseImage,
}: {
  onScrollFlat: (e: any) => void
  onRemoveImageSelect: (e: any) => void
  dataMedia: any
  dataSelect: any
  onSelectImage: (item: any) => void
  snapCurrent: number
  isChoseImage: boolean
}) => {
  if (!isChoseImage) return null
  Log.e('FlatListLibrary-snapCurrent', snapCurrent)
  return (
    <View
      style={{
        height: screen_height - 10,
        width: '100%',
        backgroundColor: '#fff',
      }}>
      {snapCurrent === 0 && (
        <View style={{marginBottom: 2}}>
          <HeaderScrollImage
            dataSelect={dataSelect}
            onClose={onRemoveImageSelect}
          />
        </View>
      )}

      <FlatList
        // onScroll={onScrollFlat}
        data={isArray(dataMedia) ? dataMedia : []}
        numColumns={4}
        keyExtractor={(i, j) => `${j}`}
        renderItem={({item}) => (
          <ItemImage onPress={() => onSelectImage(item)} item={item} />
        )}
      />
    </View>
  )
}
export const TextTag = () => {
  const user_tag = useSelector((state: any) => state.comment.user_tag)
  const handleRemoveTag = () => {
    store.dispatch(setParent_id(0))
    store.dispatch(setUserTag(null))
  }
  if (!user_tag) return null
  return (
    <View style={{position: 'absolute', top: -35, left: 10}}>
      <LinearGradient
        colors={['#eee', '#ddd']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={{
          backgroundColor: '#ddd',

          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 10,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
        }}>
        <Text style={{fontWeight: '600', fontSize: 16, color: '#00021d'}}>
          {`@${user_tag}`}
        </Text>
      </LinearGradient>
      <TouchableOpacity
        onPress={handleRemoveTag}
        style={{
          position: 'absolute',
          top: -12,
          right: -12,
          backgroundColor: '#eee',
          borderRadius: 50,
          borderColor: '#eee',
        }}>
        <IconC name='close' size={18} color='gray' />
      </TouchableOpacity>
    </View>
  )
}
