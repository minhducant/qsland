import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import moment from 'moment'
import { StyleSheet, processColor } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { LineChart, LineDataset } from 'react-native-charts-wrapper'

import { AppLang } from '@assets/langs'
import { TextApp } from '@lib/components'
import { Block } from '@lib/components'
import MonthSelectorComponent from './InputMonth'
import { useCountCustomersAllocatedByMonth } from '@service/store'
import { getLabelByParams } from '../api'

const LineChartComponent = (props: any, ref: any) => {
  const { dataByMonth, onRefresh, updateParamsRef, params } = useCountCustomersAllocatedByMonth()
  const chartRef = useRef(null)
  const chartData: { dataSets: LineDataset[] } = {
    dataSets: [
      {
        values: getDataValues(dataByMonth),
        label: 'Line Dataset',
        config: {
          lineWidth: 1.5,
          drawCircles: true,
          circleColor: processColor('red'),
          circleRadius: 4,
          circleHoleColor: processColor('red'),
          color: processColor('red'),
          fillAlpha: 100,
          drawValues: true,
          valueTextColor: processColor('white'),
          valueTextSize: 10,
          valueFormatter: '#',
        },
      },
    ],
  }

  const onFilter = (month: any, data: any) => {
    updateParamsRef({
      month: moment(month).format('MM'),
      year: moment(month).format('YYYY'),
      ...data,
    })
    onRefresh()
  }

  useImperativeHandle(ref, () => ({
    onRefreshList() {
      onRefresh()
    },
  }))

  return (
    <Block>
      <MonthSelectorComponent
        onFilter={onFilter}
        dataPermissions={props.dataPermissions}
      />
      <LinearGradient
        colors={['#0298B0', '#7CD858']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <LineChart
          style={styles.chart}
          data={chartData}
          chartDescription={{ text: '' }}
          ref={chartRef}
          animation={{ durationX: 500 }}
          xAxis={{
            drawGridLines: false,
            position: 'BOTTOM',
            textSize: 12,
            textColor: processColor('white'),
            granularityEnabled: true,
            granularity: 1,
            axisMinimum: -0.25,
            axisMaximum: getLabelByParams(params).length - 0.75,// 4.25, // dataByMonth.length - 0.75,
            valueFormatter: getLabelByParams(params)// getWeeksArray(dataByMonth),
          }}
          yAxis={{
            left: {
              drawGridLines: true,
              axisLineColor: processColor('white'),
              gridColor: processColor('white'),
              gridLineWidth: 0.5,

              spaceTop: 20,
              spaceBottom: 20,
              textColor: processColor('white'),
              textSize: 12,
              granularity: 1,
              axisMinimum: 0,
              axisMaximum: findMaxCount(dataByMonth) + 1,
            },
            right: {
              enabled: false,
            },
          }}
          legend={{ enabled: false }}
          drawGridBackground={false}
          drawBorders={false}
        />
        <Block _background={'white'} pad5 marT10 borderR={10}>
          <TextApp>{AppLang('khach_hang_phat_sinh')}</TextApp>
        </Block>
      </LinearGradient>
    </Block>
  )
}

export const getDataValues = (data: any[]) => {
  const valuesArray = data.map(item => item.count)
  return valuesArray
}
const getLabelWeek = (time_start: string, time_end: string) => {

}
export const getWeeksArray = (dataByMonth: any[]) => {
  const weeksCount = dataByMonth.length
  const weeksArray = []
  for (let i = 1; i <= weeksCount; i++) {
    weeksArray.push(`Tuần ${i}`)
  }
  return weeksArray
}

export const findMaxCount = (data: any[]) => {
  if (data?.length === 0) {
    return 1
  }
  let maxCount = data[0]?.count
  for (let i = 1; i < data?.length; i++) {
    if (data[i].count > maxCount) {
      maxCount = data[i]?.count
    }
  }
  return maxCount
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    marginTop: 0,
    paddingVertical: 10,
    borderRadius: 15,
    backgroundColor: 'transparent',
    marginBottom: 20,
  },
  chart: {
    width: '95%',
    height: 200,
  },
})

export default forwardRef(LineChartComponent)
