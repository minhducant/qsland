import React from 'react'
import BottomHome from './BottomHome'
import { Dimensions, FlatList, Image, ImageBackground } from 'react-native'
import { DrawerLayout } from '@mylib'
import { AppImage } from '@assets/image'
import { TextApp } from '@components'
import { Block, IconC, ImageC, Touch, TouchScale, ButtonRipple } from '@mylib/UIKit'
import { LayoutApp, screen_height } from '@components/index'
import { AppColor } from '@assets/colors'
import { navigate, } from '@navigation'
import { TextVersion, useUpgradeJs } from '@components/Codepush'
import { useUser } from '@service/hook'
import { AppLang } from '@assets/langs';
import { onLogout } from '@screen/splash/logout'
import { getImageAvatar } from '@screen/app/person/api'
import { closeDrawer, drawerRef } from '@navigation'
import { Log } from '@utils/Log'

export default function Drawer() {
  return (
    <DrawerLayout
      ref={drawerRef}
      renderDrawerContent={() => <DrawerContent />}
      drawerWidth={Dimensions.get('screen').width * 0.75}>
      <BottomHome />
    </DrawerLayout>
  )
}

function DrawerContent({ user = {}, building = {} }: any) {
  const H = screen_height

  const LIST_DRAWER = [
    {
      name: AppLang('thong_tin_nhan_vien'),
      icon: 'person-outline',
      onPress: () => onPressInfo()
    },
    {
      name: AppLang('thong_bao'),
      icon: 'notifications-outline',
      onPress: () => {
        navigate('ScreenNotifyApp')
        closeDrawer()
      },
      hidden: !__DEV__
    },

    {
      name: AppLang('quan_ly_khach_hang'),
      icon: 'settings-outline',
      onPress: () => {
        navigate('Bottom2')
        closeDrawer()
      }
    },
    {
      name: AppLang('kiem_duyet_giai_trinh'),
      icon: 'settings-outline',
      onPress: () => {
        navigate('ScreenAdDenyHome')
        closeDrawer()
      }
    },
    {
      name: AppLang('yeu_cau_hop_dong'),
      icon: 'settings-outline',
      onPress: () => {
        navigate('ScreenTransaction')
        closeDrawer()
      },
      hidden: !__DEV__
    },
    {
      name: AppLang('doi_mat_khau'),
      icon: 'settings-outline',
      onPress: () => {
        navigate('screen_change_pass')
        closeDrawer()
      }
    },

    {
      name: AppLang('nang_cap_ung_dung'),
      icon: 'settings-outline',
      onPress: () => {
        CheckVersionUpdate()
        closeDrawer()
      }
    },
    {
      name: 'DEV',
      icon: 'settings-outline',
      onPress: () => {
        navigate('ScreenDeveloper')
        closeDrawer()
      },
      hidden: !__DEV__
    },
    {
      name: AppLang('dang_xuat'),
      icon: 'log-out-outline',
      icon_color: AppColor('txt_origin'),
      name_color: AppColor('txt_origin'),
      icon_right_color: AppColor('txt_origin'),
      onPress: async () => {
        onLogout()
      }
    },
  ]
  const { CheckVersionUpdate } = useUpgradeJs(false)
  const onPressInfo = () => {
    navigate('screen_person_info')
    closeDrawer()
  }
  const data = useUser()
  // Log.d('data?.avatar', getImageAvatar(data?.avatar))
  return (
    <LayoutApp
      forceInset={{ vertical: 'never' }}
      forceInsetBot={{ top: 'never', bottom: 'always' }}
      styleBot={{ backgroundColor: '#fff' }}>
      <ImageBackground
        source={AppImage('imageFooter')}
        style={{
          width: '100%',
          minHeight: H * 0.16,
          justifyContent: 'center',
        }}>
        <Touch activeOpacity={0.6} onPress={onPressInfo} row alignCenter positionA bottom0 pad10>
          <Image
            source={getImageAvatar(data?.avatar)}
            style={{ width: 50, height: 50, borderRadius: 100, marginRight: 10 }}
          />
          <TextApp bold size18 color={AppColor('primary')} flex1>
            {data?.full_name}{__DEV__ ? `->${data?.user_id}` : ''}
          </TextApp>
        </Touch>
      </ImageBackground>
      <Block flex1>
        <FlatList
          data={LIST_DRAWER}
          keyExtractor={(i, j) => j.toString()}
          contentContainerStyle={{ padding: 10 }}
          ItemSeparatorComponent={() => <Block h={1} background={'#ddd'} />}
          renderItem={({ item }) => (
            <Item
              item={item}
              onPress={() => {
                typeof item.onPress == "function" && item.onPress()

              }}
            />
          )}

        />
      </Block>
      {__DEV__ &&
        <Emitter
          numberOfParticles={50}
          emissionRate={5}
          interval={200}
          particleLife={1500}
          direction={-90}
          spread={360}
          fromPosition={{ x: 200, y: 200 }}
          infiniteLoop
          width={200}
          height={200}
          autoStart
        // style={{ backgroundColor: 'pink' }}
        >
          <IconC name="heart" color="red" />
        </Emitter>
      }
      <Block mid>
        <TextVersion style={{ fontSize: 14 }} />
      </Block>
    </LayoutApp>
  )
}
import { Emitter } from 'react-native-particles';
const Item = ({ onPress, item }: any) => (
  <ButtonRipple rippleColor={AppColor('primary')} onPress={onPress} >
    <Block
      row
      h={55}
      padH10
      centerH
      borderC='#ddd'
      hidden={__DEV__ ? false : item?.hidden}
      styleBox={item?.style}>
      <Block row alignCenter>
        <IconC color={item?.icon_color ?? AppColor('primary')} name={item.icon} size={20} />
        <TextApp color={item?.name_color} style={{ paddingHorizontal: 15, flex: 1 }} numberOfLines={1}>
          {item.name}
        </TextApp>
      </Block>
    </Block></ButtonRipple>
)
