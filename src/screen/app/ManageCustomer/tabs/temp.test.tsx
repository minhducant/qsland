import {StyleSheet, Text, View} from 'react-native'
import React from 'react'

export default function AAA () {
  const {set, get, getAll, clear, clearAll} = useHookForm()

  function onPress () {
    Log.e1('getAll', get('name1', 'id'))
  }
  return (
    <Block w100 h={300} bgW>
      <InputBasic ref={e => set('name1', e)} placeholder='name1' />
      <InputBasic ref={e => set('name2', e)} placeholder='name2' />
      <InputBasic ref={e => set('name3', e)} placeholder='name3' />
      <InputBasic ref={e => set('name4', e)} placeholder='name4' />
      <InputBasic ref={e => set('name6', e)} placeholder='name6' />
      <TextApp onPress={onPress} lang='xac_minh' />
    </Block>
  )
}

import {useRef} from 'react'
import {InputBasic} from '@components/input'
import {Block} from '@mylib/UIKit'
import {TextApp} from '@components/text'
import {Log} from '@utils/Log'
import {isObject} from 'underscore'

function useHookForm<T> () {
  const ref = useRef<any>({})
  function set (key: string, value: any) {
    ref.current[key] = value
  }
  function get (key: string, field: any = undefined) {
    return ref.current[key]?.getValue(field)
  }
  function clear (key: string) {
    return ref.current[key]?.clear()
  }
  function clearAll () {
    if (isObject(ref.current)) {
      return Object.fromEntries(
        Object.keys(ref.current).map(key => [key, ref.current[key]?.clear()]),
      )
    }
    return null
  }
  function getAll () {
    if (isObject(ref.current)) {
      return Object.fromEntries(
        Object.keys(ref.current).map(key => [
          key,
          ref.current[key]?.getValue(),
        ]),
      )
    }
    return null
  }
  return {
    set,
    get,
    getAll,
    clear,
    clearAll,
  }
}
