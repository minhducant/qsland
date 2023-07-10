import * as React from 'react';
import { HeaderC, LayoutApp } from '@components/layout';

import { Block, TextApp, Touch } from '@lib/components';
import { FlatList, ScrollView, Text } from 'react-native';
import { isArray } from 'underscore';
import { getAllKeys, getStorage, multiRemove } from '@lib/storage';
import { format as prettyFormat } from 'pretty-format'
import ScreenApp from '@components/layout/ScreenApp';

export default function ScreenApiHistory({ route }: any) {
  const [history, setHistory] = React.useState<any[]>([])
  const [historyKey, setHistoryKey] = React.useState<any[]>([])
  const onRefresh = async () => {
    await setHistory([])
    const data = await getAllKeys()
    // Log.d('data', data)
    const list_err_api = data.filter(i => i.search('debug-api:') != -1)
    setHistoryKey(list_err_api)
    // Log.d('list_err_api', list_err_api)
    for await (let key of list_err_api) {
      // await sleep(100)
      // await Log.d('id', id)
      let store = await getStorage(key)
      if (store) setHistory(prev => [...prev, store])
    }
  }
  React.useEffect(() => {
    onRefresh()
  }, [])
  const clear = async () => {
    await multiRemove(historyKey)
    onRefresh()
  }
  return (
    <ScreenApp back title={"Danh sách gọi api lỗi"}>
      <Touch bg="red" onPress={clear} w={100} mar={10} borderR={10} pad={5}>
        <TextApp color='#fff'>{'clear'}</TextApp>
      </Touch>
      <Block flex1>
        <FlatList
          refreshing={false}
          onRefresh={onRefresh}
          keyExtractor={(i, j) => j.toString()}
          data={history}
          renderItem={({ item, index }) => <Item item={item} />}
        />
      </Block>
    </ScreenApp>
  );
}
const Item = ({ item }: { item: Item }) => {
  return (
    <Block mar={10} bg="#eee" pad={5} borderR={10}>
      <TextApp color='red'>{'7:'}{'url='}{item?.url}</TextApp>
      <TextApp color='blue'>{'6:'}{'response='}{prettyFormat(item?.response)}</TextApp>
      <TextApp color='blue'>{'5:'}{'request='}{prettyFormat(item?.request)}</TextApp>
      <TextApp>{'7:'}{'status='}{item?.status}</TextApp>
      <TextApp>{'4:'}{'method='}{item?.method}</TextApp>
      <TextApp>{'3:'}{'headers_info='}{JSON.stringify(item?.headers_info)}</TextApp>
      <TextApp>{'1:'}{'authorization='}{item?.authorization}</TextApp>
      <TextApp>{'2:'}{'baseURL='}{item?.baseURL}</TextApp>

    </Block>
  )
}
type Item = {
  authorization: any
  baseURL: any
  headers_info: any
  method: any
  request: any
  response: any
  status: any
  url: any
}