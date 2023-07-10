import {
  Image,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import {IconC, Block} from '@mylib'
import {Log, uriImg} from '@utils'
import SelectMedia from './SelectMedia/index'
import {AppColor} from '@assets/colors'
import VideoPlayer from './VideoBasic'
import React, {useRef, useState, MutableRefObject} from 'react'
import {TextApp} from '@components'
import {AppLang} from '@assets/langs'
type propsSelectMedia = {
  valueInit?: any
  videoQuality: 'low' | 'medium' | 'high'
  selectionLimit?: number
  renderHeader?: any
  styleImage?: StyleProp<ViewStyle>
  styleBoxImg?: StyleProp<ViewStyle>
  hideRecord?: boolean
}
const SelectedMedia = React.forwardRef((props: propsSelectMedia, ref: any) => {
  const [dataSelect, setDataSelect] = useState<any[]>(
    props.valueInit ? props.valueInit : [],
  )
  const refMedia: MutableRefObject<any> = useRef()
  const handleCallBackSelectImage = (e: any) => {
    if (e?.assets) {
      setDataSelect((state: any) => {
        return [...state, ...e.assets]
      })
    }
    refMedia.current.close()
  }
  const handleOpenSelect = () => {
    refMedia.current.open()
  }
  // Log.d('SelectedMedia', dataSelect)
  React.useImperativeHandle(ref, () => ({
    getMedia () {
      return dataSelect
    },
    clear () {
      setDataSelect([])
    },
    open () {
      refMedia.current.open()
    },
    onLibrary () {
      refMedia.current.onLibrary()
    },
    onCamera () {
      refMedia.current.onCamera()
    },
    onRecord () {
      refMedia.current.onRecord()
    },
  }))
  const handleDelItemSelect = (index: any) => {
    setDataSelect((state: any) => {
      return state.filter((item: any, _index: number) => _index !== index)
    })
  }
  return (
    <>
      {props?.renderHeader ? (
        props?.renderHeader()
      ) : (
        <Header onPress={handleOpenSelect} />
      )}
      <SelectMedia
        hideRecord={props?.hideRecord}
        selectionLimit={props?.selectionLimit}
        videoQuality={props?.videoQuality}
        ref={refMedia}
        onSelectedMedia={handleCallBackSelectImage}
      />
      <ScrollView horizontal persistentScrollbar nestedScrollEnabled>
        <View
          style={[
            {flexDirection: 'row'},
            props?.styleBoxImg,
            dataSelect.length == 0 && {height: 0},
          ]}>
          {dataSelect.map((item: any, index) => (
            <View key={index} style={[styles.boxItem, props?.styleImage]}>
              {/* <Image source={uriImg(item?.uri)} style={styles.image} /> */}
              {(item.type === 'image/jpeg' ||
                item.type === 'image/png' ||
                item.type === 'image' ||
                item.type === 'image/jpg') && (
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
              {(item.type === 'video/mp4' ||
                item.type === 'video' ||
                item.type === 'video/quicktime') && (
                <>
                  <IconC
                    name='play'
                    size={30}
                    color='#fff'
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
              <IconRemove onPress={() => handleDelItemSelect(index)} />
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  )
})
export default SelectedMedia
const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
    overflow: 'hidden',
    resizeMode: 'cover',
  },
  boxItem: {
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderRadius: 20,
    margin: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxRemove: {
    position: 'absolute',
    top: -10,
    right: -10,
    width: 45,
    height: 45,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    borderBottomLeftRadius: 30,
    padding: 5,
  },
})
const IconPlay = () => {
  return (
    <IconC
      name='play'
      size={30}
      color='#fff'
      style={{
        position: 'absolute',
        elevation: 4,
        shadowColor: '#000',
      }}
    />
  )
}
const Header = ({onPress}: any) => {
  return (
    <Block row centerH paddingRight={10}>
      <TextApp
        style={{
          color: AppColor('primary'),
          fontSize: 16,
        }}>
        {AppLang('dinh_kem')}
      </TextApp>
      <TouchableOpacity onPress={onPress}>
        <IconC name='folder' size={25} color={AppColor('txt_gray')} />
      </TouchableOpacity>
    </Block>
  )
}

const IconRemove = ({onPress}: {onPress: () => void}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.boxRemove}>
      <IconC name='close' color='red' size={30} />
    </TouchableOpacity>
  )
}
