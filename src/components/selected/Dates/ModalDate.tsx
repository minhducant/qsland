import React, { useEffect, useMemo, useRef, useState } from 'react'
import Modal from 'react-native-modal'
import { Block, IconC, Touch } from '@mylib'
import moment from 'moment'
import DateTime from '../DateTime'
import { AppColor } from '@assets/colors'
import { TextApp } from '@components'
import { screen_width } from '../../index'
import { AppLang } from '@assets/langs'
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import { Log } from '@utils'

type Props = {
  onCancel?: () => void
  onSelectDate?: (date: any) => void
  dateInit?: any
}


export const ModalDate = React.forwardRef(
  ({ onSelectDate, dateInit, onCancel }: Props, ref) => {
    React.useImperativeHandle(ref, () => ({
      open: () => {
        setIsVisible(true)
        setSelectYear(false)
      },
      openInit: (value: string) => {
        if (value) setDate(value)
        setIsVisible(true)
        setSelectYear(false)
      },
      close: () => setIsVisible(false),
      getValue: () => date,
    }))
    const [date, setDate] = useState<any>(dateInit ?? new Date())
    const [isVisible, setIsVisible] = useState(false)
    const [selectYear, setSelectYear] = useState(false)
    // const onYear = () => {
    //   // console.log('2222222222222')
    //   __DEV__ && setSelectYear(prev => !prev)
    //   // dateTimeRef.current?.yearMonthChange(-1, 'year')
    // }
    const dateTimeRef = useRef<any>(null)
    const DataYear = useMemo(() => {
      let dataStart = [...new Array(100).keys()].map(i => moment().subtract(i + 1, 'y').format('YYYY')).sort()
      let dataEnd = [...new Array(100).keys()].map(i => moment().add(i + 1, 'y').format('YYYY'))
      const dataGen = [...dataStart, moment().format('YYYY'), ...dataEnd]
      // console.log('dataGen', dataGen)
      return dataGen
    }, [])
    const [year, setYear] = useState<any>(date ? moment(date).format('YYYY') : moment().format('YYYY'))
    const onPressYear = (year: any) => {
      if (date) {
        setYear(year)
        const dateNew = new Date(date)
        dateNew.setFullYear(year)
        setDate(dateNew)
        setSelectYear(false)
        return dateNew
      }
      return null
    }
    const onChangeSelect = () => {
      setSelectYear(prev => !prev)
      if (date) {
        setYear(year)
        const dateNew = new Date(date)
        dateNew.setFullYear(year)
        setDate(dateNew)
        return dateNew
      }
      return null
    }
    // Log.d('date2', moment(date).format('YYYY-MM-DD'))
    // Log.d('year', year)
    // Log.d('findIndex', DataYear.findIndex(i => i == year))

    const CONTAINER = screen_width * 1.2
    const HEADER = CONTAINER * 0.15
    const FOOTER = CONTAINER * 0.12
    const DATE = CONTAINER - HEADER - FOOTER
    return (
      <Modal
        isVisible={isVisible}
        style={{ justifyContent: 'center', alignItems: 'center' }}
        onBackButtonPress={() => setIsVisible(false)}
        onBackdropPress={() => setIsVisible(false)}
        avoidKeyboard={true}>
        <Block w={screen_width * 0.95} minH={CONTAINER} bgW borderR={5} overH>
          <Touch h={HEADER} onPress={onChangeSelect} activeOpacity={0.9} padL={20} justifyCenter pad10 bg={AppColor('primary')}>
            <TextApp size14 bold color='#fff'>
              {date
                ? moment(date).format('YYYY')
                : moment(new Date()).format('YYYY')}
            </TextApp>
            <TextApp size={30} bold color='#fff'>
              {date
                ? moment(date).format('D-MM')
                : moment(new Date()).format('D-MM')}
            </TextApp>
          </Touch>
          {/* h={selectYear ? screen_width - 30 - 80 : 1} */}
          <Block h={DATE} hidden={!selectYear} overH   >
            <ScrollPicker
              dataSource={DataYear}
              selectedIndex={DataYear.findIndex(i => i == year) != -1 ? DataYear.findIndex(i => i == year) : 100}
              renderItem={(data, index) =>
                <Touch w100 h={50} mid onPress={() => onPressYear(data)}>
                  <TextApp
                    size={year == data ? 25 : 20}
                    bold center
                    color={year == data ? AppColor('primary') : 'gray'}
                  >
                    {data}
                  </TextApp>
                </Touch>
              }
              onValueChange={(data, selectedIndex) => {
                //
                // Log.d('data', data)
                setYear(data)
              }}
              wrapperHeight={0}
              wrapperColor='#fff'
              itemHeight={60}
              highlightColor={AppColor('primary')}
              highlightBorderWidth={0.3}
            />
          </Block>
          <Block h={DATE} hidden={selectYear} overH   >
            <DateTime
              ref={dateTimeRef}
              date={moment(date).format('YYYY-MM-DD')}
              changeDate={(date: string) => {
                // console.log('data', date)
                setDate(date)
                setYear(moment(date).format('YYYY'))
                // onSelectDate && onSelectDate(date)
                // setIsVisible(false)
              }}
              format='YYYY-MM-DD'
              renderChildDay={(day: any) => null}
              warpRowControlMonthYear={{ color: 'blue', backgroundColor: '#fff' }}
              warpRowWeekdays={{
                color: 'blue',
                backgroundColor: '#fff',
                fontSize: 12,
                borderWidth: 0,
                borderColor: '#ddd',
                alignItem: 'center',
              }}
              containerStyle={{
                height: DATE,
                backgroundColor: '#fff',
                marginTop: 0,
                padding: 10,
              }}
              weekdayStyle={{
                backgroundColor: '#fff',
                flex: 1,
                fontSize: 14,
                textAlign: 'center',
                color: 'gray',
                fontWeight: '500',
              }}
              warpDayStyle={{
                backgroundColor: '#fff',
                borderColor: '#ddd',
                borderWidth: 0,
                flex: 1,
              }}
              textDayStyle={{ color: '#303030', fontSize: 15, fontWeight: '400' }}
              notCurrentDayOfMonthStyle={{ color: '#ddd', fontSize: 12 }}
              //
              customWeekdays={['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']}
              renderPrevYearButton={() => (
                <RenderIcon name='chevron-double-left' />
              )}
              renderPrevMonthButton={() => <RenderIcon name='chevron-left' />}
              renderNextYearButton={() => <RenderIcon name='chevron-right' />}
              renderNextMonthButton={() => (
                <RenderIcon name='chevron-double-right' />
              )}
              selectedDayStyle={{ color: '#fff' }}
              currentDayStyle={{ color: 'red' }}
              dateSelectedWarpDayStyle={{
                backgroundColor: AppColor('primary'),
                borderRadius: 100,
                // margin: 1,
                overFlow: 'hidden',
                color: '#fff',
              }}
            />
          </Block>
          <Block h={FOOTER} bg="#eee" alignI='flex-end' justifyCenter padH20>
            <Block row alignCenter>
              <Touch onPress={() => {
                setIsVisible(false)
                typeof onCancel == "function" && onCancel()
              }}>
                <TextApp
                  size16
                  style={{ fontWeight: '400', marginRight: 25, color: '#000' }}>
                  {AppLang('huy')}
                </TextApp>
              </Touch>
              <Touch
                onPress={async () => {
                  // console.log('data', date)
                  if (selectYear) {
                    const newDate = onPressYear(year)
                    onSelectDate && onSelectDate(newDate)
                    setIsVisible(false)
                  } else {

                    onSelectDate && onSelectDate(date)
                    setIsVisible(false)
                  }
                }}>
                <TextApp size16 style={{ fontWeight: '700', color: AppColor('primary') }}>
                  {AppLang('dong_y')}
                </TextApp>
              </Touch>
            </Block>
          </Block>
        </Block>
      </Modal>
    )
  },
)

const RenderIcon = ({ name }: any) => {
  return (
    <IconC type='MaterialCommunityIcons' name={name} color={'gray'} size={25} />
  )
}
