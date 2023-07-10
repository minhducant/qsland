import { Alert, Image, Platform, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Block, Touch } from '@mylib/UIKit'
import {
  checkPermissionWrite,
  getIconFile,
  getNameExtension,
  getTypeFile,
  getUrlExtension,
  getUrlName,
} from './utils'
import RNFS from 'react-native-fs'
import FileViewer from 'react-native-file-viewer'
import { Log } from '@utils'
import { ToastAppError } from '../Toast/index'
import { arrayData } from '@utils/format'
import { isArray, isEmpty } from 'underscore'
import { checkWiteFile } from '@utils/prermission'
import { AppLang } from '@assets/langs'
/**
 * data:['https://']
 * @param param0
 * @returns
 */
type item = {
  name: any
  type?: any
  uri?: any
}
export default function Attach2({ data, onDelete }: { data: item[], onDelete?: any }) {
  const openFile = async (url: any) => {
    checkWiteFile()
    let checkExit: boolean = await RNFS.exists(formatNameFile(url))

    Log.e('exit', checkExit, url)
    if (checkExit) {
      return FileViewer.open(formatNameFile(url)) // absolute-path-to-my-local-file.
        .then(() => {
          Log.g('open-success')
        })
        .catch(error => {
          ToastAppError('Không thể mở file')
          Log.e('error', error)
        })
    }
    Log.e('downloadFile')
    let options = {
      fromUrl: url,
      toFile: formatNameFile(url),
    }
    RNFS.downloadFile(options)
      .promise.then(() => FileViewer.open(formatNameFile(url)))
      .then(() => {
        Log.g('open-success')
      })
      .catch((error: any) => {
        ToastAppError('Không tải file xuống được')
      })
  }
  const images = {}
  const name = ''
  const _onLongPress = (item: any) => {
    Alert.alert(AppLang('canh_bao'), AppLang('ban_chac_chan_muon_xoa'), [
      {
        text: AppLang('huy'),
      },
      {
        text: AppLang('dong_y'),
        onPress: async () => {
          typeof onDelete == "function" && onDelete(item)
        },
      },
    ])
  }
  return (
    <Block>
      {arrayData(data).map((item, index) => (
        <ItemFile
          key={index}
          index={index}
          onPress={() => openFile(item?.uri)}
          onLongPress={() => _onLongPress(item)}
          images={getIconFile(getTypeFile(item?.name || item?.fileName || ''))}
          name={
            decodeURIComponent(getUrlName(item?.name || item?.fileName || '')) + '.' + getUrlExtension(item?.name || item?.fileName || '')
          }
        />
      ))}
    </Block>
  )
}
export const ItemFile = ({ index, onPress, onLongPress, images, name }: any) => {
  return (
    <Touch row onPress={onPress} onLongPress={onLongPress} bg='#eee' marV5 alignCenter overH>
      <Image
        source={images}
        style={{ width: 30, height: 30, resizeMode: 'contain' }}
      />
      <Block row borderR={2} pad5 marB={5} flex1>
        <Text style={{ color: '#002DF7', fontStyle: 'italic' }}>
          {`${index + 1}. `}
          {name}
        </Text>
      </Block>
    </Touch>
  )
}
const DATA_LOCAL = [
  {
    fileCopyUri: null,
    name: '1737toi-tai-gioi-ban-cung-the.pdf',
    size: 7062269,
    type: 'application/pdf',
    uri: 'content://com.android.providers.media.documents/document/document%3A18',
  },
]

export const formatNameFile = (item: any) => {
  let first =
    Platform.OS === 'ios'
      ? RNFS.LibraryDirectoryPath
      : RNFS.DocumentDirectoryPath
  return `${first}/${decodeURIComponent(getUrlName(item))}.${getUrlExtension(
    item,
  )}`
}
