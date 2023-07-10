import { Alert, Image, Platform, Text } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Block, IconC, Touch } from '@mylib/UIKit'
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
import { AppLang } from '@assets/langs';
export type ListAttachProps = {
  data: item[]
  onDelete?: (item: item) => void
  onSave?: () => void
}
type item = { uri: string, type: 1 | 2, id: any, downloaded?: -1 | 0 | 1, fileName?: string }
export const ListAttach = React.memo(({ data, onDelete, onSave }: ListAttachProps) => {
  if (isEmpty(data) || !data) return null
  const [files, setFiles] = useState<item[]>([])//(data.map(i => ({ ...i, downloaded: i?.type == 2 ? 1 : -1 })))
  const fileCache = useRef<any>([])
  //function
  const downLoadFile = async () => {
    Log.d('down-file')
    if (isArray(data)) {
      for await (let item of data) {
        if (item.type == 2) return
        await RNFS.downloadFile({
          fromUrl: item.uri,
          toFile: pathSaveFile(item.uri)
        })
          .promise.then(() => {
            Log.g('success',)

            setFiles(prevArray => {
              let index = prevArray.findIndex(obj => obj.id === item.id);
              if (index !== -1) {
                let newArray = [...prevArray];
                newArray[index].downloaded = 1;
                return newArray;
              }
              return prevArray;
            })
          })
          .catch((error: any) => {
            Log.g('error', error)
            setFiles(prevArray => {
              let index = prevArray.findIndex(obj => obj.id === item.id);
              if (index !== -1) {
                let newArray = [...prevArray];
                newArray[index].downloaded = 0;
                return newArray;
              }
              return prevArray;
            })
          })

      }
    }
  }
  const AsyncFile = async () => {
    if (JSON.stringify(fileCache.current) !== JSON.stringify(data)) {
      checkWiteFile()
      await setFiles(data.map(i => ({ ...i, downloaded: -1 })))
      await downLoadFile()
      fileCache.current = data
    }
  }
  useEffect(() => {
    AsyncFile()
  }, [data])
  const onOpen = async (item: item) => {
    // Log.d('item', item)
    if (item.downloaded == 0) {
      return ToastAppError('Không thể tải xuống file')
    }
    if (item.downloaded == 1) {
      Log.d('downloaded', pathSaveFile(item.uri))
      FileViewer.open(pathSaveFile(item.uri))
        .then(e => { })
        .catch(e => ToastAppError('Không thể mở file'))
    }
    if (item.downloaded == -1) {
      await RNFS.downloadFile({
        fromUrl: item.uri,
        toFile: pathSaveFile(item.uri)
      })
        .promise.then(() => {
          Log.g('success',)
          setFiles(prevArray => {
            let index = prevArray.findIndex(obj => obj.id === item.id);
            if (index !== -1) {
              let newArray = [...prevArray];
              newArray[index].downloaded = 1;
              return newArray;
            }
            return prevArray;
          })
          FileViewer.open(pathSaveFile(item.uri))
            .then(e => { })
            .catch(e => ToastAppError('Không thể mở file'))
        })
        .catch((error: any) => {
          Log.g('error', error)
          setFiles(prevArray => {
            let index = prevArray.findIndex(obj => obj.id === item.id);
            if (index !== -1) {
              let newArray = [...prevArray];
              newArray[index].downloaded = 0;
              return newArray;
            }
            return prevArray;
          })
          return ToastAppError('Không thể tải xuống file')
        })
    }
  }
  const onLongPress = (item: item) => {
    if (item.type == 1) return Alert.alert(AppLang('thong_bao'), 'Bạn muốn lưu lại vào thiết bị?', [
      {
        text: 'Bỏ qua',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Đúng vậy',
        style: 'destructive',
        onPress: () => { }
      },
    ])
    if (item.type == 2) return Alert.alert(AppLang('thong_bao'), 'Bạn muốn xoá?', [
      {
        text: 'Bỏ qua',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Xoá',
        style: 'destructive',
        onPress: () => typeof onDelete == "function" && onDelete(item)
      },
    ])
  }
  // Log.d('ListAttach', data)
  Log.d1('files', files)
  return (
    <Block>
      {/* <Text onPress={downLoadFile}>{'downLoadFile'}</Text> */}
      {files.map((item, index) => (
        <FileItem
          key={index}
          item={item}
          onPress={() => onOpen(item)}
          onLongPress={() => onLongPress(item)}
          disabled={item.downloaded == 0}
        />
      ))}
    </Block>
  )
})
/**
 * 
 *
 * 
 * 
 * 
 * 
 * 
 *  
 * 
 * 
 * 
 * 
 * 
 */
export const FileItem = ({ item, onPress, onLongPress, disabled }: { item: item, onPress: any, onLongPress: any, disabled: boolean }) => {
  const color = () => {
    switch (item.downloaded) {
      case -1: return "gray"
      case 0: return "#0000005D"
      case 1: return "blue"
    }
  }
  const fileName = getUrlName(decodeURIComponent(item.uri))
  const typeFile = getUrlExtension(item.uri)
  const source = getIconFile(typeFile)
  return (
    <Touch disabled={disabled} onLongPress={onLongPress} row onPress={onPress} marV5 alignCenter overH>
      <Image
        source={source}
        style={{ width: 20, height: 20, resizeMode: 'contain' }}
      />
      <Block row borderR={2} pad5 flex1>
        <Text numberOfLines={1} style={{ color: color(), }} ellipsizeMode="middle" >
          {fileName}.{typeFile}
          {item.downloaded == 0 && <Text style={{ fontSize: 8, color: 'red' }}>{" (Tải xuống thất bại)"}</Text>}
        </Text>
      </Block>
    </Touch>
  )
}

export const pathSaveFile = (item: any) => {
  let first =
    Platform.OS === 'ios'
      ? RNFS.LibraryDirectoryPath
      : RNFS.DocumentDirectoryPath
  return `${first}/${decodeURIComponent(getUrlName(item))}.${getUrlExtension(item)}`
}