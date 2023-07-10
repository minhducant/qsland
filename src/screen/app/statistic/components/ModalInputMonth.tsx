import React, {useState, useImperativeHandle, forwardRef} from 'react';
import moment from 'moment';
import Modal from 'react-native-modal';
import {Dimensions} from 'react-native';
import MonthSelector from 'react-native-month-selector';

import {AppLang} from '@assets/langs';
import {AppColor} from '@assets/colors';
import {Block, IconApp, TextApp, Touch} from '@lib/components';

type Props = {
  onChangeDate: any;
  offAutoClose?: boolean;
  dateInit?: {from: string; to: string};
  title?: string;
};
const ModalInputMonth = forwardRef(({onChangeDate}: Props, ref) => {
  const [date, setDate] = useState(moment());
  const [isVisible, setIsVisible] = useState(false);
  const screen_width = Dimensions.get('screen').width;

  useImperativeHandle(ref, () => ({
    open: () => setIsVisible(true),
    close: () => setIsVisible(false),
    getValue: () => {
      return {
        date,
      };
    },
  }));

  const onSelectionDate = (month: any) => {
    setDate(month);
    onChangeDate(month);
    setIsVisible(false);
  };

  return (
    <Modal
      isVisible={isVisible}
      style={{justifyContent: 'center', alignItems: 'center'}}
      onBackButtonPress={() => setIsVisible(false)}
      onBackdropPress={() => setIsVisible(false)}
      avoidKeyboard={true}>
      <Block
        w={screen_width - 30}
        minH={screen_width + 30}
        borderR={2}
        pad={10}>
        <MonthSelector
          selectedBackgroundColor={AppColor('primary')}
          prevIcon={<IconApp name="ios-caret-back-outline" size={25} />}
          nextIcon={<IconApp name="ios-caret-forward-outline" size={25} />}
          selectedDate={date}
          onMonthTapped={onSelectionDate}
          monthFormat="MM"
          maxDate={moment('9999-12-31')}
          localeLanguage="vi"
        />
      </Block>
    </Modal>
  );
});

export default ModalInputMonth;
