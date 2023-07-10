import { View } from 'react-native'
import React, { useRef, useState } from 'react'
import { styleInput } from './styleInput'
import InputTitle from './InputTitle'
import { IconApp, Touch } from '@lib/components'
import { getLink, ListImage, ListImageViewer } from '@lib/components/image'
import { SelectFile } from '@lib/components/image/SelectFile'
import moment from 'moment'
import { arrayData } from '@utils/format'
import { Log } from '@utils/Log'
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
const InputImages = React.forwardRef<any, Props>(
  (
    {
      title,
      valueInit,
      placeholder,
      required,
      data,
      keyString = 'name',
      onOpenModal,
      onSelected,
      titleSelect,
      ...props
    },
    ref,
  ) => {
    React.useImperativeHandle(ref, () => ({
      getValue: (type: 'link' | 'file') => {
        if (type == 'link') return getLink(state.images)
        if (type == 'file') return getLink(state.images, -1)
        return []
      },
      setValue: (links: string[]) => {
        setState({ images: links.map(uri => ({ uri, id: uri })) })
      },
      clearValue: () => setState({ images: [] }),
    }))
    const [state, setState] = useState<any>({ images: [] })
    const refViewer = useRef<any>()
    const refSelect = useRef<any>()

    // Log.d('images', state.images)
    const onSelectedFile = (data: any) => {
      Log.d('onSelectedFile', data)
      onImage(data, 'push')
    }
    const onImage = (item: any, type = 'click') => {
      // Log.e('onImage', item);
      if (type == 'click') {
        let newState: any[] = state.images
        if (newState.find(i => i['id'] == item['id'])) {
          newState = newState.filter(i => i['id'] != item['id'])
        } else {
          newState = [...newState, item]
        }
        setState({ images: newState })
      }
      if (type == 'push') {
        let data: any[] = []
        arrayData(item).map(i => {
          if (
            i.type == 'image/jpg' ||
            i.type == 'image/jpeg' ||
            i.type == 'image/png'
          )
            data.push({
              ...i,
              id:
                'image_' +
                i?.uri +
                moment().format('YYYYMMDD_HHmmss').toString(),
            })
        })
        let newState = [...state['images'], ...data]
        setState({ images: newState })
      }
      if (type == 'delete') {
        let newState: any[] = arrayData(state.images).filter(
          i => i['id'] != item['id'],
        )
        setState({ images: newState })
      }
    }
    return (
      <View style={styleInput.inputContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginRight: 10,
          }}>
          <InputTitle title={title} required={required} />
          <Touch
            h={40}
            row
            centerBetween
            onPress={async () => {
              if (onOpenModal) await onOpenModal()
              refSelect.current?.open()
            }}
            activeOpacity={0.5}>
            <IconApp
              name='camera-plus-outline'
              alignSelf='auto'
              color='black'
              type='MaterialCommunityIcons'
            />
          </Touch>
        </View>

        <View>
          <ListImage
            hiddenCamera
            onCamera={() => refSelect.current.open()}
            data={state.images}
            onPressItem={({ item, index }) => refViewer.current.openIndex(index)}
            onRemoveItem={({ item, index }) => onImage(item, 'click')}
            styleScrollView={{ paddingTop: 10 }}
            styleContainer={{ marginRight: 15, overflow: 'visible' }}
            styleImage={{ borderRadius: 5 }}
            styleCamera={{ marginRight: 15 }}
            styleIcon={{
              container: { top: -10, right: -10, backgroundColor: 'transparent' },
              icon: { color: 'red', fontSize: 20 },
            }}
          />
          <ListImageViewer data={state.images} ref={refViewer} />
          <SelectFile
            ref={refSelect}
            selectionLimit={1}
            onSelectedFile={(data: any) => {
              onSelectedFile(data)
              refSelect.current.close()
            }}
            options={['camera', 'library']}
          />
        </View>
      </View>
    )
  },
)
export default InputImages
