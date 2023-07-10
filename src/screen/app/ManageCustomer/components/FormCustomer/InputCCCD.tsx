import { Image, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { placeholderTextColor, styleInput } from './styleInput'
import InputTitle from './InputTitle';
import { Block, IconApp, ScreenWidth, TextApp, Touch } from '@lib/components';
import { isObject, isArray, isEmpty, isString } from 'underscore';
import { getLink, ListImage, ListImageViewer } from '@lib/components/image';
import { SelectFile } from '@lib/components/image/SelectFile';
import { AppColor } from '@assets/colors';
import { Log } from '@utils/Log';
type Props = {
  title?: string
  titleSelect?: string
  valueInit?: any
  data?: any[]
  required?: boolean
  keyString?: string
  onOpenModal?: () => void
  onSelected?: (item: any) => void
  placeholder?: string
  onRefreshData?: () => void
}
const InputCCCD = React.forwardRef<any, Props>(({ title, valueInit, placeholder,
  required, data, keyString = 'name', onOpenModal, onSelected, titleSelect, ...props }, ref) => {
  React.useImperativeHandle(ref, () => ({
    getImageJson: () => {
      Log.e('getImageJson1', {
        imageBefore,
        imageAfter
      })
      const cmt_img_before = getHttp(imageBefore)
      const cmt_img_after = getHttp(imageAfter)
      Log.d('getImageJson2', {
        cmt_img_before,
        cmt_img_after,
      })
      return {
        cmt_img_before,
        cmt_img_after,
      }
    },
    getCmtImgBefore: () => getFile(imageBefore),
    getCmtImgAfter: () => getFile(imageAfter),
    setImageBefore: setImageBefore,
    setImageAfter: setImageAfter,
    getValue(type: 'json' | 'before' | 'after') {
      switch (type) {
        case 'json':
          const cmt_img_before = getHttp(imageBefore)
          const cmt_img_after = getHttp(imageAfter)
          return {
            cmt_img_before,
            cmt_img_after,
          }
        case 'before':
          return getFile(imageBefore)
        case 'after':
          return getFile(imageAfter)

        default:
          return {}
      }
    },
    setValue(value: any, type: 'before' | 'after',) {
      switch (type) {
        case 'before':
          return setImageBefore(value)
        case 'after':
          return setImageAfter(value)

        default:
          return false
      }
    }
  }))
  const refSelect = useRef<any>()


  const [imageBefore, setImageBefore] = useState<any>(null)
  const [imageAfter, setImageAfter] = useState<any>(null)
  const [imageType, setImageType] = useState('before')
  const onPressSelect = (imageType: any) => {
    setImageType(imageType)
    refSelect.current?.open()
  }
  Log.e1('InputCCCD', { imageBefore, imageAfter })
  const onSelectedImage = (data: any) => {

    if (isArray(data) && data.length > 0) {
      const imageSelect = data[0]
      if (imageType == "before") {
        setTimeout(() => {
          setImageBefore(imageSelect)
        }, 500);
      }
      if (imageType == "after") {
        setTimeout(() => {
          setImageAfter({ ...imageSelect })
        }, 500);
      }
    }
    refSelect.current.close()
  }
  const refViewer = useRef<any>()
  const dataViewer = () => {
    let res: any[] = []
    if (imageBefore) res.push(imageBefore)
    if (imageAfter) res.push(imageAfter)
    return res
  }

  const onBefore = () => {
    if (imageBefore) refViewer.current?.openIndex(0)
    else {
      setImageType('before')
      return refSelect.current?.open()
    }
  }
  const onAfter = () => {
    if (imageAfter) refViewer.current?.openIndex(1)
    else {
      setImageType('after')
      return refSelect.current?.open()
    }
  }
  return (
    <View style={styleInput.inputContainer}>
      <InputTitle title={title} required={required} />
      <View>
        <Block row centerBetween padT={10}>
          <ImageSelect
            onDelete={() => setImageBefore(null)}
            onViewer={onBefore}
            onCamera={() => onPressSelect('before')}
            image={imageBefore} title={"Mặt trước"} />
          <Block w={20} />
          <ImageSelect
            onDelete={() => setImageAfter(null)}
            onViewer={onAfter}
            onCamera={() => onPressSelect('after')}
            image={imageAfter} title={"Mặt sau"} />
        </Block>
        <SelectFile
          selectionLimit={1}
          ref={refSelect}
          onSelectedFile={(data: any) => onSelectedImage(data)}
          options={['camera', 'library']}
        />
        <ListImageViewer data={dataViewer()} ref={refViewer} />
      </View>
    </View >
  )
})
export default InputCCCD

const ImageSelect = ({ image, title, onViewer, onDelete, onCamera }: any) => {
  return (
    <Touch mid borderR={5} w={ScreenWidth * 0.3} h={ScreenWidth * 0.3} onPress={onViewer} flex1 borderW={1} borderC="gray">
      <Touch onPress={onDelete} styleBox={{ position: 'absolute', zIndex: 99, right: -5, top: -20 }} >
        <IconApp name="close-outline" color="red" />
      </Touch>
      <Touch borderR={5} pad5 bg="#eee" onPress={onDelete} styleBox={{ position: 'absolute', zIndex: 99, left: 0, top: 0 }} >
        <IconApp onPress={onCamera} name="camera-reverse-outline" color={AppColor('primary')} />
      </Touch>
      {isEmpty(image) && <TextApp color='gray'>{title}</TextApp>}
      {!isEmpty(image) && <Image source={image} style={{ width: '100%', resizeMode: 'stretch', height: '100%', opacity: 0.9 }} />}
    </Touch>
  )
}
export const getHttp = (file: any) => {
  if (isString(file?.uri)) {
    if (file?.uri.search('http') != -1) return file?.uri
  }
  return null
}
export const getFile = (file: any) => {
  if (isString(file?.uri)) {
    if (file?.uri.search('http') == -1) return file
  }
  return null
}