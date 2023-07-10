import { Image, Text } from 'react-native'
import React from 'react'
import { Block } from '@mylib'
import { AppImage } from '@assets/image'
import ScreenApp from '@components/layout/ScreenApp'
import { LoadingApp } from '@components/loading'
import { TextApp } from '@components/text'
import { openDrawer } from '@navigation'
import { client } from '@api/client'
import { Log } from '@utils/Log'
import RNFS from 'react-native-fs';
// import RNFetchBlob from 'react-native-fetch-blob';

import io from 'socket.io-client'
import ButtonApp from '@components/ButtonApp'
// const socket = io('http://localhost:3001')












export default function ScreenDeveloper() {
  // const _socket = async () => {
  //   socket.on('connect', () => {
  //     Log.g('on-connect')

  //   })
  //   socket.emit('register', { user_name: '002', user_id: 123 })
  //   socket.on('register', e => {
  //     Log.g('register', e)
  //     // socket.disconnect()
  //   })
  //   socket.on('getAll', e => {
  //     Log.g('getAll', e)
  //   })
  // }
  // const getAll = async () => {
  //   socket.emit('getAll')
  // }

  // const login = async () => {
  //   const body: any = new FormData()
  //   body.append('file', {
  //     name: 'anh_dep',
  //     type: "image/jpg",
  //     uri: "/Users/phamha/Library/Developer/CoreSimulator/Devices/4217D1BE-87F4-4462-98C2-A46821330763/data/Containers/Data/Application/E2319A78-053E-4540-AED6-A33BBA984FE7/Documents/pp2.png"
  //   })
  //   body.append('username', "hapham")
  //   let res = await client.post('http://localhost:3000/login/', body, { headers: { 'Content-Type': 'multipart/form-data' } })
  //   Log.e('res', res)
  // }
  // // const filePath = 'content://com.android.externalstorage.documents/document/primary%3ADCIM/aaa.png'// RNFS.ExternalDirectoryPath + '/test4.png';
  // const filePath = RNFS.DocumentDirectoryPath + '/pp2.png';
  // const dowload = async () => {
  //   Log.e('dowload')
  //   const download = await RNFS.downloadFile({
  //     fromUrl: 'https://kenh14cdn.com/thumb_w/660/2020/7/17/brvn-15950048783381206275371.jpg',
  //     // fromUrl: 'https://vapa.vn/wp-content/uploads/2022/12/anh-dep-lam-hinh-nen-002.jpg',
  //     toFile: filePath,
  //     progress: res => {
  //       console.log('res', res);
  //       console.log((res.bytesWritten / res.contentLength).toFixed(2));
  //     },
  //     progressDivider: 1
  //   });
  //   if (download.statusCode === 200) {
  //     console.log('File downloaded successfully!');
  //   } else {
  //     console.log('File download failed.');
  //   }
  //   Log.e('dowload--2', download)
  // }
  // const readFolder = async () => {
  //   try {
  //     let folderPath = RNFS.DocumentDirectoryPath
  //     const result = await RNFS.readDir(folderPath);
  //     Log.d1('Folder contents:', result);
  //   } catch (error) {
  //     console.log('Error occurred while reading folder:', error);
  //   }
  // };
  // function upload() {


  // }
  return (
    <ScreenApp iconLeft='menu' onLeft={openDrawer}>
      <Block flex1 bgW>
        <Block flex1 mid>
          {/* <ButtonApp title='getAll' onPress={getAll} />
          <ButtonApp title='login' onPress={login} />
          <ButtonApp title='socket' onPress={_socket} />
          <ButtonApp title='upload' onPress={upload} /> */}
          {/* <ButtonApp title='readFolder' onPress={readFolder} />
          <Image source={{ uri: filePath }} style={{ width: 100, height: 100, backgroundColor: '#eee' }} />
          <ButtonApp title='dowload' onPress={dowload} /> */}
          <Image
            source={AppImage('logo_bg2')}
            style={{ width: 300, height: 300, resizeMode: 'contain' }}
          />
          <TextApp />
          <Text
            style={{ fontWeight: '300' }}
            onPress={() => __DEV__ && LoadingApp.show(true)}>
            {'Tính năng đang được cập nhật/nâng cấp'}
          </Text>
        </Block>
      </Block>
    </ScreenApp>
  )
}