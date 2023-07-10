import { Image, Platform, Text } from 'react-native'
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
export type AttachProps = {
  title?: string
  inactiveTitle?: boolean
  data: string[]
}
export default function Attach({ data, inactiveTitle, title }: AttachProps) {
  if (isEmpty(data) || !data) return null
  const downLoadFile = async () => {
    if (isArray(data)) {
      for await (let item of data) {
        let options = {
          fromUrl: item,
          toFile: formatNameFile(item),
        }
        await RNFS.downloadFile(options)
        // .promise.then(() => {
        //   // Log.g('success', index)
        // })
        // .catch((error: any) => {
        //   // error
        // })
      }
    }
  }
  useEffect(() => {
    downLoadFile()
  }, [])
  const openFile = async (item: any) => {
    checkWiteFile()
    let checkExit: boolean = await RNFS.exists(formatNameFile(item))

    Log.e('exit', checkExit, formatNameFile(item))
    if (checkExit) {
      return FileViewer.open(formatNameFile(item))
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
      fromUrl: item,
      toFile: formatNameFile(item),
    }
    RNFS.downloadFile(options)
      .promise.then(() => FileViewer.open(formatNameFile(item)))
      .then(() => {
        Log.g('open-success')
      })
      .catch((error: any) => {
        ToastAppError('Không tải file xuống được')
      })
  }

  Log.e('Arracth', data)
  return (
    <Block>
      <Block hidden={inactiveTitle} pad5>
        <Text style={{ color: 'blue' }}>
          {'#'}
          {AppLang('dinh_kem')}
        </Text>
      </Block>
      {arrayData(data).map((item, index) => (
        <ItemFile
          key={index}
          index={index}
          item={item}
          onPress={() => openFile(item)}
        />
      ))}
    </Block>
  )
}
export const ItemFile = ({ item, index, onPress }: any) => {
  return (
    <Touch row onPress={onPress} marV5 alignCenter overH>
      <Image
        source={getIconFile(getTypeFile(item))}
        style={{ width: 20, height: 20, resizeMode: 'contain' }}
      />
      <Block row borderR={2} pad5 marB={5} flex1>
        <Text numberOfLines={1} style={{ color: '#002DF7', fontStyle: 'italic' }} ellipsizeMode="middle" >
          {decodeURIComponent(getUrlName(item))}.{getUrlExtension(item)}
        </Text>
      </Block>
    </Touch>
  )
}

export const formatNameFile = (item: any) => {
  let first =
    Platform.OS === 'ios'
      ? RNFS.LibraryDirectoryPath
      : RNFS.DocumentDirectoryPath
  return `${first}/${decodeURIComponent(getUrlName(item))}.${getUrlExtension(
    item,
  )}`
}