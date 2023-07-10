import React from 'react';
import {StyleSheet, processColor} from 'react-native';
import {PieData, PieChart} from 'react-native-charts-wrapper';

import {AppLang} from '@assets/langs';
import {Block, TextApp} from '@lib/components';
import {STATUS_INTERACTIVE} from '@screen/app/ManageCustomer/components/@Status';

interface PieChartComponentProps {
  data: {label: string; count: number; color: string}[];
}

const PieChartComponent: React.FC<PieChartComponentProps> = ({data}) => {
  const total = data.reduce((sum, item) => sum + item.count, 0);
  const chartData: PieData = {
    dataSets: [
      {
        values: data.map(item => (item.count / total) * 100),
        label: 'Pie dataset',
        config: {
          valueTextSize: 15,
          selectionShift: 13,
          valueLineWidth: 0,
          valueFormatter: "#.#'%'",
          valueTextColor: processColor('#FFFFFF'),
          colors: data.map(item => processColor(item.color)),
        },
      },
    ],
  };

  const interactiveValues = Object.values(STATUS_INTERACTIVE);
  const halfLength = Math.ceil(interactiveValues.length / 2);
  const firstHalf = interactiveValues.slice(0, halfLength);
  const secondHalf = interactiveValues.slice(halfLength);

  return (
    <Block flex1 justifyBetween alignCenter>
      {data.length > 0 ? (
        <PieChart
          style={styles.pieChart}
          chartDescription={{text: ''}}
          data={chartData}
          legend={{enabled: false}}
          holeRadius={0}
          rotationEnabled={true}
          rotationAngle={20}
          maxAngle={360}
          transparentCircleRadius={0}
          drawEntryLabels={true}
        />
      ) : (
        <Block h={300} w={'100%'} justifyCenter alignCenter>
          <TextApp>{AppLang("khong_co_du_lieu")}!</TextApp>
        </Block>
      )}
      <Block row justifyContent="space-between">
        <Block>
          {firstHalf.map((item: any) => (
            <Block row alignCenter marR={50} marB={5} key={item.label}>
              <Block
                w={10}
                h={10}
                _background={item.color}
                marR={5}
                borderR={5}
              />
              <TextApp>{item.label}</TextApp>
            </Block>
          ))}
        </Block>
        <Block>
          {secondHalf.map((item: any) => (
            <Block row alignCenter marB={5} key={item.label}>
              <Block
                w={10}
                h={10}
                _background={item.color}
                marR={5}
                borderR={5}
              />
              <TextApp>{item.label}</TextApp>
            </Block>
          ))}
        </Block>
      </Block>
    </Block>
  );
};

export default PieChartComponent;

const styles = StyleSheet.create({
  pieChart: {
    width: '95%',
    height: 300,
  },
});
