import { Image, ImageProps, ScrollView, StyleProp, StyleSheet, Text, TextStyle, View, ViewProps, ViewStyle } from 'react-native'
import React, { isValidElement, useRef, useState } from 'react'
import { IconC, Touch, arrayData, Log } from './dependencies';
import { Block } from './dependencies';
import { ListImage } from './ListImage';
import { ListImageViewer } from './ListImageViewer';
import { SelectFile } from './SelectFile';
import moment from 'moment';
export type ListImageProps = {
  link: string[],
  onCamera?: () => void
}
export const ListImageVip = React.forwardRef<any, ListImageProps>(({ link, ...props }, ref) => {
  React.useImperativeHandle(ref, () => ({
    getData: () => { return state.images.map(({ uri }: any) => uri) }
  }))
  const [state, setState] = useState<any>({ images: link.map(uri => ({ uri, id: uri })) })
  const refViewer = useRef<any>()
  const refSelect = useRef<any>()


  const onSelectedFile = (data: any) => {
    onImage(data, 'push')
  }
  const onImage = (item: any, type = "click") => {
    // Log.e('onImage', item)
    if (type == "click") {
      let newState: any[] = state.images
      if (newState.find(i => i['id'] == item['id'])) {
        newState = newState.filter(i => i['id'] != item['id'])
      } else {
        newState = [...newState, item]
      }
      setState({ images: newState })
    }
    if (type == "push") {
      let data: any[] = []
      arrayData(item).map((i) => {
        if (i.type == "image/jpg" || i.type == "image/jpeg" || i.type == "image/png")
          data.push({ ...i, id: 'image_' + i?.uri + moment().format('YYYYMMDD_HHmmss').toString() })
      })
      let newState = [...state['images'], ...data]
      setState({ images: newState })
    }
    if (type == "delete") {
      let newState: any[] = arrayData(state.images).filter(i => i['id'] != item['id'])
      setState({ images: newState })
    }
  }
  return (
    <Block>
      <ListImage
        onCamera={() => refSelect.current.open()}
        data={state.images}
        onPressItem={({ item, index }) => refViewer.current.openIndex(index)}
        onRemoveItem={({ item, index }) => onImage(item, 'click')}
        styleScrollView={{ paddingTop: 10 }}
        styleContainer={{ marginRight: 15, overflow: 'visible' }}
        styleImage={{ borderRadius: 5 }}
        styleCamera={{ marginRight: 15 }}
        styleIcon={{ container: { top: -20, right: -20, backgroundColor: 'transparent' }, icon: { color: 'red', fontSize: 20 } }}
      />
      <ListImageViewer data={state.images} ref={refViewer} />
      <SelectFile
        ref={refSelect}
        onSelectedFile={(data: any) => { onSelectedFile(data); refSelect.current.close() }}
        options={['camera', 'library']}
      />
    </Block>
  )
})


const styles = StyleSheet.create({

})