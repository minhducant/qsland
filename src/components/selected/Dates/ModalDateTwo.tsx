import React, { useEffect, useState } from 'react'
import Modal from 'react-native-modal'
import { Block, Touch } from '@mylib'
import moment from 'moment'
import { AppColor } from '@assets/colors'
import { TextApp } from '@components'
import { screen_width } from '../../index'
import { AppLang } from '@assets/langs'
import { Log } from '@utils'
import { DateRangePicker } from './Calendars'

type Props = {
  onSelectDate?: (dateFrom: any, dateTo: any) => void
  offAutoClose?: boolean
  dateInit?: { from: string; to: string }
  title?: string
}
export const ModalDateTwo = React.forwardRef(
  ({ onSelectDate, dateInit, offAutoClose, title }: Props, ref) => {
    const { from, to } = dateInit || {}

    React.useImperativeHandle(ref, () => ({
      open: () => setIsVisible(true),
      close: () => setIsVisible(false),
      getValue: () => {
        return {
          from: dateFrom,
          to: dateTo,
        }
      },
    }))

    const [dateFrom, setDateFrom] = useState<any>(from || false)
    const [dateTo, setDateTo] = useState<any>(to || false)
    const [isVisible, setIsVisible] = useState(false)
    const RenderHeader = () => {
      return (
        <Block w100 row centerH padL={20} justifyCenter h={80} pad10
          bg={AppColor('primary')}
        >
          <Block flex1>
            <TextApp size14 bold color='#fff'>
              {AppLang('tu_ngay')}
            </TextApp>
            <TextApp size={18} bold color='#fff'>
              {dateFrom && moment(dateFrom).format('DD/MM/YYYY')}
            </TextApp>
          </Block>
          <Block flex1>
            <TextApp size14 bold color='#fff'>
              {AppLang('den_ngay')}
            </TextApp>
            <TextApp size={18} bold color='#fff'>
              {dateTo && moment(dateTo).format('DD/MM/YYYY')}
            </TextApp>
          </Block>
        </Block>
      )
    }
    // Log.d('dateFrom', dateFrom)
    // Log.e('dateTo', dateTo)
    useEffect(() => {
      return () => {
        setDateFrom(false)
        setDateTo(false)
      }
    }, [])
    return (
      <Modal
        isVisible={isVisible}
        style={{ justifyContent: 'center', alignItems: 'center' }}
        onBackButtonPress={() => setIsVisible(false)}
        onBackdropPress={() => setIsVisible(false)}
        avoidKeyboard={true}>
        <Block w={screen_width - 30} minH={screen_width + 30} bgW borderR={2}>
          <RenderHeader />
          <DateRangePicker
            onSuccess={(start: string, end: string) => {
              setDateFrom(start)
              setDateTo(end)
              Log.e('start-end', start, end)
            }}
            initialRange={[from, to]}
          />
          <RenderFooter
            onPressLeft={() => setIsVisible(false)}
            onPressRight={() => {
              // console.log('data', dateFrom, dateTo)
              onSelectDate && onSelectDate(dateFrom, dateTo)
              !offAutoClose && setIsVisible(false)
            }}
          />
        </Block>
      </Modal>
    )
  },
)
const RenderFooter = ({ onPressLeft, onPressRight }: any) => {
  return (
    <Block pad20 alignI='flex-end'>
      <Block row alignCenter>
        <Touch onPress={onPressLeft}>
          <TextApp
            size16
            style={{ fontWeight: '400', marginRight: 25, color: AppColor('txt_black') }}>
            {AppLang('huy')}
          </TextApp>
        </Touch>
        <Touch onPress={onPressRight}>
          <TextApp size16 style={{ fontWeight: '600', }}>
            {AppLang('dong_y')}
          </TextApp>
        </Touch>
      </Block>
    </Block>
  )
}
