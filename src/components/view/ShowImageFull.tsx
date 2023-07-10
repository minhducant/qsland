import {Image, Modal} from 'react-native'
import React, {useState, forwardRef, useImperativeHandle} from 'react'
import {AvatarC, Block, IconC} from '@mylib'
import {Log, uriImg} from '@utils'
import Swiper from 'react-native-swiper'
import LayoutApp from '../layout/LayoutApp'
import {arrayData} from '@utils/format'
import {screen_width} from '@components'
type _props = {
  data: string[]
  option?: {
    isAvatar: boolean
    name: string[]
  }
}
const ImageViewer = forwardRef(({data, option}: _props, ref: any) => {
  if (!data) return null
  if (!Array.isArray(data)) return null
  const [visible, setVisible] = useState(false)
  useImperativeHandle(ref, () => ({
    visible: (v: boolean) => setVisible(v),
  }))
  const [poi, setPoi] = useState(0)
  const [rotate, setRotate] = useState(0)
  return (
    <Modal visible={visible}>
      <LayoutApp
        style={{backgroundColor: '#000'}}
        styleBot={{backgroundColor: '#000'}}>
        <Block flex1 bg='#000'>
          <Block row centerH pad10>
            <IconC
              name='close'
              color={'#fff'}
              size={30}
              onPress={() => setVisible(false)}
            />
            <IconC
              onPress={() => setRotate(prev => prev + 90)}
              name='refresh-outline'
              color={'#fff'}
              size={30}
            />
          </Block>
          <Swiper onIndexChanged={setPoi} dotColor='gray' activeDotColor='#fff'>
            {Array.isArray(data) &&
              arrayData(data).map((item: any, index: number) => (
                <Block
                  styleBox={[
                    {
                      transform: [{rotate: `${rotate}deg`}],
                    },
                  ]}
                  flex1
                  mid
                  key={index}>
                  {item && (
                    <Image
                      style={{
                        width: screen_width,
                        resizeMode: 'contain',
                        height: 500,
                      }}
                      source={uriImg(item)}
                    />
                  )}
                  {option?.isAvatar && !item && (
                    <AvatarC
                      name={option?.name[index]}
                      source={item ? uriImg(item) : null}
                      radius={screen_width / 2}
                      noBorder
                    />
                  )}
                </Block>
              ))}
          </Swiper>
        </Block>
      </LayoutApp>
    </Modal>
  )
})
export default ImageViewer
