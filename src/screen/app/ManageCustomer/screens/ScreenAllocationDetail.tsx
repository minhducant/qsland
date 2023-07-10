import React from 'react';
import { ScrollView, Alert, RefreshControl } from 'react-native';
import {
  STATUS_INTERACTIVE_LIST,
  TYPE_INTERACTIVE_LIST,
} from '../components/@Status';
import { goBack } from '@navigation';
import { LoadingApp, ToastAppError } from '@components';
import ButtonApp from '@lib/components/ButtonApp';
import ScreenApp from '@components/layout/ScreenApp';
import { Title } from '../components/FormCustomer/InputTitle';
import { TextApp, } from '@components';
import InputRadio from '../components/FormCustomer/InputRadio';
import { InputRows } from '../components/FormCustomer/InputText';
import { useDetailCustomer, useListGroupCustomer, useListSourceCustomer } from '@service/hook';
import { CustomerApi } from '@api/qsland';
import { useListAllocation, useListMe } from '@service/store';

export default function ScreenAllocationDetail({ route }: any) {
  const id = route.params?.id;
  const { data, loading, onRefresh } = useDetailCustomer(id);
  const { dataKey } = useListSourceCustomer();
  const { onRefresh: onRefreshListAllocation } = useListAllocation();
  const { onRefresh: onRefreshListMe } = useListMe()
  const customerInformation = [
    { label: 'Khách hàng', content: data.full_name },
    { label: 'Điện thoại', content: data.phone },
    { label: 'Email', content: data.email },
    { label: 'Chiến dịch', content: data?.campagin_name },
    { label: 'Dự án', content: data?.category_name },
    {
      label: 'Nguồn',
      content: dataKey[data?.source_id]?.name,
    },
  ];
  const Label: any = {
    interactive_form: {
      valueInit: {},
      title: 'Hình thức tương tác với khách(*):',
      placeholder: 'Chọn',
    },
    note: { valueInit: '', title: 'Ghi chú(*):', placeholder: 'Nhập' },
    interactive_status: {
      valueInit: {},
      title: 'Kết quả bước đầu CSKH(*):',
      placeholder: 'Chọn',
    },
  };

  const formRef = React.useRef<any>({ ...Label });

  const onSubmit = async () => {
    try {
      if (!formRef.current['interactive_form']?.getValue('id')) {
        return Alert.alert(
          'Cảnh báo!',
          'Bạn chưa chọn hình thức tương tác với khách hàng!',
        );
      } else if (!formRef.current['interactive_status']?.getValue('id')) {
        return Alert.alert('Cảnh báo!', 'Bạn chưa chọn kết quả bước đầu CSKH!');
      } else if (!formRef.current['note']?.getValue('id')) {
        return Alert.alert('Cảnh báo!', 'Bạn chưa nhập ghi chú!');
      }
      const body = {
        customer_id: data?.id,
        interactive_status:
          formRef.current['interactive_status']?.getValue('id'),
        note: formRef.current['note']?.getValue(),
        interactive_form: formRef.current['interactive_form']?.getValue('id'),
      };
      LoadingApp.show();
      let res: any = null;
      res = await CustomerApi.addSaleCustomerCampaignHistoryTakeCare({ ...body });
      if (res?.status) {
        goBack();
        onRefreshListAllocation()
        onRefreshListMe()
      } else {
        ToastAppError(res?.mess);
      }
      LoadingApp.hide();
    } catch (error) {
      Log.d1('submit3', error);
    }
  };

  return (
    <ScreenApp back title={AppLang('khach_hang_duoc_phan_bo')}>
      <Block flex1 bg="#fff">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 10,
            paddingBottom: 80,
            paddingHorizontal: 20,
          }}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={onRefresh}
            />
          }
        >
          <ScreenAllocationDetailPlaceholder show={loading} />
          <Block hidden={loading}>
            {customerInformation.map((props, k) => (
              <RowLabel key={k} {...props} />
            ))}
          </Block>
          <Block hidden={loading}>
            <Title title="Phản hồi chăm sóc: " />
            <InputRadio
              data={TYPE_INTERACTIVE_LIST}
              keyString="label"
              {...Label['interactive_form']}
              ref={ref => (formRef.current['interactive_form'] = ref)}
            />
            <InputRadio
              data={STATUS_INTERACTIVE_LIST}
              keyString="label"
              {...Label['interactive_status']}
              ref={ref => (formRef.current['interactive_status'] = ref)}
            />
            <InputRows
              {...Label['note']}
              ref={(ref: any) => (formRef.current['note'] = ref)}
            />
            <Touch row alignCenter pad={5} borderC="#ddd">
              <IconC name={'radio-button-on-outline'} color="gray" />
              <TextApp style={{ marginLeft: 5 }}>
                Thêm vào khách hàng của tôi
              </TextApp>
            </Touch>
            <ButtonApp
              title={'Gửi phản hồi'}
              onPress={onSubmit}
              marginOption={{ top: 10 }}
            />
          </Block>
        </ScrollView>
      </Block>
    </ScreenApp>
  );
}

const RowLabel = ({ label, content }: any) => (
  <Block row pad={10} centerH>
    <Block flex={0.3}>
      <TextApp  >
        {label}
        {':'}
      </TextApp>
    </Block>
    <Block flex={0.7} borderBW={1} borderC="#ddd">
      <TextApp bold color={AppColor('primary')}>
        {content}
      </TextApp>
    </Block>
  </Block>
);
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Progressive,
  Fade,
} from "rn-placeholder";
import { Block, IconC, Touch } from '@mylib/UIKit';
import { AppColor } from '@assets/colors';
import { Log } from '@utils/Log';
import { AppLang } from '@assets/langs';
const ScreenAllocationDetailPlaceholder = ({ show }: any) => {
  if (!show) return null;
  return (
    <>
      {[...new Array(4).keys()].map((i, j) =>
        <Placeholder
          key={j}
          Animation={Fade}
          // Left={PlaceholderMedia}
          style={{ padding: 5, flexDirection: 'row' }}
        >
          <PlaceholderLine width={30} />
          <PlaceholderLine />
        </Placeholder>
      )}
      {[...new Array(2).keys()].map((i, j) =>
        <Placeholder
          key={j}
          Animation={Fade}
          // Left={PlaceholderMedia}
          style={{ padding: 5, flexDirection: 'row' }}
        >
          <Placeholder
            key={j}
            Animation={Fade}
            Left={PlaceholderMedia}
            style={{ padding: 5, flexDirection: 'row' }}
          >
            <PlaceholderLine width={50} />
            <PlaceholderLine />
          </Placeholder>
        </Placeholder>
      )}
    </>
  );
};
