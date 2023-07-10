import { Text, TextProps, TouchableOpacity, View, ViewProps } from 'react-native'
import React, { useEffect, useState } from 'react'
import CodePush from 'react-native-code-push'
import { Log } from '@utils'
import { useUpgradeJs } from './useUpgradeJs';
import { SettingApp as App } from '@assets/common'
export function TextVersion({ style }: { style?: TextProps['style'] }) {
  const { data } = useGetCodePush()
  const info = `${App?.nativeVersion}-${App.typeVersion}-${App.langue}-${App.os}-${App.osVersion}`
  return (
    <Text style={[{ color: 'gray', fontSize: 12 }, style]}>
      {data?.label}*{info}
    </Text>
  )
}
export const useGetCodePush = () => {
  // Log.d('111useGetCodePush=>>>>>>')
  const [data, setData] = useState<any>({})

  useEffect(() => {
    const getData = async () => {
      let data = await CodePush.getUpdateMetadata()
      if (data) setData(data)

    }
    getData()
  }, [])
  return { data }
}

export const CodePushViewer = ({ renderItem, containerStyle }: { containerStyle?: ViewProps['style'], renderItem: (data: CodePushGetUpdateMetadata & { name: any }) => React.ReactNode }) => {
  const { CheckVersionUpdate } = useUpgradeJs(false)
  const { data } = useGetCodePush()
  return (
    <TouchableOpacity style={containerStyle} onPress={() => typeof CheckVersionUpdate == "function" && CheckVersionUpdate()}>
      {renderItem({ ...data })}
    </TouchableOpacity>
  )
}
interface CodePushGetUpdateMetadata {
  appVersion: any
  binaryModifiedTime: any
  bundlePath: any
  deploymentKey: any
  downloadUrl: any
  failedInstall: any
  install: any
  isFirstRun: any
  isMandatory: any
  isPending: any
  label: any
  packageHash: any
  packageSize: any
}
